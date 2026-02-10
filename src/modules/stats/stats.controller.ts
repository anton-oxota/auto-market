import { Response } from "express";
import { AuthRequest } from "../../middlewares/isAuth";
import { AvgPriceQuery, GetViewsQuery } from "./stats.type";
import ViewModel from "./stats.model";
import { QueryFilter, Types } from "mongoose";
import { Car } from "../listings/listings.type";
import CarModel from "../listings/listings.model";
import { getExchange } from "../exchange/exchange.repository";
import { createPriceObj } from "../listings/listing.servise";

export async function getViews(req: AuthRequest, res: Response) {
    const user = req.user!;
    const { period } = req.query as GetViewsQuery;
    const { id } = req.params;

    if ((typeof period === "string" && isNaN(+period)) || +period < 0) {
        return res.status(400).json({
            message: "Period incorect",
        });
    }

    if (!user.isPremium) {
        return res.status(403).json({
            message: "User must have Premium for looking statistic",
        });
    }

    const fromDate = new Date();
    fromDate.setHours(0, 0, 0, 0);
    if (period) fromDate.setDate(fromDate.getDate() - +period);
    if (!period) fromDate.setTime(0);

    const statistic = await ViewModel.aggregate([
        {
            $match: {
                date: { $gte: fromDate },
                userId: user._id,
                listingId: new Types.ObjectId(id as string),
            },
        },
        { $group: { _id: "$listingId", total: { $sum: 1 } } },
    ]);

    res.status(200).json({
        statistic: statistic,
    });
}

export async function avgPrice(req: AuthRequest, res: Response) {
    const user = req.user!;

    if (!user.isPremium) {
        return res.status(403).json({
            message: "User must have Premium for looking statistic",
        });
    }

    const { city, region } = req.query as AvgPriceQuery;

    const filter: QueryFilter<Car> = {
        status: "active",
    };

    if (city) filter["location.city"] = city;
    if (region) filter["location.region"] = region;

    const cars = await CarModel.find(filter).lean();
    const exchangeRate = await getExchange();

    const avg = cars.reduce(
        (acc, curr) => {
            const price = createPriceObj(curr.price, exchangeRate);
            acc.UAH += price.UAH / cars.length;
            acc.USD += price.USD / cars.length;
            acc.EUR += price.EUR / cars.length;
            return acc;
        },
        { UAH: 0, USD: 0, EUR: 0 },
    );

    res.status(200).json({
        avg,
        exchangeRate,
    });
}

import { Request, Response } from "express";
import { validationResult } from "express-validator";
import type { Car, GetCarsQuery, PostCarBody } from "./listings.type";
import CarModel from "./listings.model";
import { AuthRequest } from "../../middlewares/isAuth";
import {
    checkSwearWords,
    createPriceObj,
    sendMailToManager,
} from "./listing.servise";
import { getExchange } from "../exchange/exchange.repository";
import { QueryFilter } from "mongoose";
import ViewModel from "../stats/stats.model";

export async function postCar(req: AuthRequest, res: Response) {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(422).json({
            message: "Invalid input",
            errors: validationErrors.array(),
        });
    }

    const user = req.user;

    if (!user) {
        return res.status(404).json({
            message: "User is undefined",
        });
    }

    if (user.stock.length === 1 && !user.isPremium) {
        return res.status(403).json({
            message: "User without Premium can't have more then one listing",
        });
    }

    const { title, description, make, modelName, price, year, location } =
        req.body as PostCarBody;

    const newCar = new CarModel({
        title,
        description,
        make,
        modelName,
        price,
        year,
        location,
        userId: user._id,
    });

    user.stock.push(newCar._id);

    const hasSwearWords = checkSwearWords(req.body as PostCarBody);

    if (hasSwearWords) {
        newCar.warnings = 1;
        newCar.status = "hidden";
    }

    await newCar.save();
    await user.save();

    if (hasSwearWords) {
        return res.status(400).json({
            message: "Your listing has swear words",
            warningsLeft: 2,
        });
    }

    res.status(201).json({ message: "Car listing create", id: newCar._id });
}

export async function putCar(req: AuthRequest, res: Response) {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(422).json({
            message: "Invalid inputs",
            erorrs: validationErrors.array(),
        });
    }

    const { id } = req.params;

    const existingCar = await CarModel.findById(id);

    if (!existingCar) {
        return res.status(404).json({
            message: "Listing with this id is not exists",
        });
    }
    let warnings = existingCar.warnings || 0;

    if (existingCar.status === "on_review") {
        return res.status(400).json({
            message: "Can not etid, Listing on review",
        });
    }

    const { make, modelName, price, title, year, description } =
        req.body as PostCarBody;

    existingCar.modelName = modelName;
    existingCar.make = make;
    existingCar.price = price;
    existingCar.title = title;
    existingCar.year = year;
    existingCar.description = description;

    const hasSwearWords = checkSwearWords(req.body);
    if (hasSwearWords) warnings++;

    if (warnings > 3) {
        existingCar.status = "on_review";

        await sendMailToManager(
            "Listing",
            `${existingCar._id} listing has swear words`,
        );
        await existingCar.save();

        return res.status(400).json({
            message: "Listing send to menager for review",
        });
    }

    if (hasSwearWords) {
        existingCar.warnings = warnings;
        existingCar.status = "hidden";
        await existingCar.save();

        return res.status(400).json({
            message: "Your listing has swear words",
            warningsLeft: 3 - warnings,
        });
    }

    existingCar.status = "active";
    await existingCar.save();

    res.status(200).json({
        message: "Listing updated",
    });
}

export async function getCar(req: Request, res: Response) {
    const { id } = req.params;

    const existingCar = await CarModel.findById(id).lean();

    if (!existingCar) {
        return res.status(404).json({
            message: "Car with this id is not exist",
        });
    }

    const exchangeRate = await getExchange();
    const price = createPriceObj(existingCar.price, exchangeRate);

    const carView = new ViewModel({
        listingId: existingCar._id,
        userId: existingCar.userId,
        date: Date.now(),
    });

    await carView.save();

    res.status(200).json({
        car: {
            ...existingCar,
            price,
        },
        exchangeRate,
    });
}

export async function getCars(req: Request, res: Response) {
    const {
        search,
        make,
        model,
        userId,
        minYear,
        maxYear,
        limit = 10,
        page = 1,
    } = req.query as GetCarsQuery;

    if (isNaN(+limit) || isNaN(+page)) {
        return res.status(400).json({
            message: "Limit and page should be a number",
        });
    }

    const filter: QueryFilter<Car> = {
        status: "active",
    };

    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
        ];
    }

    if (make) filter.make = { $regex: make, $options: "i" };
    if (model) filter.modelName = { $regex: model, $options: "i" };
    if (userId) filter.userId = userId;

    if (minYear || maxYear) {
        filter.year = {};

        if (minYear) filter.year.$gte = minYear;
        if (maxYear) filter.year.$lte = maxYear;
    }
    // if (maxYear) filter.year = { $lte: maxYear };

    const skip = (page - 1) * limit;

    const cars = await CarModel.find(filter).skip(skip).limit(limit).lean();
    const total = await CarModel.countDocuments(filter);

    const exchangeRate = await getExchange();

    res.status(200).json({
        total,
        page: +page,
        totalPages: Math.ceil(total / limit),
        cars: cars.map((car) => {
            return {
                ...car,
                price: createPriceObj(car.price, exchangeRate),
            };
        }),
        exchangeRate,
    });
}

export async function deleteCar(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const user = req.user;

    if (!user) {
        return res.status(404).json({
            message: "User in not define",
        });
    }

    const existingCar = await CarModel.findOne({
        _id: id,
        userId: user._id,
    });

    if (!existingCar) {
        return res.status(404).json({
            message: "Car with this id is not exist",
        });
    }

    await existingCar.deleteOne();
    user.stock = user.stock.filter((carId) => carId.toString() !== id);
    await user.save();

    res.status(200).json({
        message: "Car deleted",
    });
}

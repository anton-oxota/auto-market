import { Request, Response } from "express";
import { AuthRequest } from "../../middlewares/isAuth";
import UserModel from "../auth/auth.model";
import CarModel from "../listings/listings.model";
import ReportModel from "../report/report.module";
import { QueryFilter } from "mongoose";
import { ListingStatus } from "../listings/listings.type";

export async function banUser(req: AuthRequest, res: Response) {
    const { id } = req.params;

    const existingUser = await UserModel.findById(id);

    if (!existingUser) {
        return res.status(404).json({
            message: "User is not exist",
        });
    }

    existingUser.status = "banned";
    await existingUser.save();

    res.status(200).json({
        message: "User banned",
    });
}

export async function unbanUser(req: AuthRequest, res: Response) {
    const { id } = req.params;

    const existingUser = await UserModel.findById(id);

    if (!existingUser) {
        return res.status(404).json({
            message: "User is not exist",
        });
    }

    existingUser.status = "active";
    await existingUser.save();

    res.status(200).json({
        message: "User unbanned",
    });
}

export async function getPremium(req: AuthRequest, res: Response) {
    const { id } = req.params;

    const existingUser = await UserModel.findById(id);

    if (!existingUser) {
        return res.status(404).json({
            message: "User is not exist",
        });
    }

    existingUser.isPremium = true;
    await existingUser.save();

    res.status(200).json({
        message: "User got premium",
    });
}

export async function removePremium(req: AuthRequest, res: Response) {
    const { id } = req.params;

    const existingUser = await UserModel.findById(id);

    if (!existingUser) {
        return res.status(404).json({
            message: "User is not exist",
        });
    }

    existingUser.isPremium = false;
    await existingUser.save();

    res.status(200).json({
        message: "User remove premium",
    });
}

export async function setManager(req: AuthRequest, res: Response) {
    const { id } = req.params;

    const existingUser = await UserModel.findById(id);

    if (!existingUser) {
        return res.status(404).json({
            message: "User is not exist",
        });
    }

    existingUser.role = "manager";
    await existingUser.save();

    res.status(200).json({
        message: "User role set to manager",
    });
}

export async function unsetManager(req: AuthRequest, res: Response) {
    const { id } = req.params;

    const existingUser = await UserModel.findById(id);

    if (!existingUser) {
        return res.status(404).json({
            message: "User is not exist",
        });
    }

    existingUser.role = "user";
    await existingUser.save();

    res.status(200).json({
        message: "User role set to user",
    });
}

export async function getListingOnReview(req: AuthRequest, res: Response) {
    const listingsOnReview = await CarModel.find({
        status: "on_review",
    });

    res.status(200).json({
        listings: listingsOnReview,
    });
}

export async function setListingStatus(req: AuthRequest, res: Response) {
    const { status } = req.query;
    const { id } = req.params;

    if (!status) {
        return res.status(422).json({
            message: "Please set status and query parameter",
        });
    }

    const existingListing = await CarModel.findById(id);

    if (!existingListing) {
        return res.status(404).json({
            message: "Listing with this id is not exist",
        });
    }

    existingListing.status = status as ListingStatus;
    await existingListing.save();

    res.status(200).json({
        message: "Listing status was update",
    });
}

export async function getReports(req: Request, res: Response) {
    const { userId } = req.query;

    const filters: QueryFilter<Report> = {};

    if (userId) filters.userId = userId;

    const reports = await ReportModel.find(filters);

    res.status(200).json({
        reports,
    });
}

export async function getReport(req: Request, res: Response) {
    const { id } = req.params;
    const existingReport = await ReportModel.findById(id);

    if (!existingReport) {
        return res.status(404).json({
            messagge: "Report is not exist",
        });
    }

    res.status(200).json({
        report: existingReport,
    });
}

export async function deleteReport(req: Request, res: Response) {
    const { id } = req.params;
    const existingReport = await ReportModel.findById(id);

    if (!existingReport) {
        return res.status(404).json({
            message: "Report is not exist",
        });
    }

    const existingUser = await UserModel.findById(existingReport.userId);

    if (!existingUser) {
        return res.status(404).json({
            message: "Can not find user with this report",
        });
    }

    existingUser.reports = existingUser.reports.filter(
        (id) => id.toString() !== existingReport._id.toString(),
    );
    await existingUser.save();
    await existingReport.deleteOne();

    res.status(200).json({
        message: "Report was deleted",
    });
}

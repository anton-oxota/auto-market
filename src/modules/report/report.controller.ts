import { Response } from "express";
import { AuthRequest } from "../../middlewares/isAuth";
import { validationResult } from "express-validator";
import ReportModel from "./report.module";
import { ReportBody } from "./report.types";
import { sendMailToManager } from "../listings/listing.servise";

export async function postReport(req: AuthRequest, res: Response) {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(422).json({
            message: "Invalid inputs",
            errors: validationErrors.array(),
        });
    }

    const user = req.user!;
    const { message } = req.body as ReportBody;

    const newReport = new ReportModel({
        userId: user._id,
        message,
    });

    user.reports.push(newReport);
    await user.save();
    await newReport.save();
    await sendMailToManager(
        "New Report",
        `User(${user._id}) send report. ${message}`,
    );

    return res.status(201).json({
        reportId: newReport._id,
        message: "Report was send",
    });
}

export async function deleteReport(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const user = req.user!;

    const existingReport = await ReportModel.findById(id);

    if (!existingReport) {
        return res.status(404).json({
            message: "Report is not exist",
        });
    }

    await existingReport.deleteOne();
    user.reports = user.reports.filter(
        (reportId) => reportId.toString() !== id,
    );

    await user.save();

    res.status(200).json({
        message: "Report was deleted",
    });
}

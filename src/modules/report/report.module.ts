import { model, Schema, Types } from "mongoose";
import { Report } from "./report.types";

const reportSchema = new Schema<Report>(
    {
        message: {
            type: String,
            required: true,
        },
        userId: {
            type: Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    { versionKey: false },
);

const ReportModel = model("Report", reportSchema);
export default ReportModel;

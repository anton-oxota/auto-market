import { Types } from "mongoose";

export type Report = {
    userId: Types.ObjectId;
    message: string;
};

export type ReportBody = {
    message: string;
};

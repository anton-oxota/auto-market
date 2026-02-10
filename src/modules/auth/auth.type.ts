import { Types } from "mongoose";
import { Report } from "../report/report.types";

type UserRole = "user" | "manager" | "admin";

export type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    isPremium: boolean;
    status: "active" | "banned";
    refreshToken?: string;
    stock: Types.ObjectId[];
    reports: Report[];
};

export type RegisterBody = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type LoginBody = {
    email: string;
    password: string;
};

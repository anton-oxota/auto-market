import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../modules/auth/auth.model";
import { Document } from "mongoose";
import { User } from "../modules/auth/auth.type";

export type AuthRequest = Request & { user?: Document & User };

export async function isAuth(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Access token is required",
        });
    }

    try {
        const payload = jwt.verify(
            token,
            process.env.SECRET_ACCESS_TOKEN as string,
        ) as {
            userId: string;
        };

        const user = await UserModel.findById(payload.userId);

        if (!user) {
            return res.status(404).json({
                message: "User with this Id is not exist",
            });
        }

        if (user.status === "banned") {
            return res.status(403).json({
                message: "This user has ban",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Access token is invalid",
        });
    }
}

import { Request, Response } from "express";
import { validationResult } from "express-validator";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "./auth.model";
import { LoginBody, RegisterBody } from "./auth.type";
import { generateAccessToken, generateRefreshToken } from "./auth.servise";
import { AuthRequest } from "../../middlewares/isAuth";
import CarModel from "../listings/listings.model";

export async function registerUser(req: Request, res: Response) {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(422).json({
            message: "Invalid input",
            errors: validationErrors.array(),
        });
    }

    const { email, firstName, lastName, password } = req.body as RegisterBody;

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new UserModel({
        email,
        firstName,
        lastName,
        password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
        userId: newUser._id,
        message: "User created",
    });
}

export async function loginUser(req: Request, res: Response) {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(422).json({
            message: "Invalid input",
            errors: validationErrors.array(),
        });
    }

    const { email, password } = req.body as LoginBody;

    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "User with this email is not exist",
        });
    }

    if (user.status === "banned") {
        return res.status(403).json({
            message: "User is banned",
        });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        return res.status(401).json({
            message: "Incorect password",
        });
    }

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
        message: "Logged in",
        userId: user._id,
        accessToken,
        refreshToken,
    });
}

export async function logoutUser(req: AuthRequest, res: Response) {
    const user = req.user!;

    user.refreshToken = undefined;
    await user.save();

    res.status(200).json({
        message: "User logout",
    });
}

export async function deleteUser(req: AuthRequest, res: Response) {
    const user = req.user!;

    await CarModel.deleteMany({ userId: user._id });
    await CarModel.deleteMany({ userId: user._id });

    await user.deleteOne();
    res.status(200).json({
        message: "User was deleted",
    });
}

export async function refreshAccessToken(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Token is required",
        });
    }

    const existingUser = await UserModel.findOne({
        refreshToken: token,
    });

    if (!existingUser) {
        return res.status(404).json({
            message: "User with this token is not exist",
        });
    }

    try {
        const payload = jwt.verify(
            token,
            process.env.SECRET_REFRESH_TOKEN as string,
        ) as {
            userId: string;
        };

        const accessToken = generateAccessToken(payload.userId);
        const refreshToken = generateRefreshToken(payload.userId);

        existingUser.refreshToken = refreshToken;
        await existingUser.save();

        return res.status(200).json({
            accessToken,
            refreshToken,
        });
    } catch (error) {
        existingUser.refreshToken = undefined;
        await existingUser.save();

        return res.status(401).json({
            message: "Invalid token",
        });
    }
}

import { body } from "express-validator";

import UserModel from "./auth.model";
import { User } from "./auth.type";

export const registerValidation = [
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email")
        .custom(async (value: User["email"]) => {
            const existingUser = await UserModel.findOne({ email: value });
            if (existingUser) {
                throw new Error("User with this email is already exist");
            }
        }),
    body("firstName")
        .trim()
        .notEmpty()
        .withMessage("First name is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("First name must be 2-50 characters")
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/)
        .withMessage("First name contains invalid characters"),
    body("lastName")
        .trim()
        .notEmpty()
        .withMessage("Last name is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("Last name length must be 2-50 characters")
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/)
        .withMessage("First name contains invalid characters"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6, max: 50 })
        .withMessage("Password length must be 6-50 characters"),
    body("confirmPassword")
        .custom((value: string, { req }) => {
            return value === req.body.password;
        })
        .withMessage("Passwords should match"),
];

export const loginValidation = [
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6, max: 50 })
        .withMessage("Password length must be 6-50 characters"),
];

import { body } from "express-validator";

export const carListingsValidation = [
    body("title")
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("Title must be 2-20 characters"),
    body("make")
        .notEmpty()
        .withMessage("Make is required")
        .isLength({ min: 2, max: 20 })
        .withMessage("Make must be 2-20 characters"),
    body("modelName")
        .notEmpty()
        .withMessage("Model is required")
        .isLength({ min: 2, max: 20 })
        .withMessage("Model must be 2-20 characters"),
    body("year")
        .isNumeric()
        .withMessage("Year must be a number")
        .isInt({ min: 1900, max: new Date().getFullYear() })
        .withMessage(
            `Year must be between 1900 and ${new Date().getFullYear()}`,
        ),
    body("location.city")
        .isLength({ min: 2, max: 20 })
        .withMessage("City must be 2-20 characters"),
    body("location.region")
        .isLength({ min: 2, max: 20 })
        .withMessage("Region must be 2-20 characters"),
    body("price.value")
        .isFloat({ gt: 0 })
        .withMessage("Price must be a positive number"),
    body("price.currency")
        .custom((value: string) => {
            return ["USD", "UAH", "EUR"].includes(value);
        })
        .withMessage("Invalid currency"),
];

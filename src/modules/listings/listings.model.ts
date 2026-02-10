import { model, Schema, Types } from "mongoose";
import { Car } from "./listings.type";

const carSchema = new Schema<Car>(
    {
        userId: {
            type: Types.ObjectId,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: "No description",
        },
        make: {
            type: String,
            required: true,
        },
        modelName: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            require: true,
        },
        location: {
            city: {
                type: String,
                required: true,
            },
            region: {
                type: String,
                required: true,
            },
        },
        status: {
            type: String,
            enum: ["active", "hidden", "on_review"],
            default: "active",
        },
        warnings: Number,
        price: {
            value: {
                type: Number,
                required: true,
            },
            currency: {
                type: String,
                enum: ["USD", "UAH", "EUR"],
                default: "UAH",
                required: true,
            },
        },
    },
    { timestamps: true, versionKey: false },
);

const CarModel = model<Car>("Car", carSchema);
export default CarModel;

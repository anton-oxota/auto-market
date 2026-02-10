import { model, Schema, Types } from "mongoose";
import { User } from "./auth.type";

const userSchema = new Schema<User>(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["admin", "manager", "user"],
            default: "user",
        },
        isPremium: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ["active", "banned"],
            default: "active",
        },
        refreshToken: {
            type: String,
        },
        stock: [
            {
                type: Types.ObjectId,
                ref: "Car",
            },
        ],
        reports: [
            {
                type: Types.ObjectId,
                ref: "Report",
            },
        ],
    },
    { timestamps: true, versionKey: false },
);

const UserModel = model<User>("User", userSchema);
export default UserModel;

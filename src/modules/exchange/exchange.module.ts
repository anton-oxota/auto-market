import { model, Schema } from "mongoose";
import { Exchange } from "./exchange.type";

const exchangeSchema = new Schema<Exchange>(
    {
        EUR: {
            type: Number,
            required: true,
        },
        USD: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            index: {
                expires: 0,
            },
        },
    },
    { timestamps: true, versionKey: false },
);

const ExchangeModel = model<Exchange>("Exchange", exchangeSchema);
export default ExchangeModel;

import { model, Schema, Types } from "mongoose";
import { View } from "./stats.type";

const viewSchema = new Schema({
    listingId: {
        type: Types.ObjectId,
        ref: "Car",
        required: true,
    },
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

const ViewModel = model<View>("View", viewSchema);
export default ViewModel;

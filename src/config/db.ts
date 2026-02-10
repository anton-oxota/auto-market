import { connect } from "mongoose";

async function connectDB() {
    try {
        await connect(process.env.MONGODB_URI as string);
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;

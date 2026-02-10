import express from "express";
import cors from "cors";
import router from "./routes/index";
import connectDB from "./config/db";
import { setExchangeRate } from "./cron/jobs";

const app = express();

app.use(express.json());
app.use(cors());

setExchangeRate();

app.use(router);

app.listen(3000, async () => {
    await connectDB();
    console.log("Server is running...");
});

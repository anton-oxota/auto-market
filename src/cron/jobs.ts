import corn from "node-cron";
import { ExchangeResponse } from "../modules/exchange/exchange.type";
import ExchangeModel from "../modules/exchange/exchange.module";

export function setExchangeRate() {
    corn.schedule("0 0 * * *", async () => {
        console.log("Set exchange rate");

        const res = await fetch(
            "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5",
        );

        const data = (await res.json()) as ExchangeResponse;

        await ExchangeModel.create({
            EUR: +data[0].buy,
            USD: +data[1].buy,
            date: Date.now() + 1000 * 60 * 60 * 24 * 7,
        });
    });
}

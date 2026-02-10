import ExchangeModel from "./exchange.module";
import type { Exchange } from "./exchange.type";

export async function getExchange() {
    const exchange = await ExchangeModel.aggregate([{ $sort: { date: -1 } }]);
    return exchange[0] as Exchange;
}

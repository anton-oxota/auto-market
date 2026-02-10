import { Currency } from "../listings/listings.type";

export type Exchange = {
    EUR: number;
    USD: number;
    date: Date;
};

export type ExchangeResponse = {
    ccy: Currency;
    base_ccy: "UAH";
    buy: string;
    sale: string;
}[];

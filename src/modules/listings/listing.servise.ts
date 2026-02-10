import transporter from "../../config/transporter";
import UserModel from "../auth/auth.model";
import { Exchange } from "../exchange/exchange.type";
import { PostCarBody } from "./listings.type";

export function createPriceObj(
    price: PostCarBody["price"],
    exchangeRate: Exchange,
) {
    let UAH: number;

    switch (price.currency) {
        case "USD":
            UAH = price.value * exchangeRate.USD;
            break;
        case "UAH":
            UAH = price.value;
            break;
        case "EUR":
            UAH = price.value * exchangeRate.EUR;
            break;
    }

    return {
        originCurrency: price.currency,
        UAH,
        USD: UAH / exchangeRate.USD,
        EUR: UAH / exchangeRate.EUR,
    };
}

export function checkSwearWords(car: PostCarBody) {
    const swearWords = JSON.parse(process.env.SWEAR_WORDS || "") as string[];

    const { title, description } = car;

    return swearWords.some((word) => {
        return title.includes(word) || description?.includes(word);
    });
}

export async function sendMailToManager(subject: string, text: string) {
    const managersEmail = (
        await UserModel.find({ role: "manager" }).lean()
    ).map(({ email }) => email);

    try {
        await transporter.sendMail({
            from: `Auto Market <${process.env.GOOGLE_USER}>`,
            to: managersEmail,
            subject,
            text,
        });
    } catch (error) {
        return;
    }
}

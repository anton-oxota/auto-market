import { Types } from "mongoose";

export type Currency = "USD" | "UAH" | "EUR";

export type Warning = {
    place: string;
    type: string;
};

export type ListingStatus = "active" | "hidden" | "on_review";

export type Car = {
    userId: Types.ObjectId;
    title: string;
    description?: string;
    make: string;
    modelName: string;
    year: number;
    location: {
        city: string;
        region: string;
    };
    status: ListingStatus;
    warnings?: number;
    price: {
        value: number;
        currency: Currency;
    };
};

export type PostCarBody = {
    title: string;
    description?: string;
    make: string;
    modelName: string;
    year: number;
    location: {
        city: string;
        region: string;
    };
    price: {
        value: number;
        currency: Currency;
    };
};

export type GetCarsQuery = {
    search?: string;
    make?: string;
    model?: string;
    minYear?: number;
    maxYear?: number;
    userId?: string;
    page?: number;
    limit?: number;
};

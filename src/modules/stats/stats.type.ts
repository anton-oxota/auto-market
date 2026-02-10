export type GetViewsQuery = {
    period: string;
};

export type View = {
    listingId: string;
    userId: string;
    date: Date;
};

export type AvgPriceQuery = {
    city?: string;
    region?: string;
};

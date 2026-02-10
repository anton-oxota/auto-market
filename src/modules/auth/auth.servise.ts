import jwt from "jsonwebtoken";

export function generateAccessToken(userId: string) {
    return jwt.sign({ userId }, process.env.SECRET_ACCESS_TOKEN as string, {
        expiresIn: "5min",
    });
}

export function generateRefreshToken(userId: string) {
    return jwt.sign({ userId }, process.env.SECRET_REFRESH_TOKEN as string, {
        expiresIn: "1h",
    });
}

import { NextFunction, Request, Response } from "express";
import { User } from "../modules/auth/auth.type";
import { Permissions, ROLE_PERMISSIONS } from "../config/permissions";

export function permit(...requiredPermissions: Permissions[]) {
    return (
        req: Request & { user?: User },
        res: Response,
        next: NextFunction,
    ) => {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                message: "User is not authorized",
            });
        }

        const permissins = ROLE_PERMISSIONS[user.role];

        const isAllow = requiredPermissions.every((permission) =>
            permissins.includes(permission),
        );

        if (!isAllow) {
            return res.status(403).json({
                message: "Forbidden",
            });
        }

        next();
    };
}

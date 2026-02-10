export enum Permissions {
    USER_CREATE = "user:create",
    USER_DELETE = "user:delete",
    USER_BAN = "admin:ban",
    USER_UNBAN = "admin:unban",
    GET_PREMIUM = "admin:get-premium",
    REMOVE_PREMIUM = "admin:remove-premium",
    CREATE_MANAGER = "admin:create-manager",
    REMOVE_MANAGER = "admin:remove-manager",
    SET_LISTING_STATUS = "admin:set-listing-status",
    GET_ON_REVIEW = "admin:get-on-review",
    GET_REPORTS = "admin:get-reports",
    DELETE_REPORT = "admin:delete-report",
    LISTING_CREATE = "listing:create",
    LISTING_UPDATE = "listing:update",
    LISTING_DELETE = "listing:delete",
}

export const ROLE_PERMISSIONS = {
    admin: [
        Permissions.USER_CREATE,
        Permissions.USER_DELETE,
        Permissions.USER_BAN,
        Permissions.USER_UNBAN,

        Permissions.GET_PREMIUM,
        Permissions.REMOVE_PREMIUM,

        Permissions.CREATE_MANAGER,
        Permissions.REMOVE_MANAGER,

        Permissions.GET_ON_REVIEW,
        Permissions.SET_LISTING_STATUS,
        Permissions.GET_REPORTS,
        Permissions.DELETE_REPORT,

        Permissions.LISTING_CREATE,
        Permissions.LISTING_UPDATE,
        Permissions.LISTING_DELETE,
    ],
    manager: [
        Permissions.USER_BAN,
        Permissions.USER_BAN,

        Permissions.GET_ON_REVIEW,
        Permissions.SET_LISTING_STATUS,
        Permissions.GET_REPORTS,
        Permissions.DELETE_REPORT,

        Permissions.LISTING_CREATE,
        Permissions.LISTING_UPDATE,
        Permissions.LISTING_DELETE,
    ],
    user: [
        Permissions.LISTING_CREATE,
        Permissions.LISTING_UPDATE,
        Permissions.LISTING_DELETE,
    ],
};

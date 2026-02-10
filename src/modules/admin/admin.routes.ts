import { Router } from "express";
import { isAuth } from "../../middlewares/isAuth";
import { permit } from "../../middlewares/permit";
import { Permissions } from "../../config/permissions";
import {
    banUser,
    deleteReport,
    getListingOnReview,
    getPremium,
    getReport,
    getReports,
    removePremium,
    setListingStatus,
    setManager,
    unbanUser,
    unsetManager,
} from "./admin.controller";

const router = Router();

router.get("/ban-user/:id", isAuth, permit(Permissions.USER_BAN), banUser);

router.get(
    "/unban-user/:id",
    isAuth,
    permit(Permissions.USER_UNBAN),
    unbanUser,
);

router.put(
    "/get-premium/:id",
    isAuth,
    permit(Permissions.GET_PREMIUM),
    getPremium,
);

router.put(
    "/remove-premium/:id",
    isAuth,
    permit(Permissions.GET_PREMIUM),
    removePremium,
);

router.get(
    "/set-manager/:id",
    isAuth,
    permit(Permissions.CREATE_MANAGER),
    setManager,
);

router.get(
    "/unset-manager/:id",
    isAuth,
    permit(Permissions.REMOVE_MANAGER),
    unsetManager,
);

router.get(
    "/get-listings-on-review",
    isAuth,
    permit(Permissions.GET_ON_REVIEW),
    getListingOnReview,
);

router.put(
    "/set-listing-status/:id",
    isAuth,
    permit(Permissions.SET_LISTING_STATUS),
    setListingStatus,
);

router.get("/get-reports", isAuth, permit(Permissions.GET_REPORTS), getReports);

router.get(
    "/get-report/:id",
    isAuth,
    permit(Permissions.GET_REPORTS),
    getReport,
);

router.delete(
    "/delete-report/:id",
    isAuth,
    permit(Permissions.DELETE_REPORT),
    deleteReport,
);

export default router;

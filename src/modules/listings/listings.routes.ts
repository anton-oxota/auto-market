import { Router } from "express";
import { carListingsValidation } from "./listings.validation";
import { isAuth } from "../../middlewares/isAuth";
import { permit } from "../../middlewares/permit";
import {
    deleteCar,
    getCar,
    getCars,
    postCar,
    putCar,
} from "./listings.controller";
import { Permissions } from "../../config/permissions";

const router = Router();

router.post(
    "/post-car",
    isAuth,
    permit(Permissions.LISTING_CREATE),
    carListingsValidation,
    postCar,
);

router.put(
    "/update-car/:id",
    isAuth,
    permit(Permissions.LISTING_UPDATE),
    carListingsValidation,
    putCar,
);

router.get("/get-car/:id", getCar);

router.get("/get-cars", getCars);

router.delete(
    "/delete-car/:id",
    isAuth,
    permit(Permissions.LISTING_DELETE),
    deleteCar,
);

export default router;

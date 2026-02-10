import { Router } from "express";
import { isAuth } from "../../middlewares/isAuth";
import { avgPrice, getViews } from "./stats.controller";

const router = Router();

router.get("/views/:id", isAuth, getViews);
router.get("/avg-price", isAuth, avgPrice);

export default router;

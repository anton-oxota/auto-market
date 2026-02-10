import { Router } from "express";
import { isAuth } from "../../middlewares/isAuth";
import { deleteReport, postReport } from "./report.controller";
import { body } from "express-validator";

const router = Router();

router.post(
    "/post-report",
    isAuth,
    body("message")
        .isLength({ min: 10, max: 2000 })
        .withMessage("Report name must be 10-2000 characters"),
    postReport,
);

router.delete("/delete-report/:id", isAuth, deleteReport);

export default router;

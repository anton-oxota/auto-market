import { NextFunction, Request, Response, Router } from "express";

import authRouter from "../modules/auth/auth.routes";
import listingsRouter from "../modules/listings/listings.routes";
import statsRouter from "../modules/stats/stats.routes";
import adminRouter from "../modules/admin/admin.routes";
import reportRouter from "../modules/report/report.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/listings", listingsRouter);
router.use("/stats", statsRouter);
router.use("/admin", adminRouter);
router.use("/report", reportRouter);

// 404 Page
router.use((req: Request, res: Response) => {
    res.status(404).json({
        message: "Endpoint is not exist",
    });
});

// Error handler
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        message: "Unexpected error",
        error: err,
    });
});

export default router;

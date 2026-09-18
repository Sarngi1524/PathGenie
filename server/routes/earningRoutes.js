import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

import {
  getDriverEarnings,
  getMonthlyEarnings,
  getWeeklyEarnings,
  getRecentPayments,
} from "../controllers/earningController.js";

const router = express.Router();

router.use(protect);
router.use(authorize("driver"));

router.get("/", getDriverEarnings);

router.get("/monthly", getMonthlyEarnings);

router.get("/weekly", getWeeklyEarnings);

router.get("/recent", getRecentPayments);

export default router;
import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

import {
  getDashboardReport,
  getDeliveryStatusReport,
  getVehicleReport,
  getDriverReport,
  getMonthlyDeliveryTrend,
  getTopDrivers,
  getTopRoutes,
  getRecentActivity
} from "../controllers/reportController.js";

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));

router.get("/dashboard", getDashboardReport);
router.get("/delivery-status", getDeliveryStatusReport);
router.get("/vehicles", getVehicleReport);
router.get("/drivers", getDriverReport);
router.get("/monthly-trend", getMonthlyDeliveryTrend);
router.get("/top-drivers", getTopDrivers);
router.get("/top-routes", getTopRoutes);
router.get("/recent-activity", getRecentActivity);

export default router;
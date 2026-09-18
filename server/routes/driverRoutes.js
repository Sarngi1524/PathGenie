import express from "express";

import {
  getDriverDashboard,
  getMyDeliveries,
  getDeliveryDetails,
  updateDeliveryStatus,
  getDriverProfile,
  updateDriverProfile,
} from "../controllers/driverController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

// Protect all driver routes
router.use(protect);
router.use(authorize("driver"));

// ============================
// Dashboard
// ============================

router.get("/dashboard", getDriverDashboard);

// ============================
// Profile
// ============================

router.get("/profile", getDriverProfile);

router.put("/profile", updateDriverProfile);

// ============================
// Deliveries
// ============================

router.get("/deliveries", getMyDeliveries);

router.get("/deliveries/:id", getDeliveryDetails);

router.patch(
  "/deliveries/:id/status",
  updateDeliveryStatus
);

export default router;
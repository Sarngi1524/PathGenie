import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

import {
  getDriverNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../controllers/driverNotificationController.js";

const router = express.Router();

router.use(protect);
router.use(authorize("driver"));

router.get("/", getDriverNotifications);

router.patch(
  "/read-all",
  markAllNotificationsRead
);

router.patch(
  "/:id/read",
  markNotificationRead
);

export default router;
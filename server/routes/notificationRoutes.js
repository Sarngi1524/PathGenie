import express from "express";
import {
  getNotifications,
  getNotificationStats,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearNotifications,
} from "../controllers/notificationController.js";

import  protect  from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all notifications
router.get("/", protect, getNotifications);

// Notification statistics
router.get("/stats", protect, getNotificationStats);

// Mark all notifications as read
router.patch("/read-all", protect, markAllAsRead);

// Mark single notification as read
router.patch("/:id/read", protect, markAsRead);

// Delete single notification
router.delete("/:id", protect, deleteNotification);

// Clear all notifications
router.delete("/", protect, clearNotifications);

export default router;
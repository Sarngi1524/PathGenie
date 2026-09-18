import express from "express";
import {
  getSettings,
  updateSettings,
  changePassword,
} from "../controllers/settingsController.js";

import  protect  from "../middleware/authMiddleware.js";

const router = express.Router();

// Get user settings
router.get("/", protect, getSettings);

// Update settings
router.put("/", protect, updateSettings);

// Change password
router.patch("/password", protect, changePassword);

export default router;
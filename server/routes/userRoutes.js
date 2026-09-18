import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import { getAllDrivers } from "../controllers/userController.js";

const router = express.Router();

// Accessible by both Admin and Driver
router.get("/profile", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

// Accessible only by Admin
router.get(
  "/admin",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin!",
    });
  }
);


// Accessible only by Driver
router.get(
  "/driver",
  protect,
  authorize("driver"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Driver!",
    });
  }
);
router.get(
  "/drivers",
  protect,
  authorize("admin"),
  getAllDrivers
);

export default router;
import express from "express";

import {
  checkIn,
  checkOut,
  getAttendance,
} from "../controllers/attendanceController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(authorize("driver"));

router.post("/check-in", checkIn);

router.post("/check-out", checkOut);

router.get("/", getAttendance);

export default router;
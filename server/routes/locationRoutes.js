import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import { updateDriverLocation } from "../controllers/locationController.js";

const router = express.Router();

router.put(
  "/",
  protect,
  authorize("driver"),
  updateDriverLocation
);

export default router;
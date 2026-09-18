import express from "express";
import { 
    createDelivery, 
    getAllDeliveries,
    getDeliveryById,
    updateDelivery,
    deleteDelivery,
    assignDriver,
    getMyDeliveries,
    updateDeliveryStatus,
    getRecentDeliveries,
} from "../controllers/deliveryController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

// Only Admin can create a delivery
router.post("/", protect, authorize("admin"), createDelivery);

router.get("/", protect, authorize("admin"), getAllDeliveries);

router.get(
  "/my-deliveries",
  protect,
  authorize("driver"),
  getMyDeliveries
);

router.get(
  "/recent",
  protect,
  authorize("admin"),
  getRecentDeliveries
);

router.get(
  "/:id",
  protect,
  authorize("admin"),
  getDeliveryById
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateDelivery
);

router.put(
  "/:id/status",
  protect,
  authorize("driver"),
  updateDeliveryStatus
);

router.put(
  "/:id/assign-driver",
  protect,
  authorize("admin"),
  assignDriver
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteDelivery
);

export default router;
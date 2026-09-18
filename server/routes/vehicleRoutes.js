import express from "express";
import { 
    createVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle,
    assignVehicleToDriver,
    unassignVehicle,
    updateVehicleStatus,
    getFleetStats
 } from "../controllers/vehicleController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

// Create Vehicle (Admin Only)
router.post(
  "/",
  protect,
  authorize("admin"),
  createVehicle
);

router.get(
  "/",
  protect,
  authorize("admin"),
  getAllVehicles
);
router.get(
  "/stats",
  protect,
  authorize("admin"),
  getFleetStats
);
router.get(
  "/:id",
  protect,
  authorize("admin"),
  getVehicleById
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateVehicle
);
router.put(
  "/:id/assign-driver",
  protect,
  authorize("admin"),
  assignVehicleToDriver
);
router.put(
  "/:id/unassign-driver",
  protect,
  authorize("admin"),
  unassignVehicle
);
router.put(
  "/:id/status",
  protect,
  authorize("admin"),
  updateVehicleStatus
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteVehicle
);
export default router;
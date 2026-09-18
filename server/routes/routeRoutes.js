import express from "express";
import { 
    geocodeLocation,
    calculateRoute,
    createRoute,
    getAllRoutes,
    getRouteById,
    updateRouteStatus,
    deleteRoute,
    updateRoute,
    getRouteStats,
    getMyRoutes
 } from "../controllers/routeController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/geocode",protect,geocodeLocation);
router.post("/calculate",protect,calculateRoute);
router.post("/",protect,authorize("admin"),createRoute);

router.get("/",protect,authorize("admin"),getAllRoutes);
router.get(
  "/stats",
  protect,
  authorize("admin"),
  getRouteStats
);

router.get(
  "/my",
  protect,
  authorize("driver"),
  getMyRoutes
);

router.get("/:id",protect,authorize("admin"),getRouteById);
router.put("/:id",protect,authorize("admin"),updateRoute);
router.patch("/:id/status",protect,authorize("admin"),updateRouteStatus);
router.delete("/:id",protect,authorize("admin"),deleteRoute);
export default router;
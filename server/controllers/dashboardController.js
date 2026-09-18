import Delivery from "../models/Delivery.js";
import Vehicle from "../models/Vehicle.js";
import User from "../models/User.js";
import Route from "../models/Route.js";

export const getDashboardData = async (req, res) => {
  try {
    // ==========================
    // Dashboard Statistics
    // ==========================

    const [
      totalDeliveries,
      pendingDeliveries,
      deliveredDeliveries,
      totalVehicles,
      availableVehicles,
      totalDrivers,
      totalRoutes,
    ] = await Promise.all([
      Delivery.countDocuments(),
      Delivery.countDocuments({ status: "Pending" }),
      Delivery.countDocuments({ status: "Delivered" }),
      Vehicle.countDocuments(),
      Vehicle.countDocuments({ status: "Available" }),
      User.countDocuments({ role: "driver" }),
      Route.countDocuments(),
    ]);

    // ==========================
    // Monthly Deliveries
    // ==========================

    const monthlyDeliveries = await Delivery.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalDeliveries: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    // ==========================
    // Recent Deliveries
    // ==========================

    const recentDeliveries = await Delivery.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("driver", "name");

    // ==========================
    // Fleet Status
    // ==========================

    const fleetStatus = await Vehicle.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("driver", "name");

    // ==========================
    // Route Summary
    // ==========================

    const completedRoutes = await Route.countDocuments({
      status: "Completed",
    });

    const plannedRoutes = await Route.countDocuments({
      status: "Planned",
    });

    // ==========================
    // Response
    // ==========================

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalDeliveries,
          pendingDeliveries,
          deliveredDeliveries,
          totalVehicles,
          availableVehicles,
          totalDrivers,
          totalRoutes,
        },

        monthlyDeliveries,

        recentDeliveries,

        fleetStatus,

        routeSummary: {
          completedRoutes,
          plannedRoutes,
        },
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
      error: error.message,
    });
  }
};
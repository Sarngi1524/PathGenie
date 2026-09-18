import Delivery from "../models/Delivery.js";
import Vehicle from "../models/Vehicle.js";
import User from "../models/User.js";
import Route from "../models/Route.js";

// ========================================
// Dashboard Report
// ========================================
export const getDashboardReport = async (req, res) => {
  try {
    const [
      totalDeliveries,
      completedDeliveries,
      pendingDeliveries,
      totalVehicles,
      availableVehicles,
      totalDrivers,
      totalRoutes,
    ] = await Promise.all([
      Delivery.countDocuments(),
      Delivery.countDocuments({ status: "Delivered" }),
      Delivery.countDocuments({
        status: { $ne: "Delivered" },
      }),
      Vehicle.countDocuments(),
      Vehicle.countDocuments({ status: "Available" }),
      User.countDocuments({ role: "driver" }),
      Route.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalDeliveries,
        completedDeliveries,
        pendingDeliveries,
        totalVehicles,
        availableVehicles,
        totalDrivers,
        totalRoutes,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to generate dashboard report.",
    });
  }
};

// ========================================
// Delivery Status Report
// ========================================
export const getDeliveryStatusReport = async (req, res) => {
  try {
    const report = await Delivery.aggregate([
      {
        $group: {
          _id: "$status",
          total: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch delivery report.",
    });
  }
};

// ========================================
// Vehicle Type Report
// ========================================
export const getVehicleReport = async (req, res) => {
  try {
    const report = await Vehicle.aggregate([
      {
        $group: {
          _id: "$vehicleType",
          total: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch vehicle report.",
    });
  }
};

// ========================================
// Driver Report
// ========================================
export const getDriverReport = async (req, res) => {
  try {
    const report = await User.aggregate([
      {
        $match: {
          role: "driver",
        },
      },
      {
        $group: {
          _id: "$isActive",
          total: {
            $sum: 1,
          },
        },
      },
    ]);

    res.json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch driver report.",
    });
  }
};
// ========================================
// Monthly Delivery Trend
// ========================================
export const getMonthlyDeliveryTrend = async (req, res) => {
  try {
    const report = await Delivery.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id": 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate monthly report",
    });
  }
};
// ========================================
// Top Drivers Report
// ========================================

export const getTopDrivers = async (req, res) => {
  try {
    const report = await Delivery.aggregate([
      {
        $match: {
          driver: { $ne: null },
        },
      },
      {
        $group: {
          _id: "$driver",
          deliveries: { $sum: 1 },
        },
      },
      {
        $sort: {
          deliveries: -1,
        },
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "driver",
        },
      },
      {
        $unwind: "$driver",
      },
      {
        $project: {
          deliveries: 1,
          name: "$driver.name",
          email: "$driver.email",
          phone: "$driver.phone",
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch top drivers.",
    });
  }
};
// ========================================
// Top Routes Report
// ========================================

export const getTopRoutes = async (req, res) => {
  try {
    const report = await Delivery.aggregate([
      {
        $group: {
          _id: {
            pickup: "$pickupAddress",
            delivery: "$deliveryAddress",
          },
          totalDeliveries: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          totalDeliveries: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch top routes.",
    });
  }
};

// ========================================
// Recent Activity
// ========================================

export const getRecentActivity = async (req, res) => {
  try {
    const activities = await Delivery.find()
      .populate("driver", "name")
      .populate("vehicle", "vehicleNumber")
      .sort({ updatedAt: -1 })
      .limit(10)
      .select(
        "orderId customerName status updatedAt driver vehicle"
      );

    res.status(200).json({
      success: true,
      data: activities,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch recent activity.",
    });
  }
};
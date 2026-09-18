import Earning from "../models/Earning.js";
import Delivery from "../models/Delivery.js";
import User from "../models/User.js";

// ======================================
// GET DRIVER EARNINGS SUMMARY
// GET /api/driver/earnings
// ======================================
export const getDriverEarnings = async (req, res) => {
  try {
    const driverId = req.user._id;

    const driverProfile = await User.findById(driverId).select(
      "payPerKm"
    );

    const payPerKm = driverProfile?.payPerKm || 0;

    const earnings = await Earning.find({
      driver: driverId,
    })
      .populate("delivery", "orderId customerName status distance deliveredAt")
      .sort({ date: -1 });

    const deliveredDistance = await Delivery.aggregate([
      {
        $match: {
          driver: driverId,
          status: "Delivered",
          distance: {
            $gt: 0,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalDistance: {
            $sum: "$distance",
          },
        },
      },
    ]);

    const distanceKm =
      deliveredDistance.length > 0
        ? deliveredDistance[0].totalDistance / 1000
        : 0;

    const totalRecordEarnings = earnings.reduce(
      (sum, item) => sum + Number(item.total || 0),
      0
    );

    const bonus = earnings.reduce(
      (sum, item) => sum + Number(item.bonus || 0),
      0
    );

    const penalty = earnings.reduce(
      (sum, item) => sum + Number(item.penalty || 0),
      0
    );

    const calculatedEarnings = Number(
      (distanceKm * payPerKm).toFixed(2)
    );

    const totalEarnings =
      earnings.length > 0
        ? Number(totalRecordEarnings.toFixed(2))
        : calculatedEarnings;

    res.status(200).json({
      success: true,
      summary: {
        totalEarnings,
        totalBonus: bonus,
        totalPenalty: penalty,
        totalDeliveries: earnings.length || Math.max(deliveredDistance.length, 0),
        ratePerKm: payPerKm,
        totalDistanceKm: Number(distanceKm.toFixed(2)),
        calculatedEarnings,
      },
      earnings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch earnings.",
    });
  }
};

// ======================================
// MONTHLY EARNINGS
// GET /api/driver/earnings/monthly
// ======================================
export const getMonthlyEarnings = async (req, res) => {
  try {
    const driverId = req.user._id;

    const result = await Earning.aggregate([
      {
        $match: {
          driver: driverId,
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            year: { $year: "$date" },
          },
          total: { $sum: "$total" },
          deliveries: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": -1,
          "_id.month": -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      monthly: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch monthly earnings.",
    });
  }
};

// ======================================
// WEEKLY EARNINGS
// GET /api/driver/earnings/weekly
// ======================================
export const getWeeklyEarnings = async (req, res) => {
  try {
    const driverId = req.user._id;

    const weekAgo = new Date();

    weekAgo.setDate(weekAgo.getDate() - 7);

    const earnings = await Earning.find({
      driver: driverId,
      date: {
        $gte: weekAgo,
      },
    });

    const total = earnings.reduce(
      (sum, item) => sum + item.total,
      0
    );

    res.status(200).json({
      success: true,
      total,
      earnings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch weekly earnings.",
    });
  }
};

// ======================================
// RECENT PAYMENTS
// GET /api/driver/earnings/recent
// ======================================
export const getRecentPayments = async (req, res) => {
  try {
    const payments = await Earning.find({
      driver: req.user._id,
    })
      .sort({
        createdAt: -1,
      })
      .limit(10)
      .populate(
        "delivery",
        "orderId customerName"
      );

    res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch recent payments.",
    });
  }
};
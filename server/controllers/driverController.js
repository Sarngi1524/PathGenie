import User from "../models/User.js";
import Delivery from "../models/Delivery.js";

// ==========================================
// DRIVER DASHBOARD
// GET /api/driver/dashboard
// ==========================================
export const getDriverDashboard = async (req, res) => {
  try {
    const driverId = req.user._id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalDeliveries = await Delivery.countDocuments({
      driver: driverId,
    });

    const todayDeliveries = await Delivery.countDocuments({
      driver: driverId,
      createdAt: { $gte: today },
    });

    const completed = await Delivery.countDocuments({
      driver: driverId,
      status: "Delivered",
    });

    const pending = await Delivery.countDocuments({
      driver: driverId,
      status: {
        $in: ["Assigned", "Picked Up", "In Transit"],
      },
    });

    const cancelled = await Delivery.countDocuments({
      driver: driverId,
      status: "Cancelled",
    });

    const recentDeliveries = await Delivery.find({
      driver: driverId,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("route", "routeName")
      .populate("vehicle", "vehicleNumber");

    const totalDistance = await Delivery.aggregate([
      {
        $match: {
          driver: req.user._id,
        },
      },
      {
        $group: {
          _id: null,
          distance: {
            $sum: "$distance",
          },
        },
      },
    ]);

    const driverProfile = await User.findById(driverId).select(
      "payPerKm"
    );

    const payPerKm = driverProfile?.payPerKm || 0;
    const totalDistanceKm =
      totalDistance.length > 0
        ? totalDistance[0].distance / 1000
        : 0;
    const estimatedEarnings = Number(
      (totalDistanceKm * payPerKm).toFixed(2)
    );

    res.status(200).json({
      success: true,

      stats: {
        totalDeliveries,

        todayDeliveries,

        completed,

        pending,

        cancelled,

        distance:
          totalDistance.length > 0
            ? totalDistance[0].distance
            : 0,

        earnings: estimatedEarnings,
        payPerKm,
      },

      recentDeliveries,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard.",
    });
  }
};

// ==========================================
// MY DELIVERIES
// GET /api/driver/deliveries
// ==========================================
export const getMyDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({
      driver: req.user._id,
    })
      .populate("vehicle")
      .populate("route")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: deliveries.length,
      deliveries,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch deliveries.",
    });
  }
};

// ==========================================
// DELIVERY DETAILS
// GET /api/driver/deliveries/:id
// ==========================================
export const getDeliveryDetails = async (req, res) => {
  try {
    const delivery = await Delivery.findOne({
      _id: req.params.id,
      driver: req.user._id,
    })
      .populate("vehicle")
      .populate("route");

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found.",
      });
    }

    res.status(200).json({
      success: true,
      delivery,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================================
// UPDATE DELIVERY STATUS
// PATCH /api/driver/deliveries/:id/status
// ==========================================
export const updateDeliveryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = [
      "Assigned",
      "Picked Up",
      "In Transit",
      "Delivered",
      "Cancelled",
      "Failed",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid delivery status.",
      });
    }

    const delivery = await Delivery.findOne({
      _id: req.params.id,
      driver: req.user._id,
    });

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found.",
      });
    }

    delivery.status = status;

    if (status === "Picked Up") {
      delivery.pickedUpAt = new Date();
    }

    if (status === "Delivered") {
      delivery.deliveredAt = new Date();
    }

    await delivery.save();

    res.status(200).json({
      success: true,
      message: "Delivery updated successfully.",
      delivery,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================================
// DRIVER PROFILE
// GET /api/driver/profile
// ==========================================
export const getDriverProfile = async (req, res) => {
  try {
    const driver = await User.findById(req.user._id).select(
      "-password"
    );

    res.status(200).json({
      success: true,
      driver,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch profile.",
    });
  }
};

// ==========================================
// UPDATE DRIVER PROFILE
// PUT /api/driver/profile
// ==========================================
export const updateDriverProfile = async (req, res) => {
  try {
    const driver = await User.findById(req.user._id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found.",
      });
    }

    driver.name = req.body.name || driver.name;
    driver.phone = req.body.phone || driver.phone;
    driver.avatar = req.body.avatar || driver.avatar;
    driver.payPerKm =
      req.body.payPerKm !== undefined
        ? Number(req.body.payPerKm)
        : driver.payPerKm;

    await driver.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      driver,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
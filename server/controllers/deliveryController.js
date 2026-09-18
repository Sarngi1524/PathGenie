import Delivery from "../models/Delivery.js";
import User from "../models/User.js";
import Route from "../models/Route.js";

export const createDelivery = async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      pickupAddress,
      deliveryAddress,
      priority,
      deliveryDate,
      estimatedTime,
      weight,
      notes,
    } = req.body;

    // Validation
    if (
      !customerName ||
      !customerPhone ||
      !pickupAddress ||
      !deliveryAddress
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Generate Professional Order ID
    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    const orderId = `PG-${new Date().getFullYear()}-${randomNumber}`;

    // Create Delivery
    const delivery = await Delivery.create({
      orderId,
      customerName,
      customerPhone,
      pickupAddress,
      deliveryAddress,
      priority,
      deliveryDate,
      estimatedTime,
      weight,
      notes,
      createdBy: req.user.id,
    });

    const populatedDelivery = await Delivery.findById(delivery._id)
      .populate("driver", "name email phone")
      .populate("vehicle", "vehicleNumber vehicleType status")
      .populate("route", "routeName source destination")
      .populate("createdBy", "name email");

    res.status(201).json({
      success: true,
      message: "Delivery created successfully.",
      data: populatedDelivery,
    });
  } catch (error) {
    console.error("Create Delivery Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const getAllDeliveries = async (req, res) => {
  try {
    const {
      search = "",
      status,
      priority,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // Search
    if (search) {
      query.$or = [
        {
          customerName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          orderId: {
            $regex: search,
            $options: "i",
          },
        },
        {
          customerPhone: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Status Filter
    if (status && status !== "All") {
      query.status = status;
    }

    // Priority Filter
    if (priority && priority !== "All") {
      query.priority = priority;
    }

    const total = await Delivery.countDocuments(query);

    const deliveries = await Delivery.find(query)
      .populate("driver", "name email phone")
      .populate("vehicle", "vehicleNumber vehicleType status")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: deliveries.length,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      data: deliveries,
    });

  } catch (error) {
    console.error("Get Deliveries Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const getDeliveryById = async (req, res) => {
  try {
    const { id } = req.params;

    const delivery = await Delivery.findById(id)
      .populate("driver", "name email phone")
      .populate("vehicle", "vehicleNumber vehicleType fuelType status")
      .populate("createdBy", "name email");

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found",
      });
    }

    // Get route associated with this delivery
    const route = await Route.findOne({ delivery: id })
      .populate("driver", "name phone")
      .populate("vehicle", "vehicleNumber vehicleType");

    res.status(200).json({
      success: true,
      data: {
        delivery,
        route,
      },
    });

  } catch (error) {
    console.error("Get Delivery Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const updateDelivery = async (req, res) => {
  try {
    const { id } = req.params;

    const delivery = await Delivery.findById(id);

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found",
      });
    }

    // Only allow these fields to be updated
    const allowedFields = [
      "customerName",
      "customerPhone",
      "pickupAddress",
      "deliveryAddress",
      "priority",
      "status",
      "deliveryDate",
      "estimatedTime",
      "weight",
      "notes",
      "driver",
      "vehicle",
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedDelivery = await Delivery.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("driver", "name email phone")
      .populate("vehicle", "vehicleNumber vehicleType fuelType status")
      .populate("createdBy", "name email");

    res.status(200).json({
      success: true,
      message: "Delivery updated successfully.",
      data: updatedDelivery,
    });

  } catch (error) {
    console.error("Update Delivery Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const deleteDelivery = async (req, res) => {
  try {
    const { id } = req.params;

    const delivery = await Delivery.findById(id);

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found",
      });
    }

    // Delete associated route (if it exists)
    await Route.findOneAndDelete({
      delivery: id,
    });

    // Delete delivery
    await Delivery.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Delivery deleted successfully.",
    });

  } catch (error) {
    console.error("Delete Delivery Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const assignDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const { driverId } = req.body;

    // Validate input
    if (!driverId) {
      return res.status(400).json({
        success: false,
        message: "Driver ID is required.",
      });
    }

    // Check delivery exists
    const delivery = await Delivery.findById(id);

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found.",
      });
    }

    // Prevent reassigning delivered/cancelled deliveries
    if (
      delivery.status === "Delivered" ||
      delivery.status === "Cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message: `Cannot assign driver to a ${delivery.status.toLowerCase()} delivery.`,
      });
    }

    // Find driver
    const driver = await User.findOne({
      _id: driverId,
      role: "driver",
    });

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found.",
      });
    }

    // Optional availability check
    if (
      Object.prototype.hasOwnProperty.call(driver.toObject(), "isAvailable") &&
      !driver.isAvailable
    ) {
      return res.status(400).json({
        success: false,
        message: "Driver is currently unavailable.",
      });
    }

    // Assign driver
    delivery.driver = driver._id;
    delivery.status = "Assigned";

    await delivery.save();

    const updatedDelivery = await Delivery.findById(id)
      .populate("driver", "name email phone")
      .populate("vehicle", "vehicleNumber vehicleType fuelType status")
      .populate("createdBy", "name email");

    res.status(200).json({
      success: true,
      message: "Driver assigned successfully.",
      data: updatedDelivery,
    });

  } catch (error) {
    console.error("Assign Driver Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const getMyDeliveries = async (req, res) => {
  try {
    const {
      search = "",
      status,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {
      driver: req.user.id,
    };

    // Search
    if (search) {
      query.$or = [
        {
          orderId: {
            $regex: search,
            $options: "i",
          },
        },
        {
          customerName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          customerPhone: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Status Filter
    if (status && status !== "All") {
      query.status = status;
    }

    const total = await Delivery.countDocuments(query);

    const deliveries = await Delivery.find(query)
      .populate("vehicle", "vehicleNumber vehicleType")
      .populate("createdBy", "name")
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: deliveries.length,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: deliveries,
    });

  } catch (error) {
    console.error("Get My Deliveries Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const updateDeliveryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = [
      "Assigned",
      "In Transit",
      "Delivered",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid delivery status.",
      });
    }

    const delivery = await Delivery.findById(id);

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found.",
      });
    }

    // Only assigned driver can update
    if (
      !delivery.driver ||
      delivery.driver.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not assigned to this delivery.",
      });
    }

    // Status flow validation
    const validTransitions = {
      Assigned: ["In Transit"],
      "In Transit": ["Delivered"],
      Delivered: [],
    };

    if (
      delivery.status !== status &&
      !validTransitions[delivery.status]?.includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: `Cannot change status from ${delivery.status} to ${status}.`,
      });
    }

    delivery.status = status;

    await delivery.save();

    const updatedDelivery = await Delivery.findById(id)
      .populate("driver", "name phone email")
      .populate("vehicle", "vehicleNumber vehicleType")
      .populate("createdBy", "name email");

    res.status(200).json({
      success: true,
      message: "Delivery status updated successfully.",
      data: updatedDelivery,
    });

  } catch (error) {
    console.error("Update Delivery Status Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const getRecentDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find()
      .populate("driver", "name phone")
      .populate("vehicle", "vehicleNumber vehicleType")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    const recentDeliveries = deliveries.map((delivery) => ({
      _id: delivery._id,
      orderId: delivery.orderId,
      customerName: delivery.customerName,
      customerPhone: delivery.customerPhone,
      status: delivery.status,
      priority: delivery.priority,
      driver: delivery.driver,
      vehicle: delivery.vehicle,
      createdBy: delivery.createdBy,
      createdAt: delivery.createdAt,
    }));

    res.status(200).json({
      success: true,
      count: recentDeliveries.length,
      data: recentDeliveries,
    });

  } catch (error) {
    console.error("Get Recent Deliveries Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
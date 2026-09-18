import Vehicle from "../models/Vehicle.js";

// Create Vehicle
export const createVehicle = async (req, res) => {
  try {
    const {
      vehicleNumber,
      vehicleType,
      capacity,
      fuelType,
      status,
    } = req.body;

    // Check required fields
    if (
      !vehicleNumber ||
      !vehicleType ||
      !capacity ||
      !fuelType
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    // Check duplicate vehicle number
    const existingVehicle = await Vehicle.findOne({ vehicleNumber });

    if (existingVehicle) {
      return res.status(400).json({
        success: false,
        message: "Vehicle already exists",
      });
    }

    const vehicle = await Vehicle.create({
      vehicleNumber,
      vehicleType,
      capacity,
      fuelType,
      status,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: vehicle,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// Get All Vehicles
export const getAllVehicles = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      vehicleType,
    } = req.query;

    const query = {};

    if (search) {
      query.vehicleNumber = {
        $regex: search,
        $options: "i",
      };
    }

    if (status) {
      query.status = status;
    }

    if (vehicleType) {
      query.vehicleType = vehicleType;
    }

    const vehicles = await Vehicle.find(query)
      .populate("driver", "name email")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Vehicle.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      data: vehicles,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// Get Vehicle By ID
export const getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;

    const vehicle = await Vehicle.findById(id)
      .populate("driver", "name email phone")
      .populate("createdBy", "name email");

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      success: true,
      data: vehicle,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// Update Vehicle
export const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("driver", "name email")
      .populate("createdBy", "name email");

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: updatedVehicle,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// Delete Vehicle
export const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    await vehicle.deleteOne();

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
import User from "../models/User.js";

// Assign Vehicle to Driver
export const assignVehicleToDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const { driverId } = req.body;

    // Check vehicle
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    // Check driver
    const driver = await User.findById(driverId);

    if (!driver || driver.role !== "driver") {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    // Vehicle already assigned?
    if (vehicle.driver) {
      return res.status(400).json({
        success: false,
        message: "Vehicle is already assigned",
      });
    }

    // Driver already has a vehicle?
    const assignedVehicle = await Vehicle.findOne({
      driver: driverId,
      status: { $ne: "Maintenance" },
    });

    if (assignedVehicle) {
      return res.status(400).json({
        success: false,
        message: "Driver already has an assigned vehicle",
      });
    }

    vehicle.driver = driverId;
    vehicle.status = "On Trip";

    await vehicle.save();

    await vehicle.populate("driver", "name email");

    res.status(200).json({
      success: true,
      message: "Vehicle assigned successfully",
      data: vehicle,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// Unassign Vehicle
export const unassignVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    vehicle.driver = null;
    vehicle.status = "Available";

    await vehicle.save();

    res.status(200).json({
      success: true,
      message: "Vehicle unassigned successfully",
      data: vehicle,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// Update Vehicle Status
export const updateVehicleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = [
      "Available",
      "On Trip",
      "Maintenance",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    vehicle.status = status;
    await vehicle.save();

    res.status(200).json({
      success: true,
      message: "Vehicle status updated successfully",
      data: vehicle,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// Fleet Statistics
export const getFleetStats = async (req, res) => {
  try {
    const totalVehicles = await Vehicle.countDocuments();

    const availableVehicles = await Vehicle.countDocuments({
      status: "Available",
    });

    const onTripVehicles = await Vehicle.countDocuments({
      status: "On Trip",
    });

    const maintenanceVehicles = await Vehicle.countDocuments({
      status: "Maintenance",
    });

    res.status(200).json({
      success: true,
      data: {
        totalVehicles,
        availableVehicles,
        onTripVehicles,
        maintenanceVehicles,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
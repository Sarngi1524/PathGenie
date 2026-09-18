import Vehicle from "../models/Vehicle.js";

export const updateDriverLocation = async (req, res) => {
  try {
    const { vehicleId, lat, lng } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    vehicle.currentLocation = { lat, lng };
    await vehicle.save();

    // Broadcast location to all connected clients
    const io = req.app.get("io");

    io.emit("driver:locationUpdate", {
      vehicleId,
      driverId: vehicle.driver,
      lat,
      lng,
      updatedAt: new Date(),
    });

    res.status(200).json({
      success: true,
      message: "Location updated successfully",
      data: vehicle.currentLocation,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
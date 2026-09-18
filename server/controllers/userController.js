import User from "../models/User.js";

export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await User.find({ role: "driver" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: drivers.length,
      data: drivers,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
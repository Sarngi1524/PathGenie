import Attendance from "../models/Attendance.js";

// ==============================
// CHECK IN
// POST /api/driver/check-in
// ==============================
export const checkIn = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let attendance = await Attendance.findOne({
      driver: req.user._id,
      date: today,
    });

    if (attendance) {
      return res.status(400).json({
        success: false,
        message: "Already checked in today.",
      });
    }

    attendance = await Attendance.create({
      driver: req.user._id,
      date: today,
      checkIn: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Checked in successfully.",
      attendance,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ==============================
// CHECK OUT
// POST /api/driver/check-out
// ==============================
export const checkOut = async (req, res) => {

  try {

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
      driver: req.user._id,
      date: today,
    });

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Please check in first.",
      });
    }

    if (attendance.checkOut) {
      return res.status(400).json({
        success: false,
        message: "Already checked out.",
      });
    }

    attendance.checkOut = new Date();

    const hours =
      (attendance.checkOut - attendance.checkIn) /
      (1000 * 60 * 60);

    attendance.totalHours = Number(hours.toFixed(2));

    await attendance.save();

    res.status(200).json({
      success: true,
      message: "Checked out successfully.",
      attendance,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// ==============================
// GET ATTENDANCE
// ==============================
export const getAttendance = async (req, res) => {

  try {

    const records = await Attendance.find({
      driver: req.user._id,
    }).sort({
      date: -1,
    });

    res.status(200).json({
      success: true,
      attendance: records,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};
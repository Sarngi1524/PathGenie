import Setting from "../models/Setting.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// =========================================
// Get User Settings
// =========================================
export const getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne({
      user: req.user.id,
    });

    // Create default settings if not found
    if (!settings) {
      const user = await User.findById(req.user.id);

      settings = await Setting.create({
        user: user._id,
        name: user.name,
        email: user.email,
      });
    }

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch settings.",
    });
  }
};

// =========================================
// Update Settings
// =========================================
export const updateSettings = async (req, res) => {
  try {
    const settings = await Setting.findOne({
      user: req.user.id,
    });

    if (!settings) {
      return res.status(404).json({
        success: false,
        message: "Settings not found.",
      });
    }

    Object.assign(settings, req.body);

    await settings.save();

    res.status(200).json({
      success: true,
      message: "Settings updated successfully.",
      data: settings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to update settings.",
    });
  }
};

// =========================================
// Change Password
// =========================================
export const changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All password fields are required.",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    const user = await User.findById(req.user.id).select("+password");

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to change password.",
    });
  }
};
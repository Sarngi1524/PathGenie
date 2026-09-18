import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    // Profile
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    // Company
    companyName: {
      type: String,
      default: "",
    },

    gstNumber: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      default: "",
    },

    // Notifications
    emailNotifications: {
      type: Boolean,
      default: true,
    },

    deliveryAlerts: {
      type: Boolean,
      default: true,
    },

    driverAlerts: {
      type: Boolean,
      default: true,
    },

    fleetAlerts: {
      type: Boolean,
      default: true,
    },

    // Theme
    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "light",
    },

    primaryColor: {
      type: String,
      default: "#818263",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Setting", settingSchema);
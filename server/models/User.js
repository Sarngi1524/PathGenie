import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["admin", "driver"],
      default: "driver",
    },

    phone: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

  employeeId: {
    type: String,
    default: "",
  },

  vehicleType: {
    type: String,
    enum: ["Bike", "Car", "Van", "Truck"],
    default: "Van",
  },

  vehicleNumber: {
    type: String,
    default: "",
  },

  licenseNumber: {
    type: String,
    default: "",
  },

  currentStatus: {
    type: String,
    enum: [
      "Available",
      "On Delivery",
      "Offline"
    ],
    default: "Available",
  },

  totalDeliveries: {
    type: Number,
    default: 0,
  },

  totalDistance: {
    type: Number,
    default: 0,
  },

  payPerKm: {
    type: Number,
    default: 0,
  },

  totalEarnings: {
    type: Number,
    default: 0,
  },

  isActive: {
    type: Boolean,
    default: true,
  }
});
const User = mongoose.model("User", userSchema);

export default User;
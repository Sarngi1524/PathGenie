import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    vehicleType: {
      type: String,
      enum: [
        "Bike",
        "Car",
        "Van",
        "Truck"
      ],
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    fuelType: {
      type: String,
      enum: [
        "Petrol",
        "Diesel",
        "Electric",
        "CNG"
      ],
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Available",
        "On Trip",
        "Maintenance"
      ],
      default: "Available",
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    currentLocation: {
      lat: {
        type: Number,
        default: 0,
      },

      lng: {
        type: Number,
        default: 0,
      },
    },
currentRoute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Route",
    default: null,
},
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
import mongoose from "mongoose";

const routeSchema = new mongoose.Schema(
  {
    delivery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Delivery",
      required: true,
    },

    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    pickupAddress: {
      type: String,
      required: true,
    },

    deliveryAddress: {
      type: String,
      required: true,
    },

    pickupCoordinates: {
      lat: Number,
      lng: Number,
    },

    deliveryCoordinates: {
      lat: Number,
      lng: Number,
    },

    distance: {
      type: Number,
      default: 0,
    },

    duration: {
      type: Number,
      default: 0,
    },

    routeGeometry: {
      type: Object,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "Planned",
        "Started",
        "Completed",
      ],
      default: "Planned",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Route", routeSchema);
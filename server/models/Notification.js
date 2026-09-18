import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "delivery",
        "fleet",
        "driver",
        "route",
        "system",
      ],
      default: "system",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    recipient: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},

role: {
  type: String,
  enum: ["admin", "driver"],
  default: "driver",
},

relatedDelivery: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Delivery",
  default: null,
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Notification",
  notificationSchema
);
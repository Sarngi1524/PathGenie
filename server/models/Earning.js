import mongoose from "mongoose";

const earningSchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    delivery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Delivery",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      default: 0,
    },

    bonus: {
      type: Number,
      default: 0,
    },

    penalty: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Paid",
      ],
      default: "Pending",
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Earning",
  earningSchema
);
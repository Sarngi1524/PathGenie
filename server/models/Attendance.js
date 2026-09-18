import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    checkIn: {
      type: Date,
      default: null,
    },

    checkOut: {
      type: Date,
      default: null,
    },

    totalHours: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "Present",
        "Absent",
        "Half Day",
      ],
      default: "Present",
    },
  },
  {
    timestamps: true,
  }
);

attendanceSchema.index(
  {
    driver: 1,
    date: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model(
  "Attendance",
  attendanceSchema
);
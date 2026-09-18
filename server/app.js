import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import earningRoutes from "./routes/earningRoutes.js";
import driverNotificationRoutes from "./routes/driverNotificationRoutes.js"

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/settings", settingsRoutes);

app.use("/api/driver", driverRoutes);
app.use("/api/driver/attendance", attendanceRoutes);
app.use("/api/driver/earnings", earningRoutes);
app.use("/api/driver/notifications",driverNotificationRoutes);


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to PathGenie API 🚚",
  });
});

export default app;
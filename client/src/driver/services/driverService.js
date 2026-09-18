import axiosInstance from "../../utils/axiosInstance";

// Dashboard
export const getDriverDashboard = () =>
  axiosInstance.get("/driver/dashboard");

// Deliveries
export const getMyDeliveries = () =>
  axiosInstance.get("/driver/deliveries");

export const getDeliveryDetails = (id) =>
  axiosInstance.get(`/driver/deliveries/${id}`);

export const updateDeliveryStatus = (id, data) =>
  axiosInstance.patch(`/driver/deliveries/${id}/status`, data);

// Attendance
export const getAttendance = () =>
  axiosInstance.get("/driver/attendance");

export const checkIn = () =>
  axiosInstance.post("/driver/attendance/check-in");

export const checkOut = () =>
  axiosInstance.post("/driver/attendance/check-out");

// Earnings
export const getDriverEarnings = () =>
  axiosInstance.get("/driver/earnings");

export const getMonthlyEarnings = () =>
  axiosInstance.get("/driver/earnings/monthly");

export const getWeeklyEarnings = () =>
  axiosInstance.get("/driver/earnings/weekly");

export const getRecentPayments = () =>
  axiosInstance.get("/driver/earnings/recent");

// ===============================
// Notifications
// ===============================

export const getDriverNotifications = () =>
  axiosInstance.get("/driver/notifications");

export const markNotificationRead = (id) =>
  axiosInstance.patch(`/driver/notifications/${id}/read`);

export const markAllNotificationsRead = () =>
  axiosInstance.patch("/driver/notifications/read-all");
// ======================
// Driver Profile
// ======================

export const getDriverProfile = () =>
  axiosInstance.get("/driver/profile");

export const updateDriverProfile = (data) =>
  axiosInstance.put("/driver/profile", data);
import api from "./api";

// ======================================
// Dashboard Report
// ======================================

export const getDashboardReport = async () => {
  const response = await api.get("/reports/dashboard");
  return response.data;
};

// ======================================
// Delivery Status Report
// ======================================

export const getDeliveryStatusReport = async () => {
  const response = await api.get("/reports/delivery-status");
  return response.data;
};

// ======================================
// Vehicle Report
// ======================================

export const getVehicleReport = async () => {
  const response = await api.get("/reports/vehicles");
  return response.data;
};

// ======================================
// Driver Report
// ======================================

export const getDriverReport = async () => {
  const response = await api.get("/reports/drivers");
  return response.data;
};

export const getMonthlyTrend = async () => {
  const response = await api.get("/reports/monthly-trend");
  return response.data;
};

export const getTopDrivers = async () => {
  const response = await api.get("/reports/top-drivers");
  return response.data;
};

export const getTopRoutes = async () => {
  const response = await api.get("/reports/top-routes");
  return response.data;
};

export const getRecentActivity = async () => {
  const response = await api.get("/reports/recent-activity");
  return response.data;
};
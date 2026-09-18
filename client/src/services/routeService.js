import api from "./api";

// =============================
// Get All Routes
// =============================
export const getRoutes = async (params = {}) => {
  const response = await api.get("/routes", {
    params,
  });

  return response.data;
};

// =============================
// Get Route By ID
// =============================
export const getRouteById = async (id) => {
  const response = await api.get(`/routes/${id}`);

  return response.data;
};

// =============================
// Create Route
// =============================
export const createRoute = async (routeData) => {
  const response = await api.post("/routes", routeData);

  return response.data;
};

// =============================
// Geocode Address
// =============================
export const geocodeLocation = async (address) => {
  const response = await api.post("/routes/geocode", {
    address,
  });

  return response.data;
};

// =============================
// Calculate Route
// =============================
export const calculateRoute = async (data) => {
  const response = await api.post("/routes/calculate", data);

  return response.data;
};
// ==============================
// Update Route Status
// ==============================
export const updateRouteStatus = async (id, status) => {
  const response = await api.patch(`/routes/${id}/status`, {
    status,
  });

  return response.data;
};
export const deleteRoute = async (id) => {
  const response = await api.delete(`/routes/${id}`);
  return response.data;
};

export const updateRoute = async (id, data) => {
  const response = await api.put(`/routes/${id}`, data);
  return response.data;
};
// Route Statistics
export const getRouteStats = async () => {
  const response = await api.get("/routes/stats");
  return response.data;
};

// Driver Routes
export const getMyRoutes = async () => {
  const response = await api.get("/routes/my");
  return response.data;
};
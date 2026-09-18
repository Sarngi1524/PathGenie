import api from "./api";

// =========================
// Get All Vehicles
// =========================
export const getVehicles = async (params = {}) => {
  const response = await api.get("/vehicles", { params });
  return response.data;
};

// =========================
// Get Vehicle By ID
// =========================
export const getVehicleById = async (id) => {
  const response = await api.get(`/vehicles/${id}`);
  return response.data;
};

// =========================
// Create Vehicle
// =========================
export const createVehicle = async (vehicleData) => {
  const response = await api.post("/vehicles", vehicleData);
  return response.data;
};

// =========================
// Update Vehicle
// =========================
export const updateVehicle = async (id, vehicleData) => {
  const response = await api.put(`/vehicles/${id}`, vehicleData);
  return response.data;
};

// =========================
// Delete Vehicle
// =========================
export const deleteVehicle = async (id) => {
  const response = await api.delete(`/vehicles/${id}`);
  return response.data;
};

// =========================
// Assign Driver
// =========================
export const assignDriver = async (vehicleId, driverId) => {
  const response = await api.put(
    `/vehicles/${vehicleId}/assign-driver`,
    { driverId }
  );

  return response.data;
};

// =========================
// Unassign Driver
// =========================
export const unassignDriver = async (vehicleId) => {
  const response = await api.put(
    `/vehicles/${vehicleId}/unassign-driver`
  );

  return response.data;
};

// =========================
// Update Vehicle Status
// =========================
export const updateVehicleStatus = async (
  vehicleId,
  status
) => {
  const response = await api.put(
    `/vehicles/${vehicleId}/status`,
    { status }
  );

  return response.data;
};

// =========================
// Fleet Statistics
// =========================
export const getFleetStats = async () => {
  const response = await api.get("/vehicles/stats");
  return response.data;
};
import api from "./api";

// =============================
// Get All Drivers
// =============================
export const getDrivers = async () => {
  const response = await api.get("/users/drivers");
  return response.data;
};

// =============================
// Driver Statistics
// =============================
export const getDriverStats = async () => {
  const response = await getDrivers();

  const drivers = response.data || [];

  return {
    totalDrivers: drivers.length,

    activeDrivers: drivers.filter(
      (driver) => driver.isActive
    ).length,

    inactiveDrivers: drivers.filter(
      (driver) => !driver.isActive
    ).length,
  };
};
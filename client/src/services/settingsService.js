import api from "./api";

// ================================
// Get User Settings
// ================================
export const getSettings = async () => {
  const response = await api.get("/settings");
  return response.data;
};

// ================================
// Update Settings
// ================================
export const updateSettings = async (settingsData) => {
  const response = await api.put("/settings", settingsData);
  return response.data;
};

// ================================
// Change Password
// ================================
export const changePassword = async (passwordData) => {
  const response = await api.patch(
    "/settings/password",
    passwordData
  );

  return response.data;
};
import api from "./api";

// ===============================
// Get All Notifications
// ===============================
export const getNotifications = async () => {
  const response = await api.get("/notifications");
  return response.data;
};

// ===============================
// Get Notification Statistics
// ===============================
export const getNotificationStats = async () => {
  const response = await api.get("/notifications/stats");
  return response.data;
};

// ===============================
// Mark Single Notification as Read
// ===============================
export const markNotificationAsRead = async (id) => {
  const response = await api.patch(`/notifications/${id}/read`);
  return response.data;
};

// ===============================
// Mark All Notifications as Read
// ===============================
export const markAllNotificationsAsRead = async () => {
  const response = await api.patch("/notifications/read-all");
  return response.data;
};

// ===============================
// Delete Notification
// ===============================
export const deleteNotification = async (id) => {
  const response = await api.delete(`/notifications/${id}`);
  return response.data;
};

// ===============================
// Clear All Notifications
// ===============================
export const clearNotifications = async () => {
  const response = await api.delete("/notifications");
  return response.data;
};
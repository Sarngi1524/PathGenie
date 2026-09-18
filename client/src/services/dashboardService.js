import axiosInstance from "../utils/axiosInstance";

export const getDashboardData = async () => {
  return await axiosInstance.get("/dashboard");
};
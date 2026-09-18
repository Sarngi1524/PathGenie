import axiosInstance from "../../utils/axiosInstance";

export const getDashboard = async () => {
  const response = await axiosInstance.get("/driver/dashboard");
  return response.data;
};
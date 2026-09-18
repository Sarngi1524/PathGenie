import axiosInstance from "../utils/axiosInstance";

export const loginUser = (data) => {
  return axiosInstance.post("/auth/login", data);
};

export const registerUser = (data) => {
  return axiosInstance.post("/auth/register", data);
};

export const getProfile = () => {
  return axiosInstance.get("/auth/profile");
};
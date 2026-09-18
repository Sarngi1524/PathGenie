import axiosInstance from "../utils/axiosInstance";

export const getFleet = () => {
    return axiosInstance.get("/fleet");
};
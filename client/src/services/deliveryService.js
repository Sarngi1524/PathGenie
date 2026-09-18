import axiosInstance from "../utils/axiosInstance";

/*
====================================
GET ALL DELIVERIES
====================================
*/

export const getDeliveries = async ({
  search = "",
  status = "All",
  priority = "All",
  page = 1,
  limit = 10,
} = {}) => {
  const params = {};

  if (search) params.search = search;

  if (status !== "All") params.status = status;

  if (priority !== "All") params.priority = priority;

  params.page = page;
  params.limit = limit;

  const response = await axiosInstance.get("/deliveries", {
    params,
  });

  return response.data;
};

/*
====================================
GET SINGLE DELIVERY
====================================
*/

export const getDeliveryById = async (id) => {
  const response = await axiosInstance.get(
    `/deliveries/${id}`
  );

  return response.data;
};

/*
====================================
CREATE DELIVERY
====================================
*/

export const createDelivery = async (deliveryData) => {
  const response = await axiosInstance.post(
    "/deliveries",
    deliveryData
  );

  return response.data;
};

/*
====================================
UPDATE DELIVERY
====================================
*/

export const updateDelivery = async (
  id,
  deliveryData
) => {
  const response = await axiosInstance.put(
    `/deliveries/${id}`,
    deliveryData
  );

  return response.data;
};

/*
====================================
DELETE DELIVERY
====================================
*/

export const deleteDelivery = async (id) => {
  const response = await axiosInstance.delete(
    `/deliveries/${id}`
  );

  return response.data;
};

/*
====================================
ASSIGN DRIVER
====================================
*/

export const assignDriver = async (
  deliveryId,
  driverId
) => {
  const response = await axiosInstance.put(
    `/deliveries/${deliveryId}/assign-driver`,
    {
      driverId,
    }
  );

  return response.data;
};

/*
====================================
UPDATE DELIVERY STATUS
====================================
*/

export const updateDeliveryStatus = async (
  deliveryId,
  status
) => {
  const response = await axiosInstance.put(
    `/deliveries/${deliveryId}/status`,
    {
      status,
    }
  );

  return response.data;
};

/*
====================================
DRIVER DELIVERIES
====================================
*/

export const getMyDeliveries = async ({
  search = "",
  status = "All",
  page = 1,
  limit = 10,
} = {}) => {
  const params = {};

  if (search) params.search = search;

  if (status !== "All") params.status = status;

  params.page = page;
  params.limit = limit;

  const response = await axiosInstance.get(
    "/deliveries/my-deliveries",
    {
      params,
    }
  );

  return response.data;
};

/*
====================================
RECENT DELIVERIES
====================================
*/

export const getRecentDeliveries = async () => {
  const response = await axiosInstance.get(
    "/deliveries/recent"
  );

  return response.data;
};
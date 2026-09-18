import Route from "../models/Route.js";
import Delivery from "../models/Delivery.js";
import Vehicle from "../models/Vehicle.js";

import { geocodeAddress } from "../services/geocodingService.js";
import { getOptimizedRoute } from "../services/osrmService.js";

/* ============================================================
   Geocode Address
============================================================ */

export const geocodeLocation = async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address is required",
      });
    }

    const coordinates = await geocodeAddress(address);

    if (!coordinates) {
      return res.status(404).json({
        success: false,
        message: "Location not found",
      });
    }

    res.status(200).json({
      success: true,
      data: coordinates,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ============================================================
   Calculate Route
============================================================ */

export const calculateRoute = async (req, res) => {
  try {
    const { pickupAddress, deliveryAddress } = req.body;

    if (!pickupAddress || !deliveryAddress) {
      return res.status(400).json({
        success: false,
        message: "Pickup and Delivery address are required",
      });
    }

    const pickup = await geocodeAddress(pickupAddress);
    const delivery = await geocodeAddress(deliveryAddress);

    if (!pickup || !delivery) {
      return res.status(404).json({
        success: false,
        message: "Unable to geocode one or both locations",
      });
    }

    const route = await getOptimizedRoute(
      pickup,
      delivery
    );

    if (!route) {
      return res.status(404).json({
        success: false,
        message: "Route not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        pickupCoordinates: pickup,
        deliveryCoordinates: delivery,
        distance: route.distance,
        duration: route.duration,
        geometry: route.geometry,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ============================================================
   Create Route
============================================================ */

export const createRoute = async (req, res) => {
  try {
    const { deliveryId, vehicleId } = req.body;

    if (!deliveryId || !vehicleId) {
      return res.status(400).json({
        success: false,
        message: "Delivery and Vehicle are required",
      });
    }

    // Delivery

    const delivery = await Delivery.findById(deliveryId);

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found",
      });
    }

    // Prevent duplicate route

    const existingRoute = await Route.findOne({
      delivery: delivery._id,
    });

    if (existingRoute) {
      return res.status(400).json({
        success: false,
        message: "Route already exists for this delivery",
      });
    }

    // Vehicle

    const vehicle = await Vehicle.findById(vehicleId)
      .populate("driver");

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    if (vehicle.status !== "Available") {
      return res.status(400).json({
        success: false,
        message: "Vehicle is not available",
      });
    }

    if (!vehicle.driver) {
      return res.status(400).json({
        success: false,
        message: "Vehicle has no assigned driver",
      });
    }

    // Geocode

    const pickup = await geocodeAddress(
      delivery.pickupAddress
    );

    const destination = await geocodeAddress(
      delivery.deliveryAddress
    );

    if (!pickup || !destination) {
      return res.status(400).json({
        success: false,
        message: "Unable to calculate route",
      });
    }

    const optimizedRoute =
      await getOptimizedRoute(
        pickup,
        destination
      );

    if (!optimizedRoute) {
      return res.status(400).json({
        success: false,
        message: "Unable to optimize route",
      });
    }

    // Create Route

    const route = await Route.create({
      delivery: delivery._id,

      vehicle: vehicle._id,

      driver: vehicle.driver._id,

      pickupAddress: delivery.pickupAddress,

      deliveryAddress:
        delivery.deliveryAddress,

      pickupCoordinates: pickup,

      deliveryCoordinates: destination,

      distance: optimizedRoute.distance,

      duration: optimizedRoute.duration,

      routeGeometry:
        optimizedRoute.geometry,
    });

    // Update Vehicle

    vehicle.status = "On Trip";
    vehicle.currentRoute = route._id;

    await vehicle.save();

    // Update Delivery

    delivery.route = route._id;
    delivery.driver = vehicle.driver._id;
    delivery.vehicle = vehicle._id;
    delivery.status = "Assigned";

    await delivery.save();

    await route.populate(
      "delivery",
      "orderId customerName status"
    );

    await route.populate(
      "vehicle",
      "vehicleNumber vehicleType status"
    );

    await route.populate(
      "driver",
      "name email phone"
    );

    res.status(201).json({
      success: true,
      message: "Route created successfully",
      data: route,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
/* ============================================================
   Get All Routes
============================================================ */

export const getAllRoutes = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      search,
    } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    let routes = await Route.find(query)
      .populate(
        "delivery",
        "orderId customerName customerPhone status"
      )
      .populate(
        "vehicle",
        "vehicleNumber vehicleType status"
      )
      .populate(
        "driver",
        "name email phone"
      )
      .sort({ createdAt: -1 });

    if (search) {
      const keyword = search.toLowerCase();

      routes = routes.filter((route) => {
        return (
          route.delivery?.customerName
            ?.toLowerCase()
            .includes(keyword) ||
          route.delivery?.orderId
            ?.toLowerCase()
            .includes(keyword) ||
          route.driver?.name
            ?.toLowerCase()
            .includes(keyword) ||
          route.vehicle?.vehicleNumber
            ?.toLowerCase()
            .includes(keyword)
        );
      });
    }

    const total = routes.length;

    const paginatedRoutes = routes.slice(
      (page - 1) * Number(limit),
      page * Number(limit)
    );

    res.status(200).json({
      success: true,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: paginatedRoutes,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ============================================================
   Get Route By Id
============================================================ */

export const getRouteById = async (req, res) => {
  try {

    const route = await Route.findById(req.params.id)
      .populate("delivery")
      .populate("vehicle")
      .populate("driver","name email phone");

    if (!route) {
      return res.status(404).json({
        success:false,
        message:"Route not found",
      });
    }

    res.status(200).json({
      success:true,
      data:route,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Server Error",
    });

  }
};

/* ============================================================
   Update Route
============================================================ */

export const updateRoute = async (req,res)=>{
  try{

    const route = await Route.findById(req.params.id);

    if(!route){
      return res.status(404).json({
        success:false,
        message:"Route not found",
      });
    }

    if(route.status==="Started"){
      return res.status(400).json({
        success:false,
        message:"Cannot edit a started route.",
      });
    }

    Object.assign(route,req.body);

    await route.save();

    await route.populate("delivery");
    await route.populate("vehicle");
    await route.populate("driver","name email phone");

    res.status(200).json({
      success:true,
      message:"Route updated successfully",
      data:route,
    });

  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Server Error",
    });

  }
};

/* ============================================================
   Update Route Status
============================================================ */

export const updateRouteStatus = async (req,res)=>{
  try{

    const {status}=req.body;

    const allowed=[
      "Planned",
      "Started",
      "Completed",
    ];

    if(!allowed.includes(status)){
      return res.status(400).json({
        success:false,
        message:"Invalid route status",
      });
    }

    const route=await Route.findById(req.params.id);

    if(!route){
      return res.status(404).json({
        success:false,
        message:"Route not found",
      });
    }

    route.status=status;

    await route.save();

    const vehicle=await Vehicle.findById(route.vehicle);

    const delivery=await Delivery.findById(route.delivery);

    if(status==="Started"){

      if(vehicle){
        vehicle.status="On Trip";
        await vehicle.save();
      }

      if(delivery){
        delivery.status="In Transit";
        await delivery.save();
      }

    }

    if(status==="Completed"){

      if(vehicle){
        vehicle.status="Available";
        vehicle.currentRoute=null;
        await vehicle.save();
      }

      if(delivery){
        delivery.status="Delivered";
        await delivery.save();
      }

    }

    await route.populate("delivery");
    await route.populate("vehicle");
    await route.populate("driver","name email phone");

    res.status(200).json({
      success:true,
      message:"Route status updated successfully",
      data:route,
    });

  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Server Error",
    });

  }
};
/* ============================================================
   Delete Route
============================================================ */

export const deleteRoute = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);

    if (!route) {
      return res.status(404).json({
        success: false,
        message: "Route not found",
      });
    }

    if (route.status === "Started") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete an active route",
      });
    }

    const vehicle = await Vehicle.findById(route.vehicle);

    if (vehicle) {
      vehicle.status = "Available";
      vehicle.currentRoute = null;
      await vehicle.save();
    }

    const delivery = await Delivery.findById(route.delivery);

    if (delivery) {
      delivery.route = null;
      delivery.vehicle = null;
      delivery.driver = null;
      delivery.status = "Pending";
      await delivery.save();
    }

    await route.deleteOne();

    res.status(200).json({
      success: true,
      message: "Route deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ============================================================
   Route Statistics
============================================================ */

export const getRouteStats = async (req, res) => {
  try {

    const totalRoutes = await Route.countDocuments();

    const planned = await Route.countDocuments({
      status: "Planned",
    });

    const started = await Route.countDocuments({
      status: "Started",
    });

    const completed = await Route.countDocuments({
      status: "Completed",
    });

    const routes = await Route.find();

    const totalDistance = routes.reduce(
      (sum, route) => sum + (route.distance || 0),
      0
    );

    const averageDuration =
      routes.length > 0
        ? routes.reduce(
            (sum, route) =>
              sum + (route.duration || 0),
            0
          ) / routes.length
        : 0;

    res.status(200).json({
      success: true,
      data: {
        totalRoutes,
        planned,
        started,
        completed,
        totalDistance: Number(
          totalDistance.toFixed(2)
        ),
        averageDuration: Number(
          averageDuration.toFixed(2)
        ),
      },
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

/* ============================================================
   Driver Routes
============================================================ */

export const getMyRoutes = async (req, res) => {
  try {

    const routes = await Route.find({
      driver: req.user._id,
    })
      .populate(
        "delivery",
        "orderId customerName customerPhone pickupAddress deliveryAddress status"
      )
      .populate(
        "vehicle",
        "vehicleNumber vehicleType status"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: routes.length,
      data: routes,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};
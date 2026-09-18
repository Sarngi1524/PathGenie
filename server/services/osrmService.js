import axios from "axios";

export const getOptimizedRoute = async (start, end) => {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}`;

    const response = await axios.get(url, {
      params: {
        overview: "full",
        geometries: "geojson",
      },
    });

    if (!response.data.routes.length) {
      return null;
    }

    const route = response.data.routes[0];

    return {
      distance: route.distance,     // meters
      duration: route.duration,     // seconds
      geometry: route.geometry,
    };

  } catch (error) {
    console.error(error);
    return null;
  }
};
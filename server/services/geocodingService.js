import axios from "axios";

export const geocodeAddress = async (address) => {
  try {
    const url = `https://nominatim.openstreetmap.org/search`;

    const response = await axios.get(url, {
      params: {
        q: address,
        format: "json",
        limit: 1,
      },
      headers: {
        "User-Agent": "PathGenie/1.0",
      },
    });

    if (!response.data.length) {
      return null;
    }

    return {
      lat: Number(response.data[0].lat),
      lng: Number(response.data[0].lon),
    };

  } catch (error) {
    console.error(error);
    return null;
  }
};
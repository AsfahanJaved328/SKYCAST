import { geoClient, getWeatherApiKey, weatherApiClient } from "../config/weatherProviders.js";
import { normalizeError } from "../utils/helpers.js";

export const geocodeCity = async (city, country) => {
  try {
    const query = country ? `${city},${country}` : city;

    const response = await weatherApiClient.get("/search.json", {
      params: {
        key: getWeatherApiKey(),
        q: query,
      },
    });

    return response.data.map((item) => ({
      name: item.name,
      state: item.region || null,
      country: item.country,
      lat: item.lat,
      lon: item.lon,
    }));
  } catch (error) {
    const wrapped = new Error(normalizeError(error, "Unable to resolve city."));
    wrapped.statusCode = error.response?.status || 502;
    wrapped.code = "GEOCODE_FAILED";
    wrapped.publicMessage = "City lookup failed.";
    throw wrapped;
  }
};

export const reverseGeocode = async (lat, lon) => {
  try {
    const response = await geoClient.get("/reverse", {
      params: {
        lat,
        lon,
        format: "jsonv2",
      },
    });

    const address = response.data?.address || {};

    return {
      name: address.city || address.town || address.village || address.county || "Unknown",
      state: address.state || null,
      country: address.country || null,
      lat: Number(lat),
      lon: Number(lon),
    };
  } catch (error) {
    const wrapped = new Error(normalizeError(error, "Unable to reverse geocode coordinates."));
    wrapped.statusCode = error.response?.status || 502;
    wrapped.code = "REVERSE_GEOCODE_FAILED";
    wrapped.publicMessage = "Location lookup failed.";
    throw wrapped;
  }
};

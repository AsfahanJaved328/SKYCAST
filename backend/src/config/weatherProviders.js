import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const weatherApiClient = axios.create({
  baseURL: "https://api.weatherapi.com/v1",
  timeout: 12000,
});

const geoClient = axios.create({
  baseURL: "https://nominatim.openstreetmap.org",
  timeout: 12000,
  headers: {
    "User-Agent": "modern-weather-system/1.0 (educational project)",
  },
});

export const getWeatherApiKey = () => process.env.WEATHER_API_KEY;

export { geoClient, weatherApiClient };

import { cacheKeys, cacheTtls } from "../config/cache.js";
import { getWeatherApiKey, weatherApiClient } from "../config/weatherProviders.js";
import { getCached, setCached } from "./cacheService.js";
import { geocodeCity, reverseGeocode } from "./geocodeService.js";
import {
  formatAirQuality,
  formatAstronomy,
  formatCurrentWeather,
  formatForecast,
  formatSearchResults,
} from "../utils/formatters.js";
import { normalizeError } from "../utils/helpers.js";

const ensureApiKey = () => {
  if (!getWeatherApiKey()) {
    const error = new Error("WEATHER_API_KEY is missing.");
    error.statusCode = 500;
    error.code = "CONFIG_ERROR";
    error.publicMessage = "Server weather provider is not configured.";
    throw error;
  }
};

const fetchForecastBundle = async ({ q, days = 5 }) => {
  ensureApiKey();

  try {
    const response = await weatherApiClient.get("/forecast.json", {
      params: {
        key: getWeatherApiKey(),
        q,
        days,
        aqi: "yes",
        alerts: "yes",
      },
    });

    return response.data;
  } catch (error) {
    const wrapped = new Error(normalizeError(error, "Weather provider request failed."));
    wrapped.statusCode = error.response?.status || 502;
    wrapped.code = "WEATHER_PROVIDER_ERROR";
    wrapped.publicMessage = "Weather provider is temporarily unavailable.";
    throw wrapped;
  }
};

const findPrimaryLocation = async ({ city, country, lat, lon }) => {
  if (lat && lon) {
    return reverseGeocode(lat, lon);
  }

  const results = await geocodeCity(city, country);

  if (!results.length) {
    const error = new Error("City not found.");
    error.statusCode = 404;
    error.code = "CITY_NOT_FOUND";
    error.publicMessage = "No matching city was found.";
    throw error;
  }

  return results[0];
};

const buildQuery = ({ city, country, lat, lon }) => {
  if (lat && lon) return `${lat},${lon}`;
  return country ? `${city},${country}` : city;
};

export const getCurrentWeather = async ({ city, country, lat, lon }) => {
  const key = cacheKeys.current(`${city || ""}:${country || ""}:${lat || ""}:${lon || ""}`);
  const cached = getCached(key);
  if (cached) return cached;

  const query = buildQuery({ city, country, lat, lon });
  const weatherData = await fetchForecastBundle({ q: query, days: 1 });

  return setCached(
    key,
    formatCurrentWeather(weatherData),
    cacheTtls.current,
  );
};

export const getForecast = async ({ city, country, days = 5 }) => {
  const key = cacheKeys.forecast(`${city}:${country || ""}:${days}`);
  const cached = getCached(key);
  if (cached) return cached;

  const query = buildQuery({ city, country });
  const weatherData = await fetchForecastBundle({ q: query, days: Number(days) });
  const formatted = formatForecast(weatherData);

  return setCached(key, formatted, cacheTtls.forecast);
};

export const searchCities = async (query) => {
  const key = cacheKeys.search(query.toLowerCase());
  const cached = getCached(key);
  if (cached) return cached;

  const results = await geocodeCity(query);
  return setCached(key, formatSearchResults(results), cacheTtls.search);
};

export const getWeatherByCoordinates = async ({ lat, lon }) =>
  getCurrentWeather({ lat, lon });

export const getAirQuality = async ({ city, country }) => {
  const key = cacheKeys.airQuality(`${city}:${country || ""}`);
  const cached = getCached(key);
  if (cached) return cached;

  const query = buildQuery({ city, country });
  const weatherData = await fetchForecastBundle({ q: query, days: 1 });
  const response = formatAirQuality(weatherData);

  return setCached(key, response, cacheTtls.airQuality);
};

export const getAstronomy = async ({ city, country }) => {
  const key = cacheKeys.astronomy(`${city}:${country || ""}`);
  const cached = getCached(key);
  if (cached) return cached;

  const query = buildQuery({ city, country });
  const weatherData = await fetchForecastBundle({ q: query, days: 1 });
  const response = formatAstronomy(weatherData);

  return setCached(key, response, cacheTtls.astronomy);
};

export const getAlerts = async ({ city, country }) => {
  const current = await getCurrentWeather({ city, country });

  return {
    location: current.location,
    alerts: current.alerts,
    summary: {
      condition: current.summary.condition,
      temperature: current.summary.temperature.current,
    },
  };
};

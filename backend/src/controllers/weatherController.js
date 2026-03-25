import {
  getAirQuality,
  getAlerts,
  getAstronomy,
  getCurrentWeather,
  getForecast,
  getWeatherByCoordinates,
  searchCities,
} from "../services/weatherService.js";

const handleSuccess = (res, data) =>
  res.status(200).json({
    success: true,
    data,
  });

export const currentWeather = async (req, res, next) => {
  try {
    const data = await getCurrentWeather(req.query);
    return handleSuccess(res, data);
  } catch (error) {
    return next(error);
  }
};

export const forecastWeather = async (req, res, next) => {
  try {
    const data = await getForecast(req.query);
    return handleSuccess(res, data);
  } catch (error) {
    return next(error);
  }
};

export const citySearch = async (req, res, next) => {
  try {
    const data = await searchCities(req.query.q);
    return handleSuccess(res, data);
  } catch (error) {
    return next(error);
  }
};

export const weatherByCoordinates = async (req, res, next) => {
  try {
    const data = await getWeatherByCoordinates(req.query);
    return handleSuccess(res, data);
  } catch (error) {
    return next(error);
  }
};

export const airQuality = async (req, res, next) => {
  try {
    const data = await getAirQuality(req.query);
    return handleSuccess(res, data);
  } catch (error) {
    return next(error);
  }
};

export const astronomy = async (req, res, next) => {
  try {
    const data = await getAstronomy(req.query);
    return handleSuccess(res, data);
  } catch (error) {
    return next(error);
  }
};

export const alerts = async (req, res, next) => {
  try {
    const data = await getAlerts(req.query);
    return handleSuccess(res, data);
  } catch (error) {
    return next(error);
  }
};
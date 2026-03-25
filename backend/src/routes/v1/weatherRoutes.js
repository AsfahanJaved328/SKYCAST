import { Router } from "express";
import {
  airQuality,
  alerts,
  astronomy,
  citySearch,
  currentWeather,
  forecastWeather,
  weatherByCoordinates,
} from "../../controllers/weatherController.js";
import { handleValidation } from "../../middleware/validator.js";
import { searchLimiter } from "../../middleware/rateLimiter.js";
import {
  coordinatesValidator,
  currentWeatherValidator,
  forecastValidator,
  searchValidator,
} from "../../utils/validators.js";

const router = Router();

router.get("/current", currentWeatherValidator, handleValidation, currentWeather);
router.get("/forecast", forecastValidator, handleValidation, forecastWeather);
router.get("/search", searchLimiter, searchValidator, handleValidation, citySearch);
router.get("/coordinates", coordinatesValidator, handleValidation, weatherByCoordinates);
router.get("/air-quality", currentWeatherValidator, handleValidation, airQuality);
router.get("/astronomy", currentWeatherValidator, handleValidation, astronomy);
router.get("/alerts", currentWeatherValidator, handleValidation, alerts);

export default router;
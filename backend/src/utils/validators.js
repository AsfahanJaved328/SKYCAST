import { query } from "express-validator";

const cityValidator = query("city")
  .trim()
  .isLength({ min: 2, max: 80 })
  .withMessage("City must be between 2 and 80 characters.");

const countryValidator = query("country")
  .optional()
  .trim()
  .isLength({ min: 2, max: 60 })
  .withMessage("Country must be between 2 and 60 characters.");

export const currentWeatherValidator = [
  cityValidator,
  countryValidator,
];

export const forecastValidator = [
  cityValidator,
  countryValidator,
  query("days")
    .optional()
    .isInt({ min: 1, max: 7 })
    .withMessage("Days must be between 1 and 7."),
];

export const searchValidator = [
  query("q")
    .trim()
    .isLength({ min: 2, max: 80 })
    .withMessage("Search query must be at least 2 characters."),
];

export const coordinatesValidator = [
  query("lat").isFloat({ min: -90, max: 90 }).withMessage("Latitude is invalid."),
  query("lon").isFloat({ min: -180, max: 180 }).withMessage("Longitude is invalid."),
];

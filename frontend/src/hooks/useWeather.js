import { useQuery } from "@tanstack/react-query";
import { weatherService } from "../services/weatherService";

export const useCurrentWeather = (city) =>
  useQuery({
    queryKey: ["current-weather", city],
    queryFn: () => weatherService.getCurrentByCity(city),
    enabled: Boolean(city),
  });

export const useCurrentWeatherByCoordinates = (lat, lon) =>
  useQuery({
    queryKey: ["current-weather-coordinates", lat, lon],
    queryFn: () => weatherService.getByCoordinates(lat, lon),
    enabled: Number.isFinite(lat) && Number.isFinite(lon),
  });

export const useForecast = (city, days = 5) =>
  useQuery({
    queryKey: ["forecast-weather", city, days],
    queryFn: () => weatherService.getForecastByCity(city, days),
    enabled: Boolean(city),
  });

export const useAirQuality = (city) =>
  useQuery({
    queryKey: ["air-quality", city],
    queryFn: () => weatherService.getAirQuality(city),
    enabled: Boolean(city),
  });

export const useAstronomy = (city) =>
  useQuery({
    queryKey: ["astronomy", city],
    queryFn: () => weatherService.getAstronomy(city),
    enabled: Boolean(city),
  });

export const useAlerts = (city) =>
  useQuery({
    queryKey: ["alerts", city],
    queryFn: () => weatherService.getAlerts(city),
    enabled: Boolean(city),
  });
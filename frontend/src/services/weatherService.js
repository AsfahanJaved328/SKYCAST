import api from "./api";

export const weatherService = {
  getCurrentByCity: async (city) => {
    const { data } = await api.get("/weather/current", { params: { city } });
    return data.data;
  },
  getForecastByCity: async (city, days = 5) => {
    const { data } = await api.get("/weather/forecast", { params: { city, days } });
    return data.data;
  },
  getByCoordinates: async (lat, lon) => {
    const { data } = await api.get("/weather/coordinates", { params: { lat, lon } });
    return data.data;
  },
  searchCities: async (query, signal) => {
    const { data } = await api.get("/weather/search", {
      params: { q: query },
      signal,
    });
    return data.data;
  },
  getAirQuality: async (city) => {
    const { data } = await api.get("/weather/air-quality", { params: { city } });
    return data.data;
  },
  getAstronomy: async (city) => {
    const { data } = await api.get("/weather/astronomy", { params: { city } });
    return data.data;
  },
  getAlerts: async (city) => {
    const { data } = await api.get("/weather/alerts", { params: { city } });
    return data.data;
  },
};
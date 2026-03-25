import { create } from "zustand";

const favoriteSeed = JSON.parse(localStorage.getItem("weather-favorites") || "[]");

export const useWeatherStore = create((set) => ({
  favorites: favoriteSeed,
  activeCity: "Islamabad",
  setActiveCity: (city) => set({ activeCity: city }),
  addFavorite: (favorite) =>
    set((state) => {
      const exists = state.favorites.some((item) => item.label === favorite.label);
      if (exists) return state;

      const favorites = [...state.favorites, favorite];
      localStorage.setItem("weather-favorites", JSON.stringify(favorites));
      return { favorites };
    }),
  removeFavorite: (label) =>
    set((state) => {
      const favorites = state.favorites.filter((item) => item.label !== label);
      localStorage.setItem("weather-favorites", JSON.stringify(favorites));
      return { favorites };
    }),
}));

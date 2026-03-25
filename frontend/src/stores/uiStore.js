import { create } from "zustand";

const initialTheme = localStorage.getItem("weather-theme") || "dark";
const initialUnits = localStorage.getItem("weather-units") || "metric";
const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Karachi";
const initialTimeZone = localStorage.getItem("weather-timezone") || browserTimeZone;

export const useUiStore = create((set) => ({
  theme: initialTheme,
  units: initialUnits,
  timeZone: initialTimeZone,
  searchHistory: JSON.parse(localStorage.getItem("weather-history") || "[]"),
  setTheme: (theme) => {
    localStorage.setItem("weather-theme", theme);
    set({ theme });
  },
  toggleTheme: () =>
    set((state) => {
      const nextTheme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("weather-theme", nextTheme);
      return { theme: nextTheme };
    }),
  toggleUnits: () =>
    set((state) => {
      const nextUnits = state.units === "metric" ? "imperial" : "metric";
      localStorage.setItem("weather-units", nextUnits);
      return { units: nextUnits };
    }),
  setTimeZone: (timeZone) => {
    localStorage.setItem("weather-timezone", timeZone);
    set({ timeZone });
  },
  addSearchHistory: (item) =>
    set((state) => {
      const history = [item, ...state.searchHistory.filter((entry) => entry !== item)].slice(0, 8);
      localStorage.setItem("weather-history", JSON.stringify(history));
      return { searchHistory: history };
    }),
}));

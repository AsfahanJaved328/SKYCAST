import NodeCache from "node-cache";

export const cacheKeys = {
  current: (query) => `current:${query}`,
  forecast: (query) => `forecast:${query}`,
  airQuality: (query) => `air-quality:${query}`,
  astronomy: (query) => `astronomy:${query}`,
  search: (query) => `search:${query}`,
};

export const cacheTtls = {
  current: 60 * 5,
  forecast: 60 * 30,
  airQuality: 60 * 15,
  astronomy: 60 * 60,
  search: 60 * 60 * 24,
};

const cache = new NodeCache({
  stdTTL: 0,
  checkperiod: 120,
  useClones: false,
});

export default cache;

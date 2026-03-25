import cache from "../config/cache.js";

export const getCached = (key) => cache.get(key);

export const setCached = (key, value, ttl) => {
  cache.set(key, value, ttl);
  return value;
};

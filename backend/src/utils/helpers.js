export const isFiniteNumber = (value) => Number.isFinite(Number(value));

export const buildLocationLabel = ({ city, country, state }) =>
  [city, state, country].filter(Boolean).join(", ");

export const getWindDirection = (degrees = 0) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const normalized = ((degrees % 360) + 360) % 360;
  const index = Math.round(normalized / 45) % 8;
  return directions[index];
};

export const thermalDescription = (celsius) => {
  if (celsius >= 36) return "Extremely hot";
  if (celsius >= 30) return "Hot";
  if (celsius >= 23) return "Warm";
  if (celsius >= 16) return "Pleasant";
  if (celsius >= 9) return "Cool";
  if (celsius >= 1) return "Cold";
  return "Very cold";
};

export const uvRecommendation = (uvIndex = 0) => {
  if (uvIndex >= 11) return "Extreme UV. Avoid direct sun and use full protection.";
  if (uvIndex >= 8) return "Very high UV. Wear SPF, hat, and sunglasses.";
  if (uvIndex >= 6) return "High UV. Limit prolonged midday exposure.";
  if (uvIndex >= 3) return "Moderate UV. Sun protection is recommended.";
  return "Low UV. Minimal protection needed.";
};

export const airQualityLabel = (aqi = 1) => {
  const labels = {
    1: "Good",
    2: "Fair",
    3: "Moderate",
    4: "Poor",
    5: "Very Poor",
  };

  return labels[aqi] || "Unknown";
};

export const airQualityAdvice = (aqi = 1) => {
  if (aqi >= 5) return "Avoid outdoor exertion and stay indoors if possible.";
  if (aqi === 4) return "Sensitive groups should reduce outdoor activity.";
  if (aqi === 3) return "Consider shorter outdoor activity if sensitive to pollution.";
  if (aqi === 2) return "Air quality is acceptable for most people.";
  return "Enjoy outdoor activities.";
};

export const toLocalTime = (unixSeconds, timezoneOffsetSeconds = 0) => {
  if (!unixSeconds) return null;
  return new Date((unixSeconds + timezoneOffsetSeconds) * 1000)
    .toISOString()
    .replace("T", " ")
    .slice(0, 16);
};

export const normalizeError = (error, fallbackMessage) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  return error.message || fallbackMessage;
};

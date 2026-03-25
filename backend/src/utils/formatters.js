import {
  buildLocationLabel,
  thermalDescription,
} from "./helpers.js";

const weatherApiAqiLabel = (aqi) => {
  const numeric = Number(aqi);

  if (numeric <= 1) return "Good";
  if (numeric === 2) return "Moderate";
  if (numeric === 3) return "Unhealthy for sensitive groups";
  if (numeric === 4) return "Unhealthy";
  if (numeric === 5) return "Very unhealthy";
  if (numeric >= 6) return "Hazardous";
  return "Unavailable";
};

const weatherApiAqiAdvice = (aqi) => {
  const numeric = Number(aqi);

  if (numeric <= 1) return "Air quality is good for normal outdoor activity.";
  if (numeric === 2) return "Air quality is acceptable for most people.";
  if (numeric === 3) return "Sensitive groups should limit long outdoor exposure.";
  if (numeric === 4) return "Reduce prolonged outdoor activity.";
  if (numeric === 5) return "Avoid heavy outdoor exertion if possible.";
  if (numeric >= 6) return "Stay indoors where possible and avoid outdoor exertion.";
  return "Air quality data is unavailable.";
};

const normalizeWindSpeed = (kph = 0) => Number((kph / 3.6).toFixed(1));

const normalizeVisibility = (km = 0) => Number(Number(km).toFixed(1));

const normalizeLocation = (location) => ({
  city: location.name,
  country: location.country,
  state: location.region || location.state || null,
  coordinates: {
    lat: location.lat,
    lon: location.lon,
  },
  label: buildLocationLabel({
    city: location.name,
    state: location.region || location.state,
    country: location.country,
  }),
});

export const formatCurrentWeather = (bundle) => {
  const location = normalizeLocation(bundle.location);
  const current = bundle.current;
  const today = bundle.forecast?.forecastday?.[0];
  const airQuality = current.air_quality || {};
  const alerts = bundle.alerts?.alert || [];

  return {
    location,
    summary: {
      condition: current.condition?.text || "Unknown",
      description: current.condition?.text || "No description available",
      icon: current.condition?.icon || null,
      temperature: {
        current: Math.round(current.temp_c),
        feelsLike: Math.round(current.feelslike_c),
        min: today?.day?.mintemp_c ? Math.round(today.day.mintemp_c) : Math.round(current.temp_c),
        max: today?.day?.maxtemp_c ? Math.round(today.day.maxtemp_c) : Math.round(current.temp_c),
        thermalPerception: thermalDescription(current.feelslike_c),
      },
      humidity: current.humidity,
      pressure: current.pressure_mb,
      dewPoint: current.dewpoint_c ?? null,
      visibility: normalizeVisibility(current.vis_km),
      cloudCover: current.cloud ?? null,
      precipitationChance: Number(today?.day?.daily_chance_of_rain || today?.day?.daily_chance_of_snow || 0),
      wind: {
        speed: normalizeWindSpeed(current.wind_kph),
        gusts: current.gust_kph ? normalizeWindSpeed(current.gust_kph) : null,
        degrees: current.wind_degree,
        direction: current.wind_dir,
      },
    },
    astronomy: {
      sunrise: today?.astro?.sunrise || null,
      sunset: today?.astro?.sunset || null,
      moonrise: today?.astro?.moonrise || null,
      moonset: today?.astro?.moonset || null,
      moonPhase: today?.astro?.moon_phase || null,
    },
    airQuality: airQuality["us-epa-index"]
      ? {
          index: airQuality["us-epa-index"],
          level: weatherApiAqiLabel(airQuality["us-epa-index"]),
          recommendation: weatherApiAqiAdvice(airQuality["us-epa-index"]),
          pollutants: {
            co: airQuality.co,
            no2: airQuality.no2,
            o3: airQuality.o3,
            pm2_5: airQuality.pm2_5,
            pm10: airQuality.pm10,
            so2: airQuality.so2,
          },
        }
      : null,
    uv: {
      index: current.uv ?? null,
      recommendation: current.uv ? `UV index is ${current.uv}. Use sun protection if you will stay outdoors.` : "UV data unavailable.",
    },
    alerts: alerts.map((alert) => ({
      sender: alert.areas || "WeatherAPI",
      event: alert.headline || "Weather alert",
      start: alert.effective || null,
      end: alert.expires || null,
      description: alert.desc || alert.instruction || "No alert details available.",
      tags: alert.event ? [alert.event] : [],
    })),
  };
};

export const formatForecast = (bundle) => ({
  location: normalizeLocation(bundle.location),
  daily: (bundle.forecast?.forecastday || []).map((day) => ({
    date: day.date,
    sunrise: day.astro?.sunrise || null,
    sunset: day.astro?.sunset || null,
    moonrise: day.astro?.moonrise || null,
    moonset: day.astro?.moonset || null,
    moonPhase: day.astro?.moon_phase || null,
    summary: day.day?.condition?.text || "Unknown",
    description: day.day?.condition?.text || "",
    icon: day.day?.condition?.icon || null,
    temperature: {
      min: Math.round(day.day?.mintemp_c),
      max: Math.round(day.day?.maxtemp_c),
      morning: Math.round(day.hour?.[6]?.temp_c ?? day.day?.avgtemp_c),
      day: Math.round(day.hour?.[12]?.temp_c ?? day.day?.avgtemp_c),
      evening: Math.round(day.hour?.[18]?.temp_c ?? day.day?.avgtemp_c),
      night: Math.round(day.hour?.[21]?.temp_c ?? day.day?.avgtemp_c),
    },
    humidity: day.day?.avghumidity,
    precipitationProbability: Number(day.day?.daily_chance_of_rain || day.day?.daily_chance_of_snow || 0),
    rain: day.day?.totalprecip_mm || 0,
    wind: {
      speed: normalizeWindSpeed(day.day?.maxwind_kph),
      gusts: null,
      direction: day.hour?.[12]?.wind_dir || null,
      degrees: day.hour?.[12]?.wind_degree || null,
    },
    uvIndex: day.day?.uv ?? null,
  })),
  hourly: (bundle.forecast?.forecastday || [])
    .flatMap((day) => day.hour || [])
    .slice(0, 24)
    .map((hour) => ({
      time: hour.time,
      temp: Math.round(hour.temp_c),
      feelsLike: Math.round(hour.feelslike_c),
      humidity: hour.humidity,
      precipitationProbability: Number(hour.chance_of_rain || hour.chance_of_snow || 0),
      summary: hour.condition?.text || "Unknown",
      icon: hour.condition?.icon || null,
      windSpeed: normalizeWindSpeed(hour.wind_kph),
  })),
});

export const formatAirQuality = (bundle) => {
  const location = normalizeLocation(bundle.location);
  const airQuality = bundle.current?.air_quality || {};
  const aqi = airQuality["us-epa-index"] ?? null;

  return {
    location,
    airQuality: {
      index: aqi,
      level: weatherApiAqiLabel(aqi),
      recommendation: weatherApiAqiAdvice(aqi),
      pollutants: {
        co: airQuality.co,
        no2: airQuality.no2,
        o3: airQuality.o3,
        pm2_5: airQuality.pm2_5,
        pm10: airQuality.pm10,
        so2: airQuality.so2,
      },
    },
  };
};

export const formatAstronomy = (bundle) => {
  const location = normalizeLocation(bundle.location);
  const today = bundle.forecast?.forecastday?.[0];

  return {
    location,
    astronomy: {
      sunrise: today?.astro?.sunrise || null,
      sunset: today?.astro?.sunset || null,
      moonrise: today?.astro?.moonrise || null,
      moonset: today?.astro?.moonset || null,
      moonPhase: today?.astro?.moon_phase || null,
      solarNoonEstimate: null,
      uvIndex: bundle.current?.uv ?? null,
    },
  };
};

export const formatSearchResults = (items = []) =>
  items.map((item) => ({
    name: item.name,
    country: item.country,
    state: item.state || null,
    lat: item.lat,
    lon: item.lon,
    label: buildLocationLabel({
      city: item.name,
      state: item.state,
      country: item.country,
    }),
  }));

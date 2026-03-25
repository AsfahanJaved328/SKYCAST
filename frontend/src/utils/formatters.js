export const tempWithUnit = (value, units = "metric") =>
  `${Math.round(value)}°${units === "metric" ? "C" : "F"}`;

export const speedWithUnit = (value, units = "metric") =>
  `${Math.round(value)} ${units === "metric" ? "m/s" : "mph"}`;

export const compactDate = (value) =>
  value
    ? new Date(value).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })
    : "";

export const compactTime = (value) =>
  (() => {
    if (!value) return "--:--";

    if (typeof value === "string") {
      const trimmed = value.trim();

      if (/^\d{1,2}:\d{2}\s?(AM|PM)$/i.test(trimmed)) {
        return trimmed.toUpperCase();
      }

      if (/^\d{1,2}:\d{2}$/.test(trimmed)) {
        return trimmed;
      }

      const normalized = trimmed.includes("T") ? trimmed : trimmed.replace(" ", "T");
      const parsed = new Date(normalized);

      if (!Number.isNaN(parsed.getTime())) {
        return parsed.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      }
    }

    const fallback = new Date(value);
    return Number.isNaN(fallback.getTime())
      ? "--:--"
      : fallback.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  })();

export const weatherGradient = (condition = "") => {
  const map = {
    Clear: "from-sky-500/80 to-indigo-700/80",
    Clouds: "from-slate-400/80 to-slate-700/80",
    Rain: "from-cyan-600/80 to-blue-900/80",
    Thunderstorm: "from-violet-700/80 to-slate-950/80",
    Snow: "from-slate-100/80 to-sky-300/80",
  };

  return map[condition] || "from-sky-600/80 to-indigo-900/80";
};

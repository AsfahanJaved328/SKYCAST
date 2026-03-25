import { motion } from "framer-motion";
import { MapPin, Wind, Droplets, ThermometerSun, Heart, Gauge } from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import { tempWithUnit, speedWithUnit } from "../../utils/formatters";
import { useUiStore } from "../../stores/uiStore";

const WeatherHero = ({ weather, onFavorite }) => {
  const units = useUiStore((state) => state.units);

  return (
    <section className="relative min-h-[78vh] overflow-hidden">
      <div className="grid min-h-[78vh] items-end gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative z-10 pb-12 lg:pb-24">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <p className="text-lg font-light tracking-[0.14em] text-[var(--accentColor)]">Live weather</p>
            <span className="rounded-full border border-[var(--accentColor)]/25 bg-[var(--accentColor)]/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[var(--accentColor)]">
              Updated live
            </span>
          </div>
          <motion.h1
            key={weather.summary.temperature.current}
            initial={{ opacity: 0.3, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-type text-[clamp(3rem,8vw,7rem)] font-semibold uppercase leading-[0.9] tracking-[-0.06em] text-white"
          >
            {weather.location.city}
            <br />
            <span className="text-white/88">{weather.summary.condition}</span>
          </motion.h1>
          <p className="mt-5 max-w-md text-lg leading-8 text-white/68">
            {weather.summary.description}. Feels like {tempWithUnit(weather.summary.temperature.feelsLike, units)} with {weather.summary.humidity}% humidity and {speedWithUnit(weather.summary.wind.speed, units)} wind.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70">
              <span className="text-white">Perception:</span> {weather.summary.temperature.thermalPerception}
            </div>
            <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70">
              <span className="text-white">Visibility:</span> {weather.summary.visibility} km
            </div>
            <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70">
              <span className="text-white">Direction:</span> {weather.summary.wind.direction}
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" onClick={onFavorite}>
              <Heart size={14} className="mr-2" />
              Add favorite
            </Button>
            <div className="flex items-center gap-2 text-sm tracking-[0.08em] text-white/65">
              <MapPin size={14} />
              {weather.location.label}
            </div>
          </div>
        </div>

        <Card className="relative z-10 border-white/16 px-6 py-6 sm:px-8 sm:py-8 lg:self-center">
          <div className="mb-6 flex items-start justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <p className="card-title">Current reading</p>
              <p className="hero-type mt-2 text-6xl font-semibold tracking-[-0.06em] text-white">
                {tempWithUnit(weather.summary.temperature.current, units)}
              </p>
            </div>
            <div className="text-right">
              <p className="max-w-[120px] text-xs uppercase tracking-[0.2em] text-white/45">{weather.location.country}</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-white/35">Condition now</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <p className="card-title">Humidity</p>
              <div className="mt-3 flex items-center gap-3 text-2xl font-semibold text-white">
                <Droplets size={18} className="text-[var(--accentColor)]" />
                {weather.summary.humidity}%
              </div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <p className="card-title">Wind</p>
              <div className="mt-3 flex items-center gap-3 text-2xl font-semibold text-white">
                <Wind size={18} className="text-[var(--accentColor)]" />
                {speedWithUnit(weather.summary.wind.speed, units)}
              </div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <p className="card-title">Range</p>
              <div className="mt-3 flex items-center gap-3 text-xl font-semibold text-white">
                <ThermometerSun size={18} className="text-[var(--accentColor)]" />
                {tempWithUnit(weather.summary.temperature.min, units)} / {tempWithUnit(weather.summary.temperature.max, units)}
              </div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <p className="card-title">Pressure</p>
              <div className="mt-3 flex items-center gap-3 text-2xl font-semibold text-white">
                <Gauge size={18} className="text-[var(--accentColor)]" />
                {weather.summary.pressure}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default WeatherHero;

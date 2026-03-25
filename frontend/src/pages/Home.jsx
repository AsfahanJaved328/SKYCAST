import { startTransition, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import WeatherHero from "../components/weather/WeatherHero";
import HourlyForecast from "../components/weather/HourlyForecast";
import DailyForecast from "../components/weather/DailyForecast";
import AirQualityCard from "../components/weather/AirQualityCard";
import AstronomyCard from "../components/weather/AstronomyCard";
import WeatherAlert from "../components/weather/WeatherAlert";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useAirQuality, useAstronomy, useCurrentWeather, useCurrentWeatherByCoordinates, useForecast } from "../hooks/useWeather";
import useGeolocation from "../hooks/useGeolocation";
import { useWeatherStore } from "../stores/weatherStore";

const Home = () => {
  const activeCity = useWeatherStore((state) => state.activeCity);
  const addFavorite = useWeatherStore((state) => state.addFavorite);
  const navigate = useNavigate();
  const { location, error: geoError } = useGeolocation();

  const cityWeather = useCurrentWeather(activeCity);
  const coordinateWeather = useCurrentWeatherByCoordinates(location?.lat, location?.lon);

  const current = location ? coordinateWeather : cityWeather;
  const resolvedCity = useMemo(() => current.data?.location?.city || activeCity, [current.data, activeCity]);

  const forecast = useForecast(resolvedCity);
  const airQuality = useAirQuality(resolvedCity);
  const astronomy = useAstronomy(resolvedCity);

  if (current.isLoading || forecast.isLoading) {
    return <LoadingSpinner className="py-28" />;
  }

  if (current.error) {
    return <p className="py-20 text-center text-rose-400">{current.error.message}</p>;
  }

  const weather = current.data;

  return (
    <div className="space-y-10">
      {geoError && (
        <div className="rounded-[24px] border border-white/14 bg-white/[0.04] px-4 py-3 text-sm text-white/75">
          {geoError}
        </div>
      )}
      <WeatherHero
        weather={weather}
        onFavorite={() => {
          addFavorite(weather.location);
          toast.success("City added to favorites.");
        }}
      />
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <HourlyForecast hourly={forecast.data?.hourly} />
        </div>
        <div className="space-y-6">
          <WeatherAlert alerts={weather.alerts} />
          <DailyForecast daily={forecast.data?.daily || []} />
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <AirQualityCard data={airQuality.data} />
        <AstronomyCard data={astronomy.data} />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-full border border-white/16 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-black"
          onClick={() => startTransition(() => navigate(`/forecast/${encodeURIComponent(resolvedCity)}`))}
        >
          Open detailed forecast
        </button>
      </div>
    </div>
  );
};

export default Home;

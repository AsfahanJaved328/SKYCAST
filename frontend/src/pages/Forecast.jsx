import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import DailyForecast from "../components/weather/DailyForecast";
import HourlyForecast from "../components/weather/HourlyForecast";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { useCurrentWeather, useForecast } from "../hooks/useWeather";
import { tempWithUnit } from "../utils/formatters";
import { useUiStore } from "../stores/uiStore";
import { useWeatherStore } from "../stores/weatherStore";

const Forecast = () => {
  const { city } = useParams();
  const decodedCity = decodeURIComponent(city || "Islamabad");
  const { data, isLoading, error } = useForecast(decodedCity, 5);
  const current = useCurrentWeather(decodedCity);
  const units = useUiStore((state) => state.units);
  const setActiveCity = useWeatherStore((state) => state.setActiveCity);
  const addFavorite = useWeatherStore((state) => state.addFavorite);

  useEffect(() => {
    setActiveCity(decodedCity);
  }, [decodedCity, setActiveCity]);

  const chartData = useMemo(
    () =>
      (data?.daily || []).map((day) => ({
        date: day.date.slice(5),
        max: day.temperature.max,
        min: day.temperature.min,
      })),
    [data],
  );

  if (isLoading) return <LoadingSpinner className="py-24" label="Loading forecast" />;
  if (error) return <p className="py-20 text-center text-rose-400">{error.message}</p>;

  return (
    <div className="space-y-10">
      <Card className="border-white/14 bg-black/55">
        <p className="card-title">Forecast details</p>
        <div className="mt-3 flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="hero-type text-4xl font-semibold tracking-[-0.06em] text-white">{data.location.label}</h1>
            <p className="mt-2 text-sm text-white/60">Temperature trend and forecast breakdown for the next five days.</p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">{units === "metric" ? "Celsius" : "Fahrenheit"}</p>
            <Button
              variant="secondary"
              onClick={() => {
                addFavorite(data.location);
                toast.success("City added to favorites.");
              }}
            >
              <Heart size={14} className="mr-2" />
              Save city
            </Button>
          </div>
        </div>

        {current.data && (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
              <p className="card-title">Current temp</p>
              <p className="mt-2 hero-type text-4xl font-semibold tracking-[-0.05em] text-white">{tempWithUnit(current.data.summary.temperature.current, units)}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
              <p className="card-title">Feels like</p>
              <p className="mt-2 hero-type text-4xl font-semibold tracking-[-0.05em] text-white">{tempWithUnit(current.data.summary.temperature.feelsLike, units)}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
              <p className="card-title">Condition</p>
              <p className="mt-2 hero-type text-3xl font-semibold tracking-[-0.05em] text-white">{current.data.summary.condition}</p>
            </div>
          </div>
        )}

        <div className="mt-8 h-80 rounded-[28px] border border-white/10 bg-white/[0.03] p-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffffff" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#ffffff" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.18} stroke="#FFFFFF" />
              <XAxis dataKey="date" stroke="#FFFFFF" opacity={0.6} />
              <YAxis stroke="#FFFFFF" opacity={0.6} />
              <Tooltip formatter={(value) => tempWithUnit(value, units)} />
              <Area type="monotone" dataKey="max" stroke="#FFFFFF" fill="url(#tempFill)" strokeWidth={2.2} />
              <Area type="monotone" dataKey="min" stroke="#9CA3AF" fillOpacity={0} strokeWidth={1.8} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <HourlyForecast hourly={data.hourly} />
      <DailyForecast daily={data.daily} />
    </div>
  );
};

export default Forecast;

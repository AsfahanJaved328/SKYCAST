import { Link } from "react-router-dom";
import Card from "../components/common/Card";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useAlerts } from "../hooks/useWeather";
import { useWeatherStore } from "../stores/weatherStore";

const Alerts = () => {
  const activeCity = useWeatherStore((state) => state.activeCity);
  const setActiveCity = useWeatherStore((state) => state.setActiveCity);
  const favorites = useWeatherStore((state) => state.favorites);
  const { data, isLoading, error } = useAlerts(activeCity);

  return (
    <div className="space-y-10">
      <div>
        <p className="card-title">Alerts center</p>
        <h1 className="hero-type mt-2 text-5xl font-semibold tracking-[-0.06em] text-white">Weather alerts dashboard</h1>
        <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/45">Active city: {activeCity}</p>
      </div>

      {isLoading ? (
        <LoadingSpinner className="py-20" label="Loading alerts" />
      ) : error ? (
        <Card className="border-white/14 bg-black/55">
          <p className="text-rose-400">{error.message}</p>
        </Card>
      ) : (
        <Card className="border-white/14 bg-black/55">
          <p className="card-title">Live alerts</p>
          {data?.alerts?.length ? (
            <div className="mt-4 space-y-4">
              {data.alerts.map((alert) => (
                <div key={`${alert.event}-${alert.start}`} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                  <p className="hero-type text-3xl font-semibold tracking-[-0.05em] text-white">{alert.event}</p>
                  <p className="mt-2 text-sm leading-6 text-white/62">{alert.description}</p>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-white/40">
                    {alert.start} to {alert.end}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-white/60">No active alerts for {activeCity} right now.</p>
          )}
        </Card>
      )}

      <Card className="border-white/14 bg-black/55">
        <p className="card-title">Quick switch</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {favorites.length === 0 ? (
            <p className="text-sm text-white/60">Save cities to favorites to switch alert views faster.</p>
          ) : (
            favorites.map((favorite) => (
              <Link
                key={favorite.label}
                to={`/forecast/${encodeURIComponent(favorite.name)}`}
                onClick={() => setActiveCity(favorite.name)}
                className="rounded-full border border-white/18 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/85"
              >
                {favorite.label}
              </Link>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default Alerts;

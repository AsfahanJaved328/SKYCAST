import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import Card from "../components/common/Card";
import { useWeatherStore } from "../stores/weatherStore";

const Favorites = () => {
  const favorites = useWeatherStore((state) => state.favorites);
  const removeFavorite = useWeatherStore((state) => state.removeFavorite);

  return (
    <div className="space-y-10">
      <div>
        <p className="card-title">Favorites</p>
        <h1 className="hero-type mt-2 text-5xl font-semibold tracking-[-0.06em] text-white">Saved cities</h1>
      </div>

      {favorites.length === 0 ? (
        <Card className="border-white/14 bg-black/55">
          <p className="text-white/62">No favorites yet. Add cities from the home or forecast pages.</p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {favorites.map((favorite) => (
            <Card key={favorite.label} className="border-white/14 bg-black/55">
              <p className="card-title">Favorite city</p>
              <h2 className="hero-type mt-3 text-3xl font-semibold tracking-[-0.05em] text-white">{favorite.label}</h2>
              <div className="mt-6 flex items-center justify-between">
                <Link
                  to={`/forecast/${encodeURIComponent(favorite.name)}`}
                  className="text-xs uppercase tracking-[0.2em] text-white/75"
                >
                  View forecast
                </Link>
                <button
                  type="button"
                  onClick={() => removeFavorite(favorite.label)}
                  className="rounded-full border border-white/20 p-2 text-white/80 transition hover:bg-white/10"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;

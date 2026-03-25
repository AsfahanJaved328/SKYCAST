import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/ui/SearchBar";
import Card from "../components/common/Card";
import { useUiStore } from "../stores/uiStore";

const Search = () => {
  const history = useUiStore((state) => state.searchHistory);
  const [popularCities] = useState(["Islamabad", "Lahore", "Karachi", "Dubai", "London", "Istanbul"]);

  return (
    <div className="space-y-10">
      <Card className="border-white/14 bg-black/55 p-8">
        <p className="card-title">Search weather</p>
        <h1 className="hero-type mt-2 text-5xl font-semibold tracking-[-0.06em] text-white">Find weather anywhere.</h1>
        <p className="mt-3 max-w-2xl text-sm text-white/60">Search by city and jump directly into the full forecast experience.</p>
        <div className="mt-6">
          <SearchBar placeholder="Type a city and choose a suggestion..." />
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-white/14 bg-black/55">
          <p className="card-title">Recent searches</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {history.length === 0 ? (
              <p className="text-sm text-white/60">Your recent searches will appear here.</p>
            ) : (
              history.map((item) => (
                <Link
                  key={item}
                  to={`/forecast/${encodeURIComponent(item)}`}
                  className="rounded-full border border-white/18 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/85"
                >
                  {item}
                </Link>
              ))
            )}
          </div>
        </Card>

        <Card className="border-white/14 bg-black/55">
          <p className="card-title">Popular destinations</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {popularCities.map((city) => (
              <Link
                key={city}
                to={`/forecast/${encodeURIComponent(city)}`}
                className="rounded-3xl border border-white/16 bg-white/5 px-4 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/88"
              >
                {city}
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Search;

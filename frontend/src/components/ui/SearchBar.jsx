import { useEffect, useMemo, useState } from "react";
import { Search, MapPin, History } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import { weatherService } from "../../services/weatherService";
import { useUiStore } from "../../stores/uiStore";
import { useWeatherStore } from "../../stores/weatherStore";

const SearchBar = ({ placeholder = "Search city or country..." }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const debounced = useDebounce(query, 350);
  const navigate = useNavigate();
  const addSearchHistory = useUiStore((state) => state.addSearchHistory);
  const searchHistory = useUiStore((state) => state.searchHistory);
  const setActiveCity = useWeatherStore((state) => state.setActiveCity);

  useEffect(() => {
    if (debounced.trim().length < 2) {
      setResults([]);
      return undefined;
    }

    const controller = new AbortController();

    weatherService
      .searchCities(debounced, controller.signal)
      .then((items) => {
        setResults(items.slice(0, 5));
        setIsOpen(true);
      })
      .catch(() => {});

    return () => controller.abort();
  }, [debounced]);

  const quickHistory = useMemo(
    () => searchHistory.slice(0, 5).map((item) => ({ label: item, name: item, history: true })),
    [searchHistory],
  );

  const visibleResults = query.trim().length >= 2 ? results : quickHistory;

  const handleSelect = (label, name) => {
    addSearchHistory(label);
    setActiveCity(name);
    setQuery("");
    setIsOpen(false);
    navigate(`/forecast/${encodeURIComponent(name)}`);
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-white backdrop-blur-xl">
        <Search size={16} className="text-white/45" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm outline-none placeholder:text-white/35"
        />
      </div>
      <AnimatePresence>
        {isOpen && visibleResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute z-20 mt-3 w-full overflow-hidden rounded-[28px] border border-white/15 bg-[#0f1013] p-2 text-white shadow-2xl"
          >
            {visibleResults.map((item) => (
              <button
                key={`${item.label}-${item.name}`}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelect(item.label, item.name)}
                className="flex w-full items-center gap-3 rounded-[22px] px-4 py-3 text-left transition hover:bg-white/6"
              >
                {item.history ? <History size={16} className="text-white/45" /> : <MapPin size={16} className="text-white/45" />}
                <span className="text-sm text-white/88">{item.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
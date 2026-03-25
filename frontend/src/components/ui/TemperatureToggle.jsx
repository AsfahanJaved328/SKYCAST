import { useUiStore } from "../../stores/uiStore";

const TemperatureToggle = () => {
  const units = useUiStore((state) => state.units);
  const toggleUnits = useUiStore((state) => state.toggleUnits);

  return (
    <button
      type="button"
      onClick={toggleUnits}
      className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-xl"
      aria-label="Toggle temperature units"
    >
      {units === "metric" ? "°C" : "°F"}
    </button>
  );
};

export default TemperatureToggle;
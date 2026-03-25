import Card from "../common/Card";
import { compactTime, tempWithUnit } from "../../utils/formatters";
import { useUiStore } from "../../stores/uiStore";

const HourlyForecast = ({ hourly = [] }) => {
  const units = useUiStore((state) => state.units);

  return (
    <Card className="border-white/14 bg-black/55">
      <div className="mb-6 flex items-end justify-between border-b border-white/10 pb-4">
        <div>
          <p className="card-title">Hourly outlook</p>
          <h2 className="hero-type mt-1 text-3xl font-semibold tracking-[-0.05em] text-white">Next 24 hours</h2>
        </div>
        <p className="text-xs uppercase tracking-[0.28em] text-white/40">24 hour table</p>
      </div>
      <div className="hourly-scroll grid max-h-[34rem] gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
        {hourly.slice(0, 12).map((hour) => (
          <div
            key={hour.time}
            className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/40">{compactTime(hour.time)}</p>
                <p className="mt-3 hero-type text-3xl font-semibold tracking-[-0.05em] text-white">
                  {tempWithUnit(hour.temp, units)}
                </p>
              </div>
              <p className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/45">
                Rain {hour.precipitationProbability}%
              </p>
            </div>
            <p className="mt-3 text-sm text-white/60">{hour.summary}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default HourlyForecast;

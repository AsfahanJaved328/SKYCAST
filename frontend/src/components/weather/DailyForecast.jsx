import { motion } from "framer-motion";
import Card from "../common/Card";
import { compactDate, tempWithUnit } from "../../utils/formatters";
import { useUiStore } from "../../stores/uiStore";

const DailyForecast = ({ daily = [] }) => {
  const units = useUiStore((state) => state.units);

  return (
    <Card className="border-white/14 bg-black/55">
      <div className="mb-5 border-b border-white/10 pb-4">
        <p className="card-title">Forecast table</p>
        <h2 className="hero-type mt-1 text-3xl font-semibold tracking-[-0.05em] text-white">5-day outlook</h2>
      </div>
      <div className="space-y-3">
        {daily.map((day, index) => (
          <motion.div
            key={day.date}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="grid items-center gap-4 rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-4 md:grid-cols-[1fr_auto_auto_auto]"
          >
            <div>
              <p className="font-semibold tracking-[-0.02em] text-white">{compactDate(day.date)}</p>
              <p className="text-sm text-white/55">{day.description}</p>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">Rain {day.precipitationProbability}%</p>
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">Wind {day.wind.direction}</p>
            <p className="hero-type text-xl font-semibold tracking-[-0.04em] text-white">
              {tempWithUnit(day.temperature.max, units)} / {tempWithUnit(day.temperature.min, units)}
            </p>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default DailyForecast;

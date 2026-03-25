import { AlertTriangle } from "lucide-react";
import Card from "../common/Card";

const WeatherAlert = ({ alerts = [] }) => (
  <Card className="border-white/14 bg-black/55">
    <div className="flex items-start gap-3">
      <AlertTriangle className="mt-1 text-white/65" />
      <div>
        <p className="card-title">Weather alerts</p>
        {alerts.length === 0 ? (
          <p className="mt-2 text-sm text-white/60">No active weather alerts for this location.</p>
        ) : (
          <div className="mt-3 space-y-3">
            {alerts.map((alert) => (
              <div key={`${alert.event}-${alert.start}`} className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                <p className="font-semibold text-white">{alert.event}</p>
                <p className="mt-1 text-sm text-white/62">{alert.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </Card>
);

export default WeatherAlert;

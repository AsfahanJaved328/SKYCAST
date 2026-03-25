import { Sunrise, Sunset, MoonStar } from "lucide-react";
import Card from "../common/Card";
import { compactTime } from "../../utils/formatters";

const AstronomyCard = ({ data }) => (
  <Card className="h-full border-white/14 bg-black/55">
    <p className="card-title">Astronomy</p>
    <div className="mt-5 grid auto-rows-fr gap-4 sm:grid-cols-3">
      <div className="flex min-h-[10rem] flex-col justify-between rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
        <Sunrise size={18} className="text-white/55" />
        <div>
          <p className="mt-3 text-xs uppercase tracking-[0.22em] text-white/45">Sunrise</p>
          <p className="mt-1 hero-type text-2xl font-semibold tracking-[-0.04em] text-white">{compactTime(data?.astronomy?.sunrise)}</p>
        </div>
      </div>
      <div className="flex min-h-[10rem] flex-col justify-between rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
        <Sunset size={18} className="text-white/55" />
        <div>
          <p className="mt-3 text-xs uppercase tracking-[0.22em] text-white/45">Sunset</p>
          <p className="mt-1 hero-type text-2xl font-semibold tracking-[-0.04em] text-white">{compactTime(data?.astronomy?.sunset)}</p>
        </div>
      </div>
      <div className="flex min-h-[10rem] flex-col justify-between rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
        <MoonStar size={18} className="text-white/55" />
        <div>
          <p className="mt-3 text-xs uppercase tracking-[0.22em] text-white/45">Solar noon</p>
          <p className="mt-1 hero-type text-2xl font-semibold tracking-[-0.04em] text-white">{compactTime(data?.astronomy?.solarNoonEstimate)}</p>
        </div>
      </div>
    </div>
  </Card>
);

export default AstronomyCard;

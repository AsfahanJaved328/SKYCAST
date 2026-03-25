import Card from "../common/Card";

const AirQualityCard = ({ data }) => (
  <Card className="h-full border-white/14 bg-black/55">
    <p className="card-title">Air quality</p>
    <div className="mt-3 flex items-end gap-3">
      <h2 className="hero-type text-5xl font-semibold tracking-[-0.06em] text-white">{data?.airQuality?.index ?? "--"}</h2>
      <p className="pb-1 text-white/55">{data?.airQuality?.level || "Unavailable"}</p>
    </div>
    <p className="mt-4 text-sm leading-6 text-white/65">
      {data?.airQuality?.recommendation || "Air quality data is not available for this location yet."}
    </p>
    {data?.airQuality?.pollutants && (
      <div className="mt-5 grid auto-rows-fr grid-cols-2 gap-3 text-sm">
        {Object.entries(data.airQuality.pollutants).slice(0, 4).map(([key, value]) => (
          <div key={key} className="flex min-h-[8.5rem] flex-col justify-between rounded-[22px] border border-white/10 bg-white/[0.04] px-5 py-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">{key}</p>
            <p className="mt-2 hero-type text-xl font-semibold tracking-[-0.04em] text-white">{value}</p>
          </div>
        ))}
      </div>
    )}
  </Card>
);

export default AirQualityCard;

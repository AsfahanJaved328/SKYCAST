import { startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { useWeatherStore } from "../../stores/weatherStore";

const Footer = () => {
  const navigate = useNavigate();
  const activeCity = useWeatherStore((state) => state.activeCity);

  const handleNavigate = (path) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    startTransition(() => navigate(path));
  };

  return (
    <footer className="relative z-10 px-4 pb-10 pt-4 text-white/55">
      <div className="mx-auto max-w-7xl">
        <div className="glass-panel grid gap-8 rounded-[30px] px-6 py-8 lg:grid-cols-[1.15fr_0.9fr_1fr]">
          <div>
            <button
              type="button"
              className="hero-type text-left text-4xl font-bold tracking-[-0.08em] text-white"
              onClick={() => handleNavigate("/")}
            >
              SKYCAST
            </button>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
              A cinematic weather interface with live forecasts, alerts, astronomy, and air quality intelligence.
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/70">
              <p>
                Author: <span className="text-white">Asfahan Javed</span>
              </p>
              <p>
                Email:{" "}
                <a className="transition hover:text-white" href="mailto:asfahanjaved126@gmail.com">
                  asfahanjaved126@gmail.com
                </a>
              </p>
              <p>
                GitHub ID: <span className="text-white">asfahanjaved328</span>
              </p>
            </div>
          </div>
          <div>
            <p className="card-title">Navigation</p>
            <div className="mt-4 space-y-2 text-left text-2xl font-medium tracking-[-0.05em] text-white">
              <button type="button" className="block transition hover:text-white/70" onClick={() => handleNavigate("/")}>
                Home
              </button>
              <button
                type="button"
                className="block transition hover:text-white/70"
                onClick={() => handleNavigate(`/forecast/${encodeURIComponent(activeCity)}`)}
              >
                Forecast
              </button>
              <button
                type="button"
                className="block transition hover:text-white/70"
                onClick={() => handleNavigate("/favorites")}
              >
                Favorites
              </button>
              <button type="button" className="block transition hover:text-white/70" onClick={() => handleNavigate("/alerts")}>
                Alerts
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <p className="card-title">Connect</p>
              <div className="mt-4 space-y-3 text-sm leading-6 text-white/65">
                <p>
                  <a
                    className="transition hover:text-white"
                    href="https://github.com/AsfahanJaved328"
                    target="_blank"
                    rel="noreferrer"
                  >
                    github.com/AsfahanJaved328
                  </a>
                </p>
                <p>
                  <a
                    className="transition hover:text-white"
                    href="https://www.linkedin.com/in/asfahan-javed-65455b343"
                    target="_blank"
                    rel="noreferrer"
                  >
                    linkedin.com/in/asfahan-javed-65455b343
                  </a>
                </p>
                <p>
                  <a
                    className="transition hover:text-white"
                    href="https://www.instagram.com/asfah_an1?igsh=MWFhdWRzNm5ycjd5eQ=="
                    target="_blank"
                    rel="noreferrer"
                  >
                    instagram.com/asfah_an1
                  </a>
                </p>
              </div>
            </div>
            <div className="mt-8 border-t border-white/10 pt-5">
              <p className="text-lg tracking-[-0.04em] text-white">Live weather, reimagined.</p>
              <p className="mt-2 text-sm text-white/45">c2026 Asfahan Javed. Crafted for a premium weather experience.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { startTransition, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../ui/SearchBar";
import ThemeToggle from "../ui/ThemeToggle";
import TemperatureToggle from "../ui/TemperatureToggle";
import { useUiStore } from "../../stores/uiStore";

const navClass = "text-white/80 transition hover:text-[var(--accentColor)]";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Search", href: "/search" },
  { label: "Favorites", href: "/favorites" },
  { label: "Alerts", href: "/alerts" },
];

const timezoneOptions = [
  { label: "Pakistan", value: "Asia/Karachi" },
  { label: "UAE", value: "Asia/Dubai" },
  { label: "Saudi Arabia", value: "Asia/Riyadh" },
  { label: "United Kingdom", value: "Europe/London" },
  { label: "Germany", value: "Europe/Berlin" },
  { label: "United States (NY)", value: "America/New_York" },
  { label: "United States (LA)", value: "America/Los_Angeles" },
  { label: "Canada (Toronto)", value: "America/Toronto" },
  { label: "India", value: "Asia/Kolkata" },
  { label: "China", value: "Asia/Shanghai" },
  { label: "Japan", value: "Asia/Tokyo" },
  { label: "Australia", value: "Australia/Sydney" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const timeZone = useUiStore((state) => state.timeZone);
  const setTimeZone = useUiStore((state) => state.setTimeZone);
  const [now, setNow] = useState(() => new Date());
  const [isScrolled, setIsScrolled] = useState(false);

  const goTo = (href) => {
    startTransition(() => {
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 36);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const liveTime = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now),
    [now, timeZone],
  );

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={`mx-auto flex max-w-[1920px] items-start justify-between px-4 py-6 transition-all duration-300 sm:px-6 lg:px-8 ${
          isScrolled ? "bg-[rgba(11,8,12,0.72)] backdrop-blur-xl" : ""
        }`}
      >
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => goTo("/")}
            className="hero-type text-sm font-bold tracking-[0.08em] text-white"
          >
            SKYCAST
          </button>
          <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.18em] md:flex">
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => goTo(item.href)}
                className={`${navClass} ${location.pathname === item.href ? "text-[var(--accentColor)]" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-start gap-3">
          <div className="hidden min-w-[320px] lg:block">
            <SearchBar placeholder="Search weather by city" />
          </div>
          <div className="flex min-w-[170px] flex-col items-end">
            <div className="flex items-start gap-2">
              <TemperatureToggle />
              <ThemeToggle />
            </div>
            <div
              className={`overflow-hidden pt-2 text-right transition-all duration-300 ${
                isScrolled ? "max-h-0 translate-y-[-8px] opacity-0" : "max-h-28 translate-y-0 opacity-100"
              }`}
            >
              <p className="hero-type text-sm font-semibold tracking-[-0.04em] text-white">{liveTime}</p>
              <select
                aria-label="Select time zone"
                value={timeZone}
                onChange={(event) => setTimeZone(event.target.value)}
                className="mt-1 max-w-[150px] bg-transparent text-right text-[10px] uppercase tracking-[0.22em] text-white/55 outline-none transition hover:text-white"
              >
                {timezoneOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-[#110d13] text-white">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

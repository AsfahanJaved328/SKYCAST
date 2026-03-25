import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AnimatedRoutes from "./components/animations/AnimatedRoutes";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import { useUiStore } from "./stores/uiStore";

const Home = lazy(() => import("./pages/Home"));
const Forecast = lazy(() => import("./pages/Forecast"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Search = lazy(() => import("./pages/Search"));
const Alerts = lazy(() => import("./pages/Alerts"));

const App = () => {
  const location = useLocation();
  const theme = useUiStore((state) => state.theme);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-app text-white transition-colors duration-500">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="landing-orb-left" />
          <div className="landing-orb-right" />
          <div className="nav-fade" />
        </div>
        <Navbar />
        <main className="relative z-10 mx-auto w-full max-w-[1920px] px-4 pb-14 pt-28 sm:px-6 lg:px-8">
          <Suspense fallback={<LoadingSpinner label="Loading page" className="py-24" />}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<AnimatedRoutes><Home /></AnimatedRoutes>} />
                <Route path="/forecast/:city" element={<AnimatedRoutes><Forecast /></AnimatedRoutes>} />
                <Route path="/favorites" element={<AnimatedRoutes><Favorites /></AnimatedRoutes>} />
                <Route path="/search" element={<AnimatedRoutes><Search /></AnimatedRoutes>} />
                <Route path="/alerts" element={<AnimatedRoutes><Alerts /></AnimatedRoutes>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;

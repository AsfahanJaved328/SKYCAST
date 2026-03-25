import { motion } from "framer-motion";

const LoadingSpinner = ({ label = "Loading weather", className = "" }) => (
  <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      className="h-12 w-12 rounded-full border-4 border-white/25 border-t-white"
    />
    <p className="text-xs uppercase tracking-[0.22em] text-white/55">{label}</p>
  </div>
);

export default LoadingSpinner;
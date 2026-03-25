import { motion } from "framer-motion";
import clsx from "clsx";

const Button = ({ children, className, variant = "primary", ...props }) => (
  <motion.button
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.98 }}
    className={clsx(
      "inline-flex items-center justify-center rounded-full border px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.22em] transition focus:outline-none focus:ring-2 focus:ring-white/30",
      variant === "primary" && "border-white bg-white text-black",
      variant === "secondary" && "border-white/20 bg-transparent text-white hover:bg-white/6",
      className,
    )}
    {...props}
  >
    {children}
  </motion.button>
);

export default Button;
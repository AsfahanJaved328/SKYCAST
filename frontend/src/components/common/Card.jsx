import clsx from "clsx";

const Card = ({ children, className }) => (
  <section className={clsx("glass-panel p-5 sm:p-6", className)}>{children}</section>
);

export default Card;
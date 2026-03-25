const Skeleton = ({ className = "h-24 w-full rounded-3xl" }) => (
  <div className={`skeleton bg-white/70 dark:bg-white/10 ${className}`} />
);

export default Skeleton;

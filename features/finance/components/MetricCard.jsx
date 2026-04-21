export default function MetricCard({ title, value, trend, percent, progress }) {

  const trendColor = trend === "up" ? "text-emerald-500" : "text-orange-500";
  const arrow = trend === "up" ? "arrow_upward" : "arrow_downward";

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">

      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-2">
        {title}
      </p>

      <div className="flex items-baseline gap-2">

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
          {value}
        </h3>

        <span className={`${trendColor} text-xs font-bold flex items-center`}>
          <span className="material-symbols-outlined text-xs">{arrow}</span>
          {percent}
        </span>

      </div>

      <div className="mt-4 w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-primary h-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

    </div>
  );
}
export default function MetricCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-2">
        {title}
      </p>

      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
        {value}
      </h3>
    </div>
  );
}

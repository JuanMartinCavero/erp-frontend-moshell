function Progress({ label, value }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
        <span className="font-medium">{label}</span>
        <span>{value}%</span>
      </div>

      <div className="w-full bg-slate-200 dark:bg-primary/20 h-2 rounded-full overflow-hidden">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default Progress;

export default function OrderPagination() {
  return (
    <div className="p-6 border-t border-slate-200 dark:border-primary/10 flex items-center justify-between">
      <p className="text-xs text-slate-500">Mostrando 1 a 5</p>

      <div className="flex items-center gap-2">
        <button className="size-8 flex items-center justify-center rounded border text-slate-400">
          <span className="material-symbols-outlined text-sm">
            chevron_left
          </span>
        </button>

        <button className="size-8 bg-primary text-white rounded text-xs font-bold">
          1
        </button>

        <button className="size-8 border rounded text-xs font-bold">2</button>

        <button className="size-8 border rounded text-xs font-bold">3</button>

        <button className="size-8 flex items-center justify-center rounded border text-slate-400">
          <span className="material-symbols-outlined text-sm">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
}

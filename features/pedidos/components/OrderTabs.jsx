export default function OrderTabs({
  filtro,
  setFiltro,
  total,
  nacionales,
  internacionales,
}) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => setFiltro("todos")}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
          filtro === "todos"
            ? "bg-slate-900 text-white"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        Todos
        <span className="ml-2 text-xs opacity-70">{total}</span>
      </button>

      <button
        onClick={() => setFiltro("nacionales")}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
          filtro === "nacionales"
            ? "bg-slate-900 text-white"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        Nacionales
        <span className="ml-2 text-xs opacity-70">{nacionales}</span>
      </button>

      <button
        onClick={() => setFiltro("internacionales")}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
          filtro === "internacionales"
            ? "bg-slate-900 text-white"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        🌎 Internacionales
        <span className="ml-2 text-xs opacity-70">{internacionales}</span>
      </button>
    </div>
  );
}
export default function OrderFilters() {

  const estados = [
    "Todos",
    "En Diseño",
    "En Corte",
    "En Confección",
    "En Calidad",
    "Entregado"
  ];

  return (
    <div className="p-6 border-b border-slate-200 dark:border-primary/20 flex flex-wrap items-center justify-between gap-4">

      <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0">

        {estados.map((estado, i) => (
          <button
            key={i}
            className={`px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap ${
              i === 0
                ? "bg-primary text-white"
                : "bg-slate-100 dark:bg-primary/10 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-primary/20"
            }`}
          >
            {estado}
          </button>
        ))}

      </div>

      <div className="flex items-center gap-3">

        <div className="flex items-center bg-slate-100 dark:bg-primary/10 rounded-lg px-3 py-2 gap-2 text-xs font-bold cursor-pointer">

          <span className="material-symbols-outlined text-sm">
            calendar_month
          </span>

          <span>Rango de Fecha</span>

          <span className="material-symbols-outlined text-sm">
            expand_more
          </span>

        </div>

        <button className="flex items-center gap-2 bg-slate-100 dark:bg-primary/10 px-3 py-2 rounded-lg text-xs font-bold">

          <span className="material-symbols-outlined text-sm">
            filter_alt
          </span>

          <span>Más Filtros</span>

        </button>

      </div>

    </div>
  );
}
export default function OrderFilters({
  fases,
  estadoActivo,
  setEstadoActivo,
  fetchPedidos,
  fetchPedidosPorFase,
}) {
  const handleFilter = (estado) => {
    setEstadoActivo(estado);
    if (estado === "Todos") {
      fetchPedidos();
    } else {
      fetchPedidosPorFase(estado);
    }
  };

  return (
    <div className="p-6 border-b border-slate-200 dark:border-primary/20 flex flex-wrap items-center gap-3">
      {/* BOTÓN TODOS */}
      <button
        onClick={() => handleFilter("Todos")}
        className={`px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap ${
          estadoActivo === "Todos"
            ? "bg-primary text-white"
            : "bg-slate-100 dark:bg-primary/10 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-primary/20"
        }`}
      >
        Todos
      </button>

      {/* FASES EN LA MISMA FILA */}
      {(fases ?? []).map((fase) => (
        <button
          key={fase.id}
          onClick={() => handleFilter(fase.nombre)}
          className={`px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap ${
            estadoActivo === fase.nombre
              ? "bg-primary text-white"
              : "bg-slate-100 dark:bg-primary/10 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-primary/20"
          }`}
        >
          {fase.nombre}
        </button>
      ))}

      {/* ACCIONES (se van a la derecha automáticamente) */}
      <div className="ml-auto flex items-center gap-3">
        <div className="flex items-center bg-slate-100 dark:bg-primary/10 rounded-lg px-3 py-2 gap-2 text-xs font-bold cursor-pointer">
          <span className="material-symbols-outlined text-sm">
            calendar_month
          </span>
          <span>Rango de Fecha</span>
          <span className="material-symbols-outlined text-sm">expand_more</span>
        </div>

        <button className="flex items-center gap-2 bg-slate-100 dark:bg-primary/10 px-3 py-2 rounded-lg text-xs font-bold">
          <span className="material-symbols-outlined text-sm">filter_alt</span>
          <span>Más Filtros</span>
        </button>
      </div>
    </div>
  );
}

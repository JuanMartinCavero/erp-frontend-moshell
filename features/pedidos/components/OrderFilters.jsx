import { useState } from "react";

export default function OrderFilters({
  fases,
  estadoActivo,
  setEstadoActivo,
  fetchPedidos,
  fetchPedidosPorFase,
}) {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const handleFilter = (estado) => {
    setEstadoActivo(estado);

    if (estado === "Todos") {
      fetchPedidos();
    } else {
      fetchPedidosPorFase(estado);
    }
  };

  const handleFecha = () => {
    fetchPedidos({
      fechaInicio,
      fechaFin,
    });
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

      {/* FASES */}
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

      {/* FILTRO FECHA */}
      <div className="ml-auto flex items-center gap-3">
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          className="px-3 py-2 rounded-lg bg-slate-100 text-xs"
        />

        <span className="text-xs">hasta</span>

        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          className="px-3 py-2 rounded-lg bg-slate-100 text-xs"
        />

        <button
          onClick={handleFecha}
          className="bg-primary text-white px-3 py-2 rounded-lg text-xs font-bold"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

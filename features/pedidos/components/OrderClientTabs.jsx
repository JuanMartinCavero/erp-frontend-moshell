export default function OrderClientTabs({ tipoCliente, setTipoCliente }) {
  return (
    <div className="flex gap-2 border-t pt-2">
      <button
        onClick={() => setTipoCliente("todos")}
        className={`px-3 py-1.5 text-xs rounded-lg transition ${
          tipoCliente === "todos"
            ? "bg-slate-900 text-white"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
        }`}
      >
        Todos
      </button>

      <button
        onClick={() => setTipoCliente("nuevos")}
        className={`px-3 py-1.5 text-xs rounded-lg transition ${
          tipoCliente === "nuevos"
            ? "bg-slate-900 text-white"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
        }`}
      >
        Nuevos Clientes
      </button>

      <button
        onClick={() => setTipoCliente("recurrentes")}
        className={`px-3 py-1.5 text-xs rounded-lg transition ${
          tipoCliente === "recurrentes"
            ? "bg-slate-900 text-white"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
        }`}
      >
        Recurrentes
      </button>
    </div>
  );
}
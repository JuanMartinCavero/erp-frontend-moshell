export default function OrderActivity({ recentPedidos = [] }) {
  if (recentPedidos.length === 0) {
    return (
      <div className="lg:col-span-1 bg-white dark:bg-primary/5 rounded-2xl border border-slate-200 dark:border-primary/20 p-6">
        <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-indigo-500">
            history
          </span>
          Actividad Reciente
        </h3>

        <p className="text-sm text-slate-500">No hay actividad reciente.</p>
      </div>
    );
  }

  return (
    <div className="lg:col-span-1 bg-white dark:bg-primary/5 rounded-2xl border border-slate-200 dark:border-primary/20 p-6">
      <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-indigo-500">
          history
        </span>
        Actividad Reciente
      </h3>

      <div className="relative border-l border-slate-200 dark:border-primary/20 pl-6 space-y-6">
        {recentPedidos.slice(0, 5).map((pedido) => (
          <div
            key={pedido.id}
            className="relative hover:bg-slate-50 dark:hover:bg-primary/10 p-2 rounded-lg transition"
          >
            {/* punto timeline */}
            <span className="absolute -left-[9px] top-2 w-3 h-3 rounded-full bg-indigo-500"></span>

            <div className="text-sm font-semibold text-slate-800 dark:text-white">
              #{pedido.numero_pedido}
            </div>

            <div className="text-xs text-slate-500">
              {pedido.cliente?.nombre}
            </div>

            <div className="text-xs text-indigo-500 mt-1">
              {pedido.estado}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
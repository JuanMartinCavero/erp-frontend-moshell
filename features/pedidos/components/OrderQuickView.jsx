import Progress from "./Progress";

export default function OrderQuickView({
  selectedPedido,
  fasesProduccion,
  faseActual,
}) {
  if (!selectedPedido) {
    return (
      <div className="lg:col-span-2 bg-white dark:bg-primary/5 rounded-2xl border border-slate-200 dark:border-primary/20 p-6">
        <h3 className="font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-indigo-500">
            visibility
          </span>
          Vista Rápida
        </h3>

        <p className="text-slate-500 mt-4 text-sm">
          Seleccione un pedido para ver detalles.
        </p>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 bg-white dark:bg-primary/5 rounded-2xl border border-slate-200 dark:border-primary/20 p-6">
      {/* header */}

      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-indigo-500">
            Pedido #{selectedPedido.numero_pedido}
          </span>
        </h3>

        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
          Ver detalle completo
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* datos */}

        <div className="space-y-4">
          <div className="bg-slate-50 dark:bg-primary/10 rounded-xl p-4">
            <div className="text-xs text-slate-500 uppercase">Cliente</div>
            <div className="font-semibold text-slate-800 dark:text-white">
              {selectedPedido.cliente?.nombre}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-primary/10 rounded-xl p-4">
            <div className="text-xs text-slate-500 uppercase">Total</div>
            <div className="font-semibold text-slate-800 dark:text-white">
              S/. {selectedPedido.total}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-primary/10 rounded-xl p-4">
            <div className="text-xs text-slate-500 uppercase">
              Fecha Entrega
            </div>
            <div className="font-semibold text-slate-800 dark:text-white">
              {selectedPedido.fecha_entrega}
            </div>
          </div>
        </div>

        {/* progreso */}

        <div className="space-y-5">
          {fasesProduccion.map((fase) => {
            const faseActualOrden = fasesProduccion.find(
              (f) => f.id === faseActual?.fase_produccion_id,
            )?.orden;

            let porcentaje = 0;

            if (faseActualOrden) {
              if (fase.orden < faseActualOrden) {
                porcentaje = 100; // fases terminadas
              }

              if (fase.orden === faseActualOrden) {
                porcentaje = 50; // fase actual en proceso
              }
            }
            return (
              <Progress key={fase.id} label={fase.nombre} value={porcentaje} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

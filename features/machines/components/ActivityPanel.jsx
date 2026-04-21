export default function ActivityPanel() {
  return (
    <div className="flex-1 bg-white p-6 rounded-2xl border">

      <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-lg">
          history
        </span>

        Actividad Reciente
      </h4>

      <div className="space-y-4">

        <div className="flex gap-4">
          <div className="size-2 mt-1.5 rounded-full bg-emerald-500"></div>

          <div>
            <span className="text-sm font-medium">
              Lote #ORD-2040 Finalizado
            </span>

            <p className="text-xs text-slate-500">
              Hace 12 minutos
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="size-2 mt-1.5 rounded-full bg-amber-500"></div>

          <div>
            <span className="text-sm font-medium">
              Alerta de mantenimiento
            </span>

            <p className="text-xs text-slate-500">
              Máquina M-12
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
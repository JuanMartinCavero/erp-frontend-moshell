import { useEffect } from "react";
import usePedidos from "../../../hooks/usePedidos";

export default function OrderStats() {
  const { stats, fetchStats } = usePedidos();

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) return null;
  const data = [
    {
      title: "Total Pedidos (Mes)",
      value: stats.totalPedidosMes,
      change: stats.cambioPedidos,
    },
    {
      title: "Pedidos en Producción",
      value: stats.produccion,
      change: stats.cambioProduccion,
    },
    {
      title: "Pendientes de Pago",
      value: stats.pendientesPago,
      change: stats.cambioPagos,
    },
    {
      title: "Entrega a Tiempo",
      value: stats.entregaTiempo + "%",
      change: stats.cambioEntrega,
      progress: stats.entregaTiempo + "%",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((s, i) => (
        <div
          key={i}
          className="bg-white dark:bg-primary/5 p-6 rounded-2xl border border-slate-200 dark:border-primary/20"
        >
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {s.title}
          </p>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black">{s.value}</span>

            <span className="text-emerald-500 text-sm font-bold">
              {s.change}
            </span>
          </div>

          <div className="mt-4 h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: s.progress }} />
          </div>
        </div>
      ))}
    </div>
  );
}

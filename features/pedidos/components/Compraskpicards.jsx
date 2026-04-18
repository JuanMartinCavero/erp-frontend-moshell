import { useEffect } from "react";

import { ShoppingCart, TrendingUp, AlertTriangle, Truck } from "lucide-react";
import usePurcharse from "../../../hooks/usePurcharse";

export function ComprasKpiCards() {
  const { kpis, fetchKpis } = usePurcharse();

  useEffect(() => {
    fetchKpis();
  }, []);

  if (!kpis) return null;

  const kpiCards = [
    {
      label: "Órdenes Pendientes",
      valor: kpis?.ordenes_pendientes ?? 0,
      icono: ShoppingCart,
      iconoBg: "bg-blue-50",
      iconoColor: "text-blue-500",
    },
    {
      label: "Órdenes de Compra",
      valor: kpis?.ordenes_compra,
      icono: ShoppingCart,
      iconoBg: "bg-blue-50",
      iconoColor: "text-blue-500",
    },
    {
      label: "Presupuesto Ejecutado (Mes)",
      valor: `S/ ${kpis?.presupuesto_mes ?? 0}`,
      icono: TrendingUp,
      iconoBg: "bg-purple-50",
      iconoColor: "text-purple-500",
    },
    {
      label: "Insumos Críticos",
      valor: kpis?.insumos_criticos ?? 0,
      icono: AlertTriangle,
      iconoBg: "bg-red-50",
      iconoColor: "text-red-500",
      cardBorder: "border-red-100",
    },
    {
      label: "Tiempo Promedio Entrega",
      valor: kpis?.tiempo_promedio_entrega ?? 0,
      sufijo: "días",
      icono: Truck,
      iconoBg: "bg-cyan-50",
      iconoColor: "text-cyan-500",
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-5 mb-8">
      {kpiCards.map((kpi) => {
        const Icono = kpi.icono;
        return (
          <div
            key={kpi.label}
            className={`bg-white rounded-2xl border ${kpi.cardBorder || "border-gray-100"} p-5 shadow-sm`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`${kpi.iconoBg} p-2.5 rounded-xl`}>
                <Icono className={`h-5 w-5 ${kpi.iconoColor}`} />
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-1">{kpi.label}</p>

            <p className="text-3xl font-bold text-gray-900">
              {kpi.valor}
              {kpi.sufijo && (
                <span className="text-lg font-semibold text-gray-500 ml-1">
                  {kpi.sufijo}
                </span>
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}

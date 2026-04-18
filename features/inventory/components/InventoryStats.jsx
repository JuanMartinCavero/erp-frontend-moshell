import React, { useEffect } from "react";
import { Package, FileText, TrendingUp, AlertTriangle } from "lucide-react";
import { useMaterial } from "../../../hooks/useMaterial";

export function StatsCards() {
  const { stats, fetchStats } = useMaterial();

  useEffect(() => {
    fetchStats();
  }, []);

  const statsCards = [
    {
      icon: Package,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      title: "Textiles en Stock",
      value: stats?.total_materiales ?? 0,
      subtitle: "unidades",
      change: "+7% vs mes pasado",
      changeColor: "text-emerald-600",
    },
    {
      icon: FileText,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      title: "Órdenes Pedidas Por Compras",
      value: stats?.total_por_compras ?? 0,
      subtitle: "órdenes",
      change: "12 órdenes nuevas",
      changeColor: "text-gray-600",
    },
        {
      icon: FileText,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      title: "Ingreso por Stock en Inventario",
      value: stats?.total_por_materiales ?? 0,
      subtitle: "órdenes",
      change: "12 órdenes nuevas",
      changeColor: "text-gray-600",
    },
    {
      icon: TrendingUp,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      title: "Total Vendido",
      value: "104,290",
      subtitle: "unidades",
      change: "Meta 95%",
      changeColor: "text-emerald-600",
    },
    {
      icon: AlertTriangle,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
      title: "Pre-Alertas",
      value: "8",
      subtitle: "lotes",
      change: "Ver detalles",
      changeColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-5 mb-6">
      {statsCards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
        >
          <div className={`p-2.5 rounded-lg ${card.iconBg}`}>
            <card.icon className={`w-5 h-5 ${card.iconColor}`} />
          </div>

          <div className="text-xs text-gray-600 mt-3">{card.title}</div>

          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-semibold text-gray-900">
              {card.value}
            </div>
            <div className="text-xs text-gray-500">{card.subtitle}</div>
          </div>

          <div className={`text-xs ${card.changeColor}`}>{card.change}</div>
        </div>
      ))}
    </div>
  );
}
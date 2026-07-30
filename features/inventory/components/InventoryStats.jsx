import React, { useEffect } from "react";
import { Package, FileText, TrendingUp, AlertTriangle, ShoppingCart } from "lucide-react";
import { useMaterial } from "../../../hooks/useMaterial";

export function StatsCards({ resumen, mostrandoKardex, material, kardex }) {
  const { stats, fetchStats } = useMaterial();

  useEffect(() => {
    fetchStats();
  }, []);

  // Si estamos mostrando el Kardex de un material, mostrar estadísticas específicas
  if (mostrandoKardex && material) {
    const totalEntradas = kardex?.filter(m => m.tipo_movimiento === 'entrada').reduce((sum, m) => sum + Number(m.cantidad), 0) || 0;
    const totalSalidas = kardex?.filter(m => m.tipo_movimiento === 'salida').reduce((sum, m) => sum + Number(m.cantidad), 0) || 0;
    const stockActual = Number(material.inventario?.stock_actual) || 0;
    const valorUnitario = Number(material.inventario?.valor_unitario) || 0;

    const statsCards = [
      {
        icon: Package,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        title: "Stock Actual",
        value: stockActual,
        subtitle: "unidades",
        change: `Valor: S/ ${(stockActual * valorUnitario).toFixed(2)}`,
        changeColor: "text-gray-600",
      },
      {
        icon: TrendingUp,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600",
        title: "Total Entradas",
        value: totalEntradas,
        subtitle: "unidades",
        change: "Último período",
        changeColor: "text-emerald-600",
      },
      {
        icon: FileText,
        iconBg: "bg-red-50",
        iconColor: "text-red-600",
        title: "Total Salidas",
        value: totalSalidas,
        subtitle: "unidades",
        change: "Último período",
        changeColor: "text-red-600",
      },
      {
        icon: AlertTriangle,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600",
        title: "Valor Unitario",
        value: `S/ ${valorUnitario.toFixed(2)}`,
        subtitle: "",
        change: material.codigo || "",
        changeColor: "text-gray-600",
      },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
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
              <div className="text-2xl font-semibold text-gray-900">
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

  // Vista general - usar las estadísticas del backend
  const totalStock = stats?.total_stock ?? 0;
  const totalValor = stats?.total_valor ?? 0;
  const totalVendido = stats?.total_vendido ?? 0;
  const preAlertas = stats?.pre_alertas ?? 0;

  const statsCards = [
    {
      icon: Package,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      title: "Textiles en Stock",
      value: stats?.total_materiales ?? 0,
      subtitle: "materiales",
      change: `${totalStock} unidades en stock`,
      changeColor: "text-emerald-600",
    },
    {
      icon: ShoppingCart,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      title: "Órdenes de Compra",
      value: stats?.total_por_compras ?? 0,
      subtitle: "órdenes",
      change: "Pendientes de recepción",
      changeColor: "text-gray-600",
    },
    {
      icon: FileText,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      title: "Movimientos de Entrada",
      value: stats?.total_por_materiales ?? 0,
      subtitle: "movimientos",
      change: "Últimos 30 días",
      changeColor: "text-blue-600",
    },
    {
      icon: TrendingUp,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      title: "Total Vendido",
      value: totalVendido.toLocaleString(),
      subtitle: "unidades",
      change: `Valor total: S/ ${totalValor.toFixed(2)}`,
      changeColor: "text-emerald-600",
    },
    {
      icon: AlertTriangle,
      iconBg: preAlertas > 0 ? "bg-red-50" : "bg-gray-50",
      iconColor: preAlertas > 0 ? "text-red-600" : "text-gray-400",
      title: "Pre-Alertas",
      value: preAlertas,
      subtitle: "materiales",
      change: preAlertas > 0 ? "¡Stock bajo!" : "Sin alertas",
      changeColor: preAlertas > 0 ? "text-red-600" : "text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-6">
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
            <div className="text-2xl font-semibold text-gray-900">
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
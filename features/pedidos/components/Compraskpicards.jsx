import { ShoppingCart, TrendingUp, AlertTriangle, Truck } from "lucide-react"

const kpis = [
  {
    label: "Órdenes Pendientes",
    valor: "24",
    icono: ShoppingCart,
    iconoBg: "bg-blue-50",
    iconoColor: "text-blue-500",
    badge: "+5.2%",
    badgeColor: "text-green-500 bg-green-50",
  },
  {
    label: "Presupuesto Ejecutado (Mes)",
    valor: "€45,200",
    icono: TrendingUp,
    iconoBg: "bg-purple-50",
    iconoColor: "text-purple-500",
    badge: "-2.4%",
    badgeColor: "text-red-500 bg-red-50",
  },
  {
    label: "Insumos Críticos",
    valor: "12",
    icono: AlertTriangle,
    iconoBg: "bg-red-50",
    iconoColor: "text-red-500",
    badge: "Alerta",
    badgeColor: "text-red-600 bg-red-50 border border-red-200",
    cardBorder: "border-red-100",
  },
  {
    label: "Tiempo Promedio Entrega",
    valor: "4.2",
    sufijo: "días",
    icono: Truck,
    iconoBg: "bg-cyan-50",
    iconoColor: "text-cyan-500",
    badge: "+0.5%",
    badgeColor: "text-green-500 bg-green-50",
  },
]

export function ComprasKpiCards() {
  return (
    <div className="grid grid-cols-4 gap-5 mb-8">
      {kpis.map((kpi) => {
        const Icono = kpi.icono
        return (
          <div
            key={kpi.label}
            className={`bg-white rounded-2xl border ${kpi.cardBorder || "border-gray-100"} p-5 shadow-sm`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`${kpi.iconoBg} p-2.5 rounded-xl`}>
                <Icono className={`h-5 w-5 ${kpi.iconoColor}`} />
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${kpi.badgeColor}`}>
                {kpi.badge}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">{kpi.label}</p>
            <p className="text-3xl font-bold text-gray-900">
              {kpi.valor}
              {kpi.sufijo && (
                <span className="text-lg font-semibold text-gray-500 ml-1">{kpi.sufijo}</span>
              )}
            </p>
          </div>
        )
      })}
    </div>
  )
}
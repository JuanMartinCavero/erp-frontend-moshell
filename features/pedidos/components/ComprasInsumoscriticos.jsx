import { AlertTriangle } from "lucide-react"

const insumos = [
  { nombre: "Hilo 30/1 Ne",      porcentaje: 15, nivel: "critico" },
  { nombre: "Elastano 70D",      porcentaje: 8,  nivel: "critico" },
  { nombre: "Cierres YKK 2...",  porcentaje: 28, nivel: "alerta"  },
  { nombre: "Poliéster Text...", porcentaje: 12, nivel: "critico" },
]

const NIVEL_STYLES = {
  critico: {
    card:  "bg-red-50 border-red-100",
    icon:  "bg-red-100",
    iconColor: "text-red-500",
    bar:   "bg-red-200",
    fill:  "bg-red-500",
    text:  "text-red-600",
  },
  alerta: {
    card:  "bg-amber-50 border-amber-100",
    icon:  "bg-amber-100",
    iconColor: "text-amber-500",
    bar:   "bg-amber-200",
    fill:  "bg-amber-500",
    text:  "text-amber-600",
  },
}

export function InsumosCriticos() {
  return (
    <div className="w-72 flex-shrink-0">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">Insumos Críticos</h2>
        </div>
        <div className="p-4 space-y-3">
          {insumos.map((item) => {
            const st = NIVEL_STYLES[item.nivel]
            return (
              <div key={item.nombre} className={`flex items-start gap-3 p-3 rounded-xl border ${st.card}`}>
                <div className={`${st.icon} p-1.5 rounded-lg flex-shrink-0`}>
                  <AlertTriangle className={`h-4 w-4 ${st.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{item.nombre}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className={`flex-1 h-1.5 ${st.bar} rounded-full overflow-hidden`}>
                      <div className={`h-full ${st.fill} rounded-full`} style={{ width: `${item.porcentaje}%` }} />
                    </div>
                    <span className={`text-xs font-bold ${st.text}`}>{item.porcentaje}%</span>
                  </div>
                </div>
              </div>
            )
          })}

          <button className="w-full mt-1 bg-gray-800 hover:bg-gray-900 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
            Reponer Todo (Smart Buy)
          </button>
        </div>
      </div>
    </div>
  )
}
import { AlertTriangle } from "lucide-react";
import usePurcharse from "../../../hooks/usePurcharse";

const NIVEL_STYLES = {
  critico: {
    card: "bg-red-50 border-red-100",
    icon: "bg-red-100",
    iconColor: "text-red-500",
    bar: "bg-red-200",
    fill: "bg-red-500",
    text: "text-red-600",
  },
  alerta: {
    card: "bg-amber-50 border-amber-100",
    icon: "bg-amber-100",
    iconColor: "text-amber-500",
    bar: "bg-amber-200",
    fill: "bg-amber-500",
    text: "text-amber-600",
  },
};

export function InsumosCriticos() {
  const { insumosCriticos } = usePurcharse();

  return (
    <div className="w-72 flex-shrink-0">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">
            Insumos Críticos
          </h2>
        </div>

        <div className="p-4 space-y-3">
          {insumosCriticos.map((item) => {
            const porcentaje = Math.min(
              Math.round((item.stock_actual / (item.stock_minimo * 2)) * 100),
              100,
            );

            const nivel =
              item.stock_actual <= item.stock_minimo ? "critico" : "alerta";

            const st = NIVEL_STYLES[nivel];

            return (
              <div
                key={item.id}
                className={`flex items-start gap-3 p-3 rounded-xl border ${st.card}`}
              >
                <div className={`${st.icon} p-1.5 rounded-lg flex-shrink-0`}>
                  <AlertTriangle className={`h-4 w-4 ${st.iconColor}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {item.codigo}
                  </p>

                  <div className="mt-1.5 flex items-center gap-2">
                    <div
                      className={`flex-1 h-1.5 ${st.bar} rounded-full overflow-hidden`}
                    >
                      <div
                        className={`h-full ${st.fill} rounded-full`}
                        style={{
                          width: `${porcentaje}%`,
                        }}
                      />
                    </div>

                    <span className={`text-xs font-bold ${st.text}`}>
                      {item.stock_actual}/{item.stock_minimo}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

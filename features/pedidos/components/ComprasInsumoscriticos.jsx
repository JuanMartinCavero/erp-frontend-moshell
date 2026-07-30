import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import usePurcharse from "../../../hooks/usePurcharse";
import { OrdenCompraModal } from "../../../components/OrdenCompraModal";

const NIVEL_STYLES = {
  critico: {
    card: "bg-red-50 border-red-200",
    icon: "bg-red-100",
    iconColor: "text-red-600",
    bar: "bg-red-200",
    fill: "bg-red-500",
    text: "text-red-600",
    badge: "bg-red-100 text-red-700",
  },
  alerta: {
    card: "bg-amber-50 border-amber-200",
    icon: "bg-amber-100",
    iconColor: "text-amber-600",
    bar: "bg-amber-200",
    fill: "bg-amber-500",
    text: "text-amber-600",
    badge: "bg-amber-100 text-amber-700",
  },
};

export function InsumosCriticos() {
  const { insumosCriticos } = usePurcharse();

  const [mostrarModal, setMostrarModal] = useState(false);
  const [seleccionados, setSeleccionados] = useState([]);

  const toggleSeleccion = (item) => {
    const existe = seleccionados.some(
      (x) => x.material_id === item.material_id,
    );

    if (existe) {
      setSeleccionados(
        seleccionados.filter((x) => x.material_id !== item.material_id),
      );
    } else {
      setSeleccionados([...seleccionados, item]);
    }
  };

  return (
    <>
      <div className="w-80 flex-shrink-0">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Insumos críticos
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                Materiales que requieren reposición
              </p>
            </div>

            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
              {insumosCriticos.length}
            </span>
          </div>

          {/* Lista */}
          <div className="p-4 space-y-4 max-h-[520px] overflow-y-auto">
            {insumosCriticos.length === 0 && (
              <div className="py-12 text-center">
                <AlertTriangle className="mx-auto h-10 w-10 text-green-500" />

                <p className="mt-3 font-semibold text-gray-700">
                  No hay insumos críticos
                </p>

                <p className="text-sm text-gray-500">
                  Todos los materiales tienen stock suficiente.
                </p>
              </div>
            )}

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
                  key={item.material_id}
                  onClick={() => toggleSeleccion(item)}
                  className={`
                    flex
                    items-start
                    gap-4
                    p-5
                    rounded-2xl
                    border
                    transition-all
                    duration-200
                    cursor-pointer
                    hover:shadow-lg
                    hover:border-gray-300
                    hover:scale-[1.01]
                    ${st.card}
                  `}
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={seleccionados.some(
                      (x) => x.material_id === item.material_id,
                    )}
                    onChange={() => toggleSeleccion(item)}
                    onClick={(e) => e.stopPropagation()}
                    className="
                      mt-2
                      h-5
                      w-5
                      rounded-md
                      border-gray-300
                      text-blue-600
                      focus:ring-blue-500
                      cursor-pointer
                    "
                  />

                  {/* Icono */}
                  <div
                    className={`
                      ${st.icon}
                      w-11
                      h-11
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      flex-shrink-0
                    `}
                  >
                    <AlertTriangle className={`h-5 w-5 ${st.iconColor}`} />
                  </div>

                  {/* Información */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900 truncate">
                          {item.codigo}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          Stock disponible
                        </p>
                      </div>

                      <span
                        className={`
                          px-2.5
                          py-1
                          rounded-full
                          text-[11px]
                          font-semibold
                          ${st.badge}
                        `}
                      >
                        {nivel === "critico" ? "Crítico" : "Alerta"}
                      </span>
                    </div>

                    {/* Barra */}
                    <div className="mt-4 flex items-center gap-3">
                      <div
                        className={`
                          flex-1
                          h-2.5
                          rounded-full
                          overflow-hidden
                          ${st.bar}
                        `}
                      >
                        <div
                          className={`
                            h-full
                            rounded-full
                            transition-all
                            duration-500
                            ${st.fill}
                          `}
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

        {/* Footer */}
        <div className="mt-5">
          <div className="text-center text-sm text-gray-500 mb-3">
            {seleccionados.length} material(es) seleccionado(s)
          </div>

          <button
            disabled={seleccionados.length === 0}
            onClick={() => setMostrarModal(true)}
            className={`
              w-full
              rounded-2xl
              py-3.5
              font-semibold
              transition-all
              duration-200

              ${
                seleccionados.length === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl active:scale-95"
              }
            `}
          >
            Crear orden de compra
          </button>
        </div>
      </div>

      {mostrarModal && (
        <OrdenCompraModal
          onClose={() => setMostrarModal(false)}
          materialesIniciales={seleccionados}
        />
      )}
    </>
  );
}

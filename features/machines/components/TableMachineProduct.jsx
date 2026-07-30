import React, { useEffect } from "react";

import { useMachines } from "../../../hooks/useMachine";

export default function TableMachineProduct() {
  const { machines, loading, fetchMachinesProduction } = useMachines();

  useEffect(() => {
    fetchMachinesProduction();
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="bg-white rounded-2xl border overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center">
        <h3 className="text-lg font-bold">Cola de Producción</h3>

        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs font-semibold bg-primary text-white rounded-lg">
            Nuevo Lote
          </button>

          <button className="px-3 py-1.5 text-xs font-semibold bg-slate-100 rounded-lg">
            Exportar
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase">
              <th className="px-6 py-4">Máquina</th>
              <th className="px-6 py-4">Trabajo Actual</th>
              <th className="px-6 py-4">Progreso</th>
              <th className="px-6 py-4">Entrega</th>
              <th className="px-6 py-4">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {machines
              .filter((machine) => machine.technical_sheets?.length > 0)
              .map((machine) => {
                const techSheet = machine.technical_sheets?.[0];
                const pedido = techSheet?.pedido;

                return (
                  <tr key={machine.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold">
                      {machine.code} {machine.nombre}
                    </td>

                    <td className="px-6 py-4">
                      #{techSheet?.reference || "Sin trabajo"}
                    </td>

                    <td className="px-6 py-4">
                      {techSheet?.produccion_actual || 0} /
                      {pedido?.estimated_quantity || 0} Kg
                    </td>

                    <td className="px-6 py-4">
                      {pedido?.fecha_entrega || "-"}
                    </td>

                    <td className="px-6 py-4">
                      <span className="material-symbols-outlined">
                        more_vert
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

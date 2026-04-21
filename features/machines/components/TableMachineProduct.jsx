export default function TableMachineProduct() {
  return (
    <div className="bg-white rounded-2xl border overflow-hidden">

      <div className="p-6 border-b flex justify-between items-center">
        <h3 className="text-lg font-bold">Cola de Producción Activa</h3>

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
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4">Entrega</th>
              <th className="px-6 py-4">Acciones</th>

            </tr>
          </thead>

          <tbody className="divide-y">

            <tr className="hover:bg-slate-50">

              <td className="px-6 py-4 font-semibold">
                M-01 Circular High Speed
              </td>

              <td className="px-6 py-4">
                #ORD-2044
              </td>

              <td className="px-6 py-4">
                420 / 500 Kg
              </td>

              <td className="px-6 py-4 text-emerald-500 font-semibold">
                Tejiendo
              </td>

              <td className="px-6 py-4">
                Hoy 18:30
              </td>

              <td className="px-6 py-4">
                <span className="material-symbols-outlined">
                  more_vert
                </span>
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}
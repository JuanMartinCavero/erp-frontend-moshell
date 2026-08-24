export default function FinanceTableProviders({
  orders,
  registrarPagoProveedor,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Cuentas por Pagar
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Pagos pendientes a proveedores
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">
                Proveedor
              </th>

              <th className="px-6 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">
                Orden
              </th>

              <th className="px-6 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">
                Total
              </th>

              <th className="px-6 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">
                Estado
              </th>

              <th className="px-6 py-3"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {orders?.length > 0 ? (
              orders.map((o) => (
                <tr
                  key={o.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                >
                  <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-200">
                    {o.proveedor}
                  </td>

                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                    {o.orden_codigo}
                  </td>

                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                    S/ {o.total}
                  </td>

                  <td className="px-6 py-4">
                    {o.estado === "pagado" && (
                      <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                        Pagado
                      </span>
                    )}

                    {o.estado === "recibida" && (
                      <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
                        Por pagar
                      </span>
                    )}

                    {o.estado === "aprobada" && (
                      <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                        Aprobada
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-right">
                    {o.estado === "recibida" && (
                      <button
                        type="button"
                        onClick={() =>
                          registrarPagoProveedor({
                            orden_compra_id: o.id,
                            monto: o.total,
                          })
                        }
                        className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition"
                      >
                        Pagar proveedor
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-8 text-center text-sm text-slate-500"
                >
                  No hay cuentas por pagar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

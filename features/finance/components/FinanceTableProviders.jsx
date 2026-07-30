export default function FinanceTableProviders({
  orders,
  registrarPagoProveedor,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <table className="w-full text-left">
        {/* HEADER */}
        <thead className="bg-slate-50 dark:bg-slate-800/50">
          <tr>
            <th className="px-6 py-3 text-xs font-semibold text-slate-600 uppercase">
              Proveedor
            </th>

            <th className="px-6 py-3 text-xs font-semibold text-slate-600 uppercase">
              Orden
            </th>

            <th className="px-6 py-3 text-xs font-semibold text-slate-600 uppercase">
              Total
            </th>

            <th className="px-6 py-3 text-xs font-semibold text-slate-600 uppercase">
              Estado
            </th>

            <th className="px-6 py-3"></th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {orders?.map((o) => (
            <tr
              key={o.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
            >
              {/* proveedor */}
              <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-200">
                {o.proveedor}
              </td>

              {/* orden */}
              <td className="px-6 py-4 text-slate-500">{o.orden_codigo}</td>

              {/* total */}
              <td className="px-6 py-4 font-semibold">S/ {o.total}</td>

              {/* estado */}
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
                    onClick={() =>
                      registrarPagoProveedor({
                        orden_compra_id: o.id,
                        monto: o.total,
                      })
                    }
                    className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg"
                  >
                    Pagar proveedor
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function FinanceTable({ transactions, registrarPago }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Cuentas por Cobrar
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Seguimiento de saldos pendientes de clientes
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">
                Empresa
              </th>

              <th className="px-6 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">
                Tipo
              </th>

              <th className="px-6 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">
                Pedido
              </th>

              <th className="px-6 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">
                Total
              </th>

              <th className="px-6 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">
                Saldo
              </th>

              <th className="px-6 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase text-center">
                Estado
              </th>

              <th className="px-6 py-3"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {transactions?.length > 0 ? (
              transactions.map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                >
                  <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-200">
                    {t.empresa}
                  </td>

                  <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-200">
                    {t.tipo_pedido}
                  </td>

                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                    {t.referencia}
                  </td>

                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                    S/ {t.monto}
                  </td>

                  <td className="px-6 py-4 text-orange-600 font-semibold">
                    S/ {t.saldo}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {t.estado === "Cancelado" ? (
                      <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                        Cancelado
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
                        Canceló 50%
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-right">
                    {t.estado !== "Cancelado" && (
                      <button
                        type="button"
                        onClick={() =>
                          registrarPago({
                            pedido_id: t.id,
                          })
                        }
                        className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition"
                      >
                        Pagar saldo
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-8 text-center text-sm text-slate-500"
                >
                  No hay cuentas por cobrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

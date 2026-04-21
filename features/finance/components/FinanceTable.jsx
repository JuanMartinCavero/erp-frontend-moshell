export default function FinanceTable() {

  const transactions = [
    {
      name: "Textiles Cataluña",
      ref: "#ORD-2044",
      amount: "€3.420",
      due: "12 Oct 2023",
      status: "Pagado"
    },
    {
      name: "Insumos de Barcelona",
      ref: "#ORD-2045",
      amount: "€1.200",
      due: "18 Oct 2023",
      status: "Pendiente"
    },
    {
      name: "Garmets Levante",
      ref: "#ORD-2046",
      amount: "€5.800",
      due: "05 Oct 2023",
      status: "Vencido"
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">

      <table className="w-full text-left">

        <thead className="bg-slate-50 dark:bg-slate-800/50">
          <tr>
            <th className="px-6 py-4 text-xs font-bold">Cliente</th>
            <th className="px-6 py-4 text-xs font-bold">Referencia</th>
            <th className="px-6 py-4 text-xs font-bold">Monto</th>
            <th className="px-6 py-4 text-xs font-bold">Vencimiento</th>
            <th className="px-6 py-4 text-xs font-bold text-center">Estado</th>
          </tr>
        </thead>

        <tbody>

          {transactions.map((t, i) => (

            <tr key={i} className="border-t border-slate-200 dark:border-slate-800">

              <td className="px-6 py-4 text-sm font-semibold">
                {t.name}
              </td>

              <td className="px-6 py-4 text-sm">
                {t.ref}
              </td>

              <td className="px-6 py-4 text-sm font-bold">
                {t.amount}
              </td>

              <td className="px-6 py-4 text-sm">
                {t.due}
              </td>

              <td className="px-6 py-4 text-center text-xs font-bold">
                {t.status}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
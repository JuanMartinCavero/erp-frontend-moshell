export default function CollectionsStatus({ monto, facturas }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">

      <p className="text-sm text-slate-500">Pagos Pendientes</p>

      <h3 className="text-3xl font-bold">S/ {monto}</h3>

      <p className="text-rose-500 text-xs mt-1">
        {facturas} facturas vencidas
      </p>

    </div>
  );
}
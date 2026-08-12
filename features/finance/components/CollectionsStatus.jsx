export default function CollectionsStatus({ monto, facturas }) {
  const cantidadPendiente = Array.isArray(facturas)
    ? facturas.filter((factura) => factura.estado !== "Cancelado").length
    : 0;

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Pagos Pendientes
      </p>

      <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
        S/ {monto}
      </h3>

      <p className="text-rose-500 text-xs mt-1">
        {cantidadPendiente}{" "}
        {cantidadPendiente === 1 ? "factura pendiente" : "facturas pendientes"}
      </p>
    </div>
  );
}

export default function OrderQuickView() {
  return (
    <div className="lg:col-span-2 bg-white dark:bg-primary/5 rounded-2xl border border-slate-200 dark:border-primary/20 p-6">

      <h3 className="font-bold text-lg flex items-center gap-2">

        <span className="material-symbols-outlined text-primary">
          visibility
        </span>

        Vista Rápida

      </h3>

      <p className="text-sm text-slate-500 mt-3">
        Seleccione un pedido para ver detalles.
      </p>

    </div>
  );
}
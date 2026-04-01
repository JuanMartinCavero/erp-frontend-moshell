export default function OrderActivity() {
  return (
    <div className="lg:col-span-1 bg-white dark:bg-primary/5 rounded-2xl border border-slate-200 dark:border-primary/20 p-6">

      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">

        <span className="material-symbols-outlined text-primary">
          history
        </span>

        Actividad Reciente

      </h3>

      <p className="text-sm text-slate-500">
        No hay actividad reciente.
      </p>

    </div>
  );
}
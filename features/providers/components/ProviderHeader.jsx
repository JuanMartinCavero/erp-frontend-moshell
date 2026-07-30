export default function ProviderHeader({ onCreate }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Directorio de Proveedores
        </h2>

        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Gestiona la cadena de suministro y catálogo de materiales.
        </p>
      </div>

      <button
        onClick={onCreate}
        className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
      >
        Nuevo Proveedor
      </button>
    </div>
  );
}
export default function ResumenCarga() {
  return (
    <div className="w-full md:w-80 bg-primary/10 p-6 rounded-2xl border border-primary/20 flex flex-col justify-between">

      <div>

        <h4 className="font-bold text-sm mb-2 text-primary">
          Resumen de Carga
        </h4>

        <p className="text-xs text-slate-500 mb-6">
          El sistema ha activado el módulo de tercerización automáticamente debido a sobrecarga.
        </p>

      </div>

      <div className="space-y-3">

        <div className="flex justify-between">
          <span className="text-xs font-semibold">Tejido Propio</span>
          <span className="text-xs font-bold">2,450 Kg</span>
        </div>

        <div className="flex justify-between">
          <span className="text-xs font-semibold">Tercerización</span>
          <span className="text-xs font-bold">800 Kg</span>
        </div>

        <button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg">
          Ver Detalles
        </button>

      </div>

    </div>
  );
}
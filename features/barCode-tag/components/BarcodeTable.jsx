export default function BarcodeTable() {
  return (
    <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <h3 className="text-lg font-bold">Materiales Recientemente Escaneados</h3>
        <button className="text-primary text-sm font-semibold hover:underline">Ver Historial Completo</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Código / Lote</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Material</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Ubicación</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Estado Stock</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            <tr>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold">HL-98231</span>
                  <span className="text-[10px] text-slate-400">Escaneado 10:45 AM</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-sm">architecture</span>
                  </div>
                  <span className="text-sm">Lana Merino Gris</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  Pasillo A - Estante 4
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Disponible (150kg)
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-slate-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-xl">visibility</span>
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold">TL-22045</span>
                  <span className="text-[10px] text-slate-400">Escaneado 09:20 AM</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-sm">texture</span>
                  </div>
                  <span className="text-sm">Seda Natural Blanca</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  Cámara Seguridad B
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                  Stock Bajo (12m)
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-slate-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-xl">visibility</span>
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold">HL-98112</span>
                  <span className="text-[10px] text-slate-400">Escaneado Ayer</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-sm">architecture</span>
                  </div>
                  <span className="text-sm">Poliéster Reciclado Azul</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  Muelle Recepción 1
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  En Proceso
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-slate-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-xl">visibility</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

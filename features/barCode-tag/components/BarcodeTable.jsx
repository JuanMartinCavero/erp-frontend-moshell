// MODIFICADO: Tabla dinámica con historial de escaneos
import React from 'react';

export default function BarcodeTable({ scanHistory = [], onViewMaterial }) {
  // AGREGADO: Si no hay historial, mostrar mensaje
  if (scanHistory.length === 0) {
    return (
      <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h3 className="text-lg font-bold">Materiales Recientemente Escaneados</h3>
          <button className="text-primary text-sm font-semibold hover:underline">Ver Historial Completo</button>
        </div>
        <div className="p-12 text-center text-slate-400">
          No hay materiales escaneados aún. Escanea un código de barras para comenzar.
        </div>
      </section>
    );
  }

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
            {/* AGREGADO: Mapear historial de escaneos dinámicamente */}
            {scanHistory.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">{item.codigo}</span>
                    <span className="text-[10px] text-slate-400">{item.fechaEscaneo}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-sm">inventory_2</span>
                    </div>
                    <span className="text-sm">{item.calidad} {item.color}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    {item.ubicacion || 'No asignada'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.stock > 50 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                    item.stock > 10 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {item.stock > 50 ? 'Disponible' : item.stock > 10 ? 'Stock Bajo' : 'Stock Crítico'} ({item.stock}{item.unidad})
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onViewMaterial && onViewMaterial(item)}
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">visibility</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
import { useState } from "react";

export default function ProviderTable({ providers }) {
  return (
    <div className="flex-1 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                Proveedor
              </th>

              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                Contacto
              </th>

              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                Estado
              </th>

              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {providers.map((provider) => (
              <tr
                key={provider.id}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors"
              >
                <td className="px-6 py-4">
                  <p className="font-bold text-sm">{provider.razon_social}</p>

                  <p className="text-xs text-slate-500">RUC: {provider.ruc}</p>
                </td>

                <td className="px-6 py-4">
                  <p className="text-sm">{provider.contacto}</p>

                  <p className="text-xs text-slate-500">{provider.email}</p>
                </td>

                <td className="px-6 py-4">
                  {provider.estado == 1 ? (
                    <span className="text-xs font-bold text-emerald-500">
                      Activo
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-red-500">
                      Inactivo
                    </span>
                  )}
                </td>

                <td className="px-6 py-4">
                  <button className="text-slate-400 hover:text-primary">
                    <span className="material-symbols-outlined">
                      more_horiz
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

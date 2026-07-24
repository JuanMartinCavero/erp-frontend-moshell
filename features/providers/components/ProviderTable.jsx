export default function ProviderTable({ providers, onEdit, onDelete }) {
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
                  <div className="flex items-center gap-3">
                    {/* Editar */}
                    <button
                      onClick={() => onEdit(provider)}
                      className="text-yellow-600 hover:text-yellow-800 transition-colors"
                      title="Editar"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>

                    {/* Eliminar */}
                    <button
                      onClick={() => onDelete(provider)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Eliminar"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7H5m14 0l-1 12a2 2 0 01-2 2H8a2 2 0 01-2-2L5 7m3 0V5a2 2 0 012-2h2a2 2 0 012 2v2"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

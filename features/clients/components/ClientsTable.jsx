import React from "react";
import ClientRow from "../components/ClientRow";

const ClientsTable = ({ clientes, loading, onDelete, onActivate, onEdit }) => {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
          <p className="text-sm text-slate-500">Cargando clientes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
            <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="px-6 py-4 text-left">Cliente</th>
              <th className="px-6 py-4 text-left">Identificación</th>
              <th className="px-6 py-4 text-left">País</th>
              <th className="px-6 py-4 text-center">Estado</th>
              <th className="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {clientes.length > 0 ? (
              clientes.map((cliente) => (
                <ClientRow
                  key={cliente.id}
                  cliente={cliente}
                  onDelete={onDelete}
                  onActivate={onActivate}
                  onEdit={onEdit}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl dark:bg-slate-800">
                      👥
                    </div>

                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                      No hay clientes registrados
                    </h3>

                    <p className="max-w-md text-sm text-slate-500">
                      Cuando agregues un cliente aparecerá aquí para que puedas
                      administrarlo fácilmente.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsTable;

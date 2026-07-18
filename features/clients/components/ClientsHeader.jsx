import React from "react";
import { Plus, Users } from "lucide-react";

const ClientsHeader = ({ onNew }) => {
  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
          <Users size={30} className="text-slate-700 dark:text-slate-200" />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            Gestión
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            Clientes
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Administra y consulta la información de todos tus clientes desde un
            solo lugar.
          </p>
        </div>
      </div>

      <button
        onClick={onNew}
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-95"
      >
        <Plus size={18} />
        Nuevo Cliente
      </button>
    </div>
  );
};

export default ClientsHeader;

import { Users } from "lucide-react";

export default function ProviderStats({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex items-center gap-4">
        <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
          <Users size={24} />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Proveedores registrados
          </p>

          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {stats?.proveedores_activos ?? 0}
          </p>
        </div>
      </div>
    </div>
  );
}

import { CardSim, Users, Package, Star } from "lucide-react";

export default function ProviderStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

      {/* Proveedores */}
      <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex items-center gap-4">
        <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
          <Users size={24} />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Proveedores Activos
          </p>
          <p className="text-2xl font-bold">
            {stats?.proveedores_activos ?? 0}
          </p>
        </div>
      </div>

      {/* Insumos */}
      <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex items-center gap-4">
        <div className="p-3 rounded-xl bg-green-100 text-green-600">
          <Package size={24} />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Insumos en Catálogo
          </p>
          <p className="text-2xl font-bold">
            {stats?.insumos_catalogo ?? 0}
          </p>
        </div>
      </div>

      {/* Calificación */}
      <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex items-center gap-4">
        <div className="p-3 rounded-xl bg-yellow-100 text-yellow-600">
          <Star size={24} />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Calificación Promedio
          </p>
          <p className="text-2xl font-bold">
            {stats?.calificacion_promedio ?? 0}
          </p>
        </div>
      </div>

      {/* Órdenes */}
      <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex items-center gap-4">
        <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
          <CardSim size={24} />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Órdenes este Mes
          </p>
          <p className="text-2xl font-bold">
            {stats?.ordenes_mes ?? 0}
          </p>
        </div>
      </div>

    </div>
  );
}
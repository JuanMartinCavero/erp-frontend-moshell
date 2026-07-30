import { Edit, Power, RotateCcw, Building2, Globe } from "lucide-react";

export default function ClientRow({ cliente, onDelete, onActivate, onEdit }) {
  return (
    <tr className="transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/40">
      {/* Cliente */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Building2 size={22} className="text-primary" />
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white">
              {cliente.nombre}
            </h4>

            {cliente.empresa && (
              <p className="text-sm text-slate-500">{cliente.empresa}</p>
            )}
          </div>
        </div>
      </td>

      {/* Documento */}
      <td className="px-6 py-5">
        <div className="flex flex-col">
          <span className="font-medium text-slate-700 dark:text-slate-200">
            {cliente.identificacion_fiscal}
          </span>

          <span className="text-xs text-slate-500">
            {cliente.tipo_identificacion}
          </span>
        </div>
      </td>

      {/* País */}
      <td className="px-6 py-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <Globe size={15} />
          {cliente.pais}
        </div>
      </td>

      {/* Estado */}
      <td className="px-6 py-5 text-center">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
            cliente.estado
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          <span
            className={`mr-2 h-2 w-2 rounded-full ${
              cliente.estado ? "bg-emerald-500" : "bg-red-500"
            }`}
          />

          {cliente.estado ? "Activo" : "Inactivo"}
        </span>
      </td>

      {/* Acciones */}
      <td className="px-6 py-5">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onEdit(cliente)}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            title="Editar"
          >
            <Edit size={18} />
          </button>

          {cliente.estado ? (
            <button
              onClick={() => onDelete(cliente.id)}
              className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              title="Desactivar"
            >
              <Power size={18} />
            </button>
          ) : (
            <button
              onClick={() => onActivate(cliente.id)}
              className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
              title="Activar"
            >
              <RotateCcw size={18} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

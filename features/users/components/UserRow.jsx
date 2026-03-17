import React from "react";
import { Pencil, Trash } from "lucide-react";

const UserRow = ({ user, onToggle }) => {

  return (
    <tr className="border-t border-slate-200 hover:bg-slate-50">

      <td className="px-6 py-4">

        <div className="flex flex-col">

          <span className="font-semibold text-slate-700">
            {user.nombre} {user.apellido}
          </span>

          <span className="text-xs text-slate-500">
            {user.email}
          </span>

        </div>

      </td>

      <td className="px-6 py-4 text-sm text-slate-600">
        {user.role?.nombre}
      </td>

      <td className="px-6 py-4">

        {user.estado === 1 ? (
          <span className="text-emerald-600 text-sm font-medium">
            Activo
          </span>
        ) : (
          <span className="text-red-500 text-sm font-medium">
            Inactivo
          </span>
        )}

      </td>

      <td className="px-6 py-4">

        <div className="flex justify-end gap-3">

          <button className="text-slate-500 hover:text-slate-700">
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onToggle(user.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash size={18} />
          </button>

        </div>

      </td>

    </tr>
  );
};

export default UserRow;
import React from "react";
import UserRow from "./UserRow";

const UserTable = ({ users, onToggle }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

      <table className="w-full text-left">

        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-6 py-4">Usuario</th>
            <th className="px-6 py-4">Rol</th>
            <th className="px-6 py-4">Estado</th>
            <th className="px-6 py-4 text-right">Acciones</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onToggle={onToggle}
              
            />
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default UserTable;
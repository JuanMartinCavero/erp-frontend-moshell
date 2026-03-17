import React, { useState } from "react";
import UserTable from "../components/UserTable";
import UserFormModal from "../components/UserFormModal";
import UserStats from "../components/UsersStats";
import { useUsers } from "../../../hooks/useUsers";

const UsersPage = () => {

  const { users, addUser, toggleUserStatus } = useUsers();

  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-2xl font-bold text-slate-700">
            Gestión de Usuarios
          </h1>

          <p className="text-sm text-slate-500">
            Administra los usuarios del sistema
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Nuevo Usuario
        </button>

      </div>

      {/* Stats */}
      <UserStats users={users} />

      {/* Tabla */}
      <UserTable
        users={users}
        onToggle={toggleUserStatus}
      />

      {/* Modal */}
      <UserFormModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={addUser}
      />

    </div>
  );
};

export default UsersPage;
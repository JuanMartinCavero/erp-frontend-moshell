import React from "react";
import ClientRow from "../components/ClientRow";

const ClientsTable = ({ clientes, loading, onDelete, onActivate, onEdit }) => {
  if (loading) return <p>Cargando...</p>;
  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-100 text-xs uppercase">
          <tr>
            <th className="p-4">Nombre</th>
            <th className="p-4">Identificación</th>
            <th className="p-4">País</th>
            <th className="p-4">Estado</th>
            <th className="p-4">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {clientes?.map((cliente) => (
            <ClientRow
              key={cliente.id}
              cliente={cliente}
              onDelete={onDelete}
              onActivate={onActivate}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsTable;

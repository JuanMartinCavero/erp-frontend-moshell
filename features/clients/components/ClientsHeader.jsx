import React from "react";

const ClientsHeader = ({onNew}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-black">Clientes</h2>
        <p className="text-slate-500">Gestión de clientes</p>
      </div>

      <button 
      onClick={onNew}
      className="bg-primary text-white px-6 py-3 rounded-xl font-bold">
        + Nuevo Cliente
      </button>
    </div>
  );
};

export default ClientsHeader;

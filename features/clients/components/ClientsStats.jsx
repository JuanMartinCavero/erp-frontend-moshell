import React from "react";

const ClientsStats = ({
  total,
  activos,
  inactivos,
  internacionales,
  nacionales,
}) => {
  return (
    <div className="grid grid-cols-5 gap-6">
      <div className="p-6 bg-white rounded-xl">
        <p>Total Clientes</p>
        <h3 className="text-2xl font-bold">{total}</h3>
      </div>

      <div className="p-6 bg-white rounded-xl">
        <p>Activos</p>
        <h3 className="text-2xl font-bold">{activos}</h3>
      </div>

      <div className="p-6 bg-white rounded-xl">
        <p>Inactivos</p>
        <h3 className="text-2xl font-bold">{inactivos}</h3>
      </div>

      <div className="p-6 bg-white rounded-xl">
        <p>Internacionales</p>
        <h3 className="text-2xl font-bold">{internacionales}</h3>
      </div>

      <div className="p-6 bg-white rounded-xl">
        <p>Nacionales</p>
        <h3 className="text-2xl font-bold">{nacionales}</h3>
      </div>
    </div>
  );
};

export default ClientsStats;

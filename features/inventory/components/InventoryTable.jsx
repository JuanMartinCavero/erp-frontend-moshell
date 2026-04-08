import React from "react";

export function InventoryTable({ data }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                FECHA
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                DOCUMENTO
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                MATERIAL
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                ENTRADA
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                SALIDA
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                SALDO
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data.map((row) => (
              <tr key={row.id}>
                <td className="px-4 py-4">{row.fecha}</td>
                <td className="px-4 py-4">{row.documento}</td>
                <td className="px-4 py-4">{row.material}</td>
                <td className="px-4 py-4 text-green-600">{row.entrada}</td>
                <td className="px-4 py-4 text-red-600">{row.salida}</td>
                <td className="px-4 py-4 font-semibold">{row.saldo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

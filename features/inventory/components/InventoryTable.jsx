import React from "react";

export function InventoryTable({ data = [] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">CÓDIGO</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">TIPO</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">COLOR</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">CALIDAD</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">STOCK ACTUAL</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">UBICACIÓN</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data?.length > 0 ? (
              data.map((material) => (
                <tr key={material.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 text-sm font-mono bg-gray-100 rounded">{material.codigo}</td>
                  <td className="px-4 py-4 text-sm">{material.tipo}</td>
                  <td className="px-4 py-4 text-sm">{material.color}</td>
                  <td className="px-4 py-4 text-sm">{material.calidad}</td>
                  <td className="px-4 py-4 text-sm font-bold">{material.inventario?.stock_actual || 0}</td>
                  <td className="px-4 py-4 text-sm">{material.inventario?.ubicacion || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-10 text-center text-gray-400">
                  No hay materiales en inventario.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
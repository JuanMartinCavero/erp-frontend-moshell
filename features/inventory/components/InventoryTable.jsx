import React from "react";

// MODIFICADO: Soporta dos tipos de datos: materiales o kardex
export function InventoryTable({ data = [], tipo = "materiales" }) {
  
  // AGREGADO: Si es tipo kardex, mostrar tabla de movimientos
  if (tipo === "kardex") {
    if (data.length === 0) {
      return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center text-gray-500">
          No hay movimientos registrados para este material
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">FECHA</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">LOTE</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">CALIDAD</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">COLOR</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">TÍTULO</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">CONOS</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">ENTRADA</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">SALIDA</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">MERMA</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">PRECIO</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">VALOR TOTAL</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">SALDO</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{row.fecha}</td>
                  <td className="px-4 py-3 text-sm font-mono">{row.lote}</td>
                  <td className="px-4 py-3 text-sm">{row.calidad}</td>
                  <td className="px-4 py-3 text-sm">{row.color}</td>
                  <td className="px-4 py-3 text-sm">{row.titulo || '-'}</td>
                  <td className="px-4 py-3 text-sm text-center">{row.cantidad_conos}</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-medium">
                    {row.entrada_cantidad > 0 ? row.entrada_cantidad : '-'}
                  </td>
                  <td className="px-4 py-3 text-sm text-red-600 font-medium">
                    {row.salida_cantidad > 0 ? row.salida_cantidad : '-'}
                  </td>
                  <td className="px-4 py-3 text-sm text-orange-600">
                    {row.merma_cantidad > 0 ? `${row.merma_cantidad} (${row.merma_porcentaje}%)` : '-'}
                  </td>
                  <td className="px-4 py-3 text-sm">S/ {row.precio_unitario?.toFixed(2) || '0.00'}</td>
                  <td className="px-4 py-3 text-sm font-semibold">S/ {row.valor_total?.toFixed(2) || '0.00'}</td>
                  <td className="px-4 py-3 text-sm font-bold">{row.existencia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // AGREGADO: Si es tipo materiales, mostrar lista de materiales
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
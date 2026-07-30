import React from "react";

export function InventoryTable({ 
  data = [], 
  tipo = "materiales",
  selectedMaterials = [],
  onToggleSelect,
  onToggleSelectAll,
  showCheckboxes = false,
  resumen = null
}) {
  
  const formatCurrency = (value) => {
    const num = Number(value);
    return isNaN(num) ? '0.00' : num.toFixed(2);
  };

  // ============================================
  // TABLA DE KARDEX (un solo material)
  // ============================================
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
              {data.map((row, idx) => {
                const precioUnitario = Number(row.precio_unitario) || 0;
                const valorTotal = Number(row.valor_total) || 0;
                const entradaCantidad = Number(row.entrada_cantidad) || 0;
                const salidaCantidad = Number(row.salida_cantidad) || 0;
                const mermaCantidad = Number(row.merma_cantidad) || 0;
                const mermaPorcentaje = Number(row.merma_porcentaje) || 0;
                const cantidadConos = Number(row.cantidad_conos) || 0;
                const existencia = Number(row.existencia) || 0;

                return (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{row.fecha}</td>
                    <td className="px-4 py-3 text-sm font-mono">{row.lote}</td>
                    <td className="px-4 py-3 text-sm">{row.calidad}</td>
                    <td className="px-4 py-3 text-sm">{row.color}</td>
                    <td className="px-4 py-3 text-sm">{row.titulo || '-'}</td>
                    <td className="px-4 py-3 text-sm text-center">{cantidadConos}</td>
                    <td className="px-4 py-3 text-sm text-green-600 font-medium">
                      {entradaCantidad > 0 ? entradaCantidad : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-red-600 font-medium">
                      {salidaCantidad > 0 ? salidaCantidad : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-orange-600">
                      {mermaCantidad > 0 ? `${mermaCantidad} (${mermaPorcentaje}%)` : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm">S/ {precioUnitario.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm font-semibold">S/ {valorTotal.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm font-bold">{existencia}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

// ============================================
// TABLA DE MATERIALES (vista general)
// ============================================
const allSelected = data.length > 0 && data.every(item => selectedMaterials.includes(item.id));
const totalValorGeneral = resumen?.total_valor || 0;

return (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {showCheckboxes && (
              <th className="px-4 py-3 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => onToggleSelectAll?.(e.target.checked)}
                  className="w-4 h-4"
                />
              </th>
            )}
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">CÓDIGO</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">TIPO</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">COLOR</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">CALIDAD</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">STOCK ACTUAL</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">UBICACIÓN</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">CANTIDAD</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">PESO (KG)</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">VALOR UNIT.</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">VALOR TOTAL</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">% DEL TOTAL</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data?.length > 0 ? (
            data.map((item) => {
              const isSelected = selectedMaterials.includes(item.id);
              
              // ✅ DATOS DEL INVENTARIO
              const inventario = item.inventario || {};
              const stock = Number(inventario.stock_actual) || 0;
              const ubicacion = inventario.ubicacion || '-';

// ✅ DATOS DEL MOVIMIENTO
const movimientos = item.movimientos || [];
const ultimoMovimiento = movimientos.length > 0 ? movimientos[0] : {};
const cantidad = Number(ultimoMovimiento.cantidad) || stock;
const valorUnitario = Number(ultimoMovimiento.valor_unitario) || 0;

// ✅ PESO: usar el peso del movimiento (ya está en la BD)
const pesoKg = Number(ultimoMovimiento.peso_kg) || 0;
              
              const valorTotal = stock * valorUnitario;
              const porcentaje = totalValorGeneral > 0 
                ? ((valorTotal / totalValorGeneral) * 100).toFixed(2)
                : '0.00';
              
              return (
                <tr key={item.id} className={`hover:bg-gray-50 transition-colors ${isSelected ? 'bg-blue-50' : ''}`}>
                  {showCheckboxes && (
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelect?.(item.id)}
                        className="w-4 h-4"
                      />
                    </td>
                  )}
                  <td className="px-4 py-3 text-sm font-mono font-medium">{item.codigo}</td>
                  <td className="px-4 py-3 text-sm">{item.tipo || '-'}</td>
                  <td className="px-4 py-3 text-sm">
                    {item.color && (
                      <span className="inline-flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color || '#ccc' }}></span>
                        {item.color}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">{item.calidad || '-'}</td>
                  <td className="px-4 py-3 text-sm text-right font-bold">{stock}</td>
                  <td className="px-4 py-3 text-sm">{ubicacion}</td>
                  <td className="px-4 py-3 text-sm text-right">{cantidad}</td>
                  <td className="px-4 py-3 text-sm text-right">{pesoKg.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-right">S/ {valorUnitario.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-right font-semibold">S/ {valorTotal.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-right">{porcentaje}%</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={showCheckboxes ? 12 : 11} className="px-4 py-10 text-center text-gray-400">
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
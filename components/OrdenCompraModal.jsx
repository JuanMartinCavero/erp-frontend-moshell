// AGREGADO: Modal para crear orden de compra
import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import axiosClient from "../services/axiosClient";

export function OrdenCompraModal({ onClose, onSuccess }) {
  const [orden, setOrden] = useState({
    proveedor_nombre: "",
    proveedor_ruc: "",
    proveedor_contacto: "",
    proveedor_celular: "",
    fecha_orden: new Date().toISOString().split('T')[0],
    fecha_entrega: "",
    moneda: "PEN",
    observaciones: "",
    detalles: []
  });

  const [detalleActual, setDetalleActual] = useState({
    calidad: "",
    titulo: "",
    color: "",
    cantidad_conos: 1,
    precio_unitario: 0
  });

  const agregarDetalle = () => {
    if (!detalleActual.calidad || !detalleActual.titulo) {
      alert("Complete calidad y título");
      return;
    }
    
    setOrden({
      ...orden,
      detalles: [...orden.detalles, { ...detalleActual }]
    });
    
    setDetalleActual({
      calidad: "",
      titulo: "",
      color: "",
      cantidad_conos: 1,
      precio_unitario: 0
    });
  };

  const eliminarDetalle = (index) => {
    const nuevosDetalles = orden.detalles.filter((_, i) => i !== index);
    setOrden({ ...orden, detalles: nuevosDetalles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (orden.detalles.length === 0) {
      alert("Agregue al menos un detalle");
      return;
    }
    
    if (!orden.proveedor_nombre) {
      alert("Ingrese el nombre del proveedor");
      return;
    }
    
    try {
      const response = await axiosClient.post("/ordenes-compra", orden);
      alert("Orden creada exitosamente: " + response.data.orden.orden_id);
      if (onSuccess) onSuccess(response.data.orden);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error al crear orden: " + (error.response?.data?.message || error.message));
    }
  };

  const calcularTotal = () => {
    const subtotal = orden.detalles.reduce((sum, d) => sum + (d.cantidad_conos * d.precio_unitario), 0);
    const igv = subtotal * 0.18;
    return { subtotal, igv, total: subtotal + igv };
  };

  const { subtotal, igv, total } = calcularTotal();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Nueva Orden de Compra</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {/* Datos del Proveedor */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Datos del Proveedor</h3>
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium mb-1">Razón Social *</label>
                <input
                  type="text"
                  value={orden.proveedor_nombre}
                  onChange={(e) => setOrden({...orden, proveedor_nombre: e.target.value})}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">RUC</label>
                <input
                  type="text"
                  value={orden.proveedor_ruc}
                  onChange={(e) => setOrden({...orden, proveedor_ruc: e.target.value})}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contacto</label>
                <input
                  type="text"
                  value={orden.proveedor_contacto}
                  onChange={(e) => setOrden({...orden, proveedor_contacto: e.target.value})}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Celular</label>
                <input
                  type="text"
                  value={orden.proveedor_celular}
                  onChange={(e) => setOrden({...orden, proveedor_celular: e.target.value})}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
            </div>
          </div>
          
          {/* Detalle de Insumos */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Detalle de Insumos</h3>
            
            <div className="grid grid-cols-5 gap-2 mb-4 p-3 bg-gray-100 rounded">
              <input
                type="text"
                placeholder="Calidad"
                value={detalleActual.calidad}
                onChange={(e) => setDetalleActual({...detalleActual, calidad: e.target.value})}
                className="border px-2 py-1 rounded text-sm"
              />
              <input
                type="text"
                placeholder="Título"
                value={detalleActual.titulo}
                onChange={(e) => setDetalleActual({...detalleActual, titulo: e.target.value})}
                className="border px-2 py-1 rounded text-sm"
              />
              <input
                type="text"
                placeholder="Color"
                value={detalleActual.color}
                onChange={(e) => setDetalleActual({...detalleActual, color: e.target.value})}
                className="border px-2 py-1 rounded text-sm"
              />
              <input
                type="number"
                placeholder="Conos"
                value={detalleActual.cantidad_conos}
                onChange={(e) => setDetalleActual({...detalleActual, cantidad_conos: parseInt(e.target.value)})}
                className="border px-2 py-1 rounded text-sm"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Precio"
                value={detalleActual.precio_unitario}
                onChange={(e) => setDetalleActual({...detalleActual, precio_unitario: parseFloat(e.target.value)})}
                className="border px-2 py-1 rounded text-sm"
              />
            </div>
            
            <button
              type="button"
              onClick={agregarDetalle}
              className="bg-green-600 text-white px-4 py-2 rounded text-sm flex items-center gap-2 mb-3"
            >
              <Plus size={16} /> Agregar Ítem
            </button>
            
            {/* Tabla de detalles */}
            {orden.detalles.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 border text-left">Calidad</th>
                      <th className="p-2 border text-left">Título</th>
                      <th className="p-2 border text-left">Color</th>
                      <th className="p-2 border text-right">Conos</th>
                      <th className="p-2 border text-right">Precio</th>
                      <th className="p-2 border text-right">Total</th>
                      <th className="p-2 border">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orden.detalles.map((detalle, idx) => (
                      <tr key={idx}>
                        <td className="p-2 border">{detalle.calidad}</td>
                        <td className="p-2 border">{detalle.titulo}</td>
                        <td className="p-2 border">{detalle.color}</td>
                        <td className="p-2 border text-right">{detalle.cantidad_conos}</td>
                        <td className="p-2 border text-right">S/ {detalle.precio_unitario.toFixed(2)}</td>
                        <td className="p-2 border text-right font-semibold">S/ {(detalle.cantidad_conos * detalle.precio_unitario).toFixed(2)}</td>
                        <td className="p-2 border text-center">
                          <button type="button" onClick={() => eliminarDetalle(idx)} className="text-red-600">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan="5" className="p-2 text-right font-bold">SUBTOTAL:</td>
                      <td className="p-2 text-right font-bold">S/ {subtotal.toFixed(2)}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colSpan="5" className="p-2 text-right font-bold">IGV (18%):</td>
                      <td className="p-2 text-right font-bold">S/ {igv.toFixed(2)}</td>
                      <td></td>
                    </tr>
                    <tr className="bg-yellow-50">
                      <td colSpan="5" className="p-2 text-right font-bold text-lg">TOTAL:</td>
                      <td className="p-2 text-right font-bold text-lg">S/ {total.toFixed(2)}</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
          
          {/* Observaciones */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Observaciones</label>
            <textarea
              value={orden.observaciones}
              onChange={(e) => setOrden({...orden, observaciones: e.target.value})}
              className="w-full border px-3 py-2 rounded"
              rows="2"
            />
          </div>
          
          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Guardar Orden
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
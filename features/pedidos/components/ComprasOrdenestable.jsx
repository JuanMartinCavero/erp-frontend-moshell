// MODIFICADO: Tabla dinámica con datos del backend
import React from "react";
import axiosClient from "../../../services/axiosClient";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OrdenCompraPDF from "../../../src/components/PDF/OrdenCompraPDF";
const ESTADO_STYLES = {
  pendiente: "bg-amber-100 text-amber-700",
  aprobada: "bg-blue-100 text-blue-700",
  recibida: "bg-green-100 text-green-700",
  anulada: "bg-gray-100 text-gray-500",
};

export function OrdenesTable({ ordenes = [], loading = false, onRefresh }) {
  // AGREGADO: Actualizar estado de una orden
  const handleUpdateEstado = async (id, nuevoEstado) => {
    try {
      await axiosClient.patch(`/ordenes-compra/${id}/estado`, {
        estado: nuevoEstado,
      });
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Error actualizando estado:", error);
      alert("Error al actualizar estado");
    }
  };

  // AGREGADO: Función segura para formatear montos
  const formatearMonto = (monto) => {
    if (!monto && monto !== 0) return "0.00";
    const numero = typeof monto === "string" ? parseFloat(monto) : monto;
    return isNaN(numero) ? "0.00" : numero.toFixed(2);
  };

  if (loading) {
    return (
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-8 text-center">
        Cargando órdenes...
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-900">
          Órdenes de Compra Recientes
        </h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Ver todas
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-semibold tracking-wider">
            <tr>
              <th className="px-6 py-3">ID Orden</th>
              <th className="px-6 py-3">Proveedor</th>
              <th className="px-6 py-3">Insumos</th>
              <th className="px-6 py-3">Monto Total</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3">Entrega Est.</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {ordenes.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-400">
                  No hay órdenes de compra registradas
                </td>
              </tr>
            ) : (
              ordenes.map((orden) => {
                // Calcular total de forma segura
                let montoTotal = 0;
                if (orden.detalles && Array.isArray(orden.detalles)) {
                  montoTotal = orden.detalles.reduce((sum, d) => {
                    const total =
                      d.total || d.cantidad_conos * d.precio_unitario;
                    const numTotal =
                      typeof total === "string" ? parseFloat(total) : total;
                    return sum + (isNaN(numTotal) ? 0 : numTotal);
                  }, 0);
                }

                return (
                  <tr
                    key={orden.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-blue-600 font-medium text-xs">
                      {orden.orden_id}
                    </td>
                    <td className="px-6 py-4 text-gray-800 font-medium">
                      {orden.proveedor_nombre || orden.proveedor?.nombre || "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {orden.detalles?.map((d) => d.titulo).join(", ") || "-"}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {orden.moneda || "PEN"} {formatearMonto(montoTotal)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ESTADO_STYLES[orden.estado] || "bg-gray-100"}`}
                      >
                        {orden.estado || "pendiente"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {orden.fecha_entrega || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={orden.estado || "pendiente"}
                        onChange={(e) =>
                          handleUpdateEstado(orden.id, e.target.value)
                        }
                        className="text-xs border rounded px-2 py-1"
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="aprobada">Aprobada</option>
                        <option value="recibida">Recibida</option>
                        <option value="anulada">Anulada</option>
                      </select>
                    </td>
                    <td>
                      <PDFDownloadLink
                        document={<OrdenCompraPDF orden={orden} />}
                        fileName={`orden-compra-${orden.orden_id}.pdf`}
                      >
                        {({ blob, url, loading, error }) => (
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Descargar
                          </button>
                        )}
                      </PDFDownloadLink>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

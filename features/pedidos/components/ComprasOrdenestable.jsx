// MODIFICADO: Tabla dinámica con datos del backend e íconos
import React, { useState } from "react";
import axiosClient from "../../../services/axiosClient";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OrdenCompraPDF from "../../../src/components/PDF/OrdenCompraPDF";

const ESTADO_STYLES = {
  pendiente: "bg-amber-100 text-amber-700",
  aprobada: "bg-blue-100 text-blue-700",
  recibida: "bg-green-100 text-green-700",
  anulada: "bg-gray-100 text-gray-500",
};

const TRANSICIONES_ESTADO = {
  pendiente: ["aprobada", "anulada"],
  aprobada: ["recibida"],
  recibida: [],
  anulada: [],
};

export function OrdenesTable({ ordenes = [], loading = false, onRefresh }) {
  // Estados para modales
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOrden, setSelectedOrden] = useState(null);
  const [editOrden, setEditOrden] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

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

  // Ver orden
  const handleViewOrden = (orden) => {
    setSelectedOrden(orden);
    setShowViewModal(true);
  };

  // Editar orden
  const handleEditOrden = (orden) => {
    setEditOrden(JSON.parse(JSON.stringify(orden)));
    setShowEditModal(true);
  };

  // Guardar cambios de edición
  const handleSaveEdit = async () => {
    if (!editOrden) return;
    setEditLoading(true);
    try {
      await axiosClient.put(`/ordenes-compra/${editOrden.id}`, editOrden);
      alert("Orden actualizada exitosamente");
      setShowEditModal(false);
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Error actualizando orden:", error);
      alert("Error al actualizar la orden");
    } finally {
      setEditLoading(false);
    }
  };

  // Actualizar campo en edición
  const handleEditChange = (field, value) => {
    setEditOrden({ ...editOrden, [field]: value });
  };

  // Actualizar detalle en edición
  const handleEditDetalleChange = (index, field, value) => {
    const nuevosDetalles = [...editOrden.detalles];
    nuevosDetalles[index][field] = value;
    setEditOrden({ ...editOrden, detalles: nuevosDetalles });
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
    <>
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
                <th className="px-6 py-3">Cambiar Estado</th>
                <th className="px-6 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {ordenes.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-8 text-center text-gray-400"
                  >
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
                        {orden.proveedor_razon_social ||
                          orden.proveedor?.razon_social ||
                          "-"}{" "}
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
                          disabled={!TRANSICIONES_ESTADO[orden.estado]?.length}
                          className={`text-xs border rounded px-2 py-1 ${
                            !TRANSICIONES_ESTADO[orden.estado]?.length
                              ? "bg-gray-100 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <option value={orden.estado}>{orden.estado}</option>

                          {TRANSICIONES_ESTADO[orden.estado]?.map((estado) => (
                            <option key={estado} value={estado}>
                              {estado}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          {/* Botón Ver (Ojo) */}
                          <button
                            onClick={() => handleViewOrden(orden)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title="Ver orden"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>

                          {/* Botón Editar (Lápiz) */}
                          {orden.estado === "pendiente" && (
                            <button
                              onClick={() => handleEditOrden(orden)}
                              className="text-green-600 hover:text-green-800 transition-colors"
                              title="Editar orden"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </button>
                          )}

                          {/* Botón Descargar PDF (Flecha) */}
                          <PDFDownloadLink
                            document={<OrdenCompraPDF orden={orden} />}
                            fileName={`orden-compra-${orden.orden_id}.pdf`}
                          >
                            {({ loading }) => (
                              <button
                                className="text-red-600 hover:text-red-800 transition-colors"
                                title="Descargar PDF"
                                disabled={loading}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                  />
                                </svg>
                              </button>
                            )}
                          </PDFDownloadLink>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL PARA VER ORDEN */}
      {showViewModal && selectedOrden && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Detalle de Orden</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p>
                  <strong>ID Orden:</strong> {selectedOrden.orden_id}
                </p>
                <p>
                  <strong>Fecha:</strong> {selectedOrden.fecha_orden}
                </p>
                <p>
                  <strong>Proveedor:</strong>{" "}
                  {selectedOrden.proveedor_razon_social ||
                    selectedOrden.proveedor?.razon_social ||
                    "-"}
                </p>
                <p>
                  <strong>RUC:</strong>{" "}
                  {selectedOrden.proveedor_ruc ||
                    selectedOrden.proveedor?.ruc ||
                    "-"}
                </p>
                <p>
                  <strong>Contacto:</strong>{" "}
                  {selectedOrden.proveedor_contacto || "-"}
                </p>
                <p>
                  <strong>Estado:</strong> {selectedOrden.estado}
                </p>
              </div>

              <h3 className="font-semibold mb-3">Detalle de Insumos</h3>
              <table className="w-full border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">Calidad</th>
                    <th className="p-2 border">Título</th>
                    <th className="p-2 border">Color</th>
                    <th className="p-2 border text-right">Conos</th>
                    <th className="p-2 border text-right">Precio</th>
                    <th className="p-2 border text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrden.detalles?.map((detalle, idx) => {
                    const precioNumero =
                      typeof detalle.precio_unitario === "string"
                        ? parseFloat(detalle.precio_unitario)
                        : detalle.precio_unitario;
                    const cantidadNumero =
                      typeof detalle.cantidad_conos === "string"
                        ? parseFloat(detalle.cantidad_conos)
                        : detalle.cantidad_conos;
                    const total = cantidadNumero * precioNumero;
                    return (
                      <tr key={idx}>
                        <td className="p-2 border">{detalle.calidad}</td>
                        <td className="p-2 border">{detalle.titulo}</td>
                        <td className="p-2 border">{detalle.color}</td>
                        <td className="p-2 border text-right">
                          {cantidadNumero}
                        </td>
                        <td className="p-2 border text-right">
                          S/ {precioNumero.toFixed(2)}
                        </td>
                        <td className="p-2 border text-right font-semibold">
                          S/ {total.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="flex justify-end gap-4 mt-4">
                <PDFDownloadLink
                  document={<OrdenCompraPDF orden={selectedOrden} />}
                  fileName={`orden-compra-${selectedOrden.orden_id}.pdf`}
                >
                  {({ loading }) => (
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      {loading ? "Generando..." : "Exportar PDF"}
                    </button>
                  )}
                </PDFDownloadLink>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PARA EDITAR ORDEN */}
      {showEditModal && editOrden && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">
                Editar Orden: {editOrden.orden_id}
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Datos del Proveedor</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Razón Social: {editOrden.proveedor.razon_social}
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      RUC: {editOrden.proveedor.ruc}
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Contacto: {editOrden.proveedor.contacto}
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Celular: {editOrden.proveedor.telefono}
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Fecha Entrega
                    </label>
                    <input
                      type="date"
                      value={editOrden.fecha_entrega || ""}
                      onChange={(e) =>
                        handleEditChange("fecha_entrega", e.target.value)
                      }
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Estado {editOrden.estado}
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3">Detalle de Insumos</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2 border">Calidad</th>
                        <th className="p-2 border">Título</th>
                        <th className="p-2 border">Color</th>
                        <th className="p-2 border ">Conos (und)</th>
                        <th className="p-2 border ">Peso Neto</th>
                        <th className="p-2 border ">Precio Unitario</th>
                      </tr>
                    </thead>
                    <tbody>
                      {editOrden.detalles?.map((detalle, idx) => (
                        console.log(detalle),
                        <tr key={idx}>
                          <td className="p-2 border">
                            <input
                              type="text"
                              value={detalle.calidad}
                              onChange={(e) =>
                                handleEditDetalleChange(
                                  idx,
                                  "calidad",
                                  e.target.value,
                                )
                              }
                              className="w-full border rounded px-2 py-1 text-sm"
                            />
                          </td>
                          <td className="p-2 border">
                            <input
                              type="text"
                              value={detalle.titulo}
                              onChange={(e) =>
                                handleEditDetalleChange(
                                  idx,
                                  "titulo",
                                  e.target.value,
                                )
                              }
                              className="w-full border rounded px-2 py-1 text-sm"
                            />
                          </td>
                          <td className="p-2 border">
                            <input
                              type="text"
                              value={detalle.color}
                              onChange={(e) =>
                                handleEditDetalleChange(
                                  idx,
                                  "color",
                                  e.target.value,
                                )
                              }
                              className="w-full border rounded px-2 py-1 text-sm"
                            />
                          </td>
                          <td className="p-2 border">
                            <input
                              type="number"
                              value={detalle.cantidad_conos}
                              onChange={(e) =>
                                handleEditDetalleChange(
                                  idx,
                                  "cantidad_conos",
                                  parseInt(e.target.value),
                                )
                              }
                              className="w-full border rounded px-2 py-1 text-sm text-right"
                            />
                          </td>
                          <td className="p-2 border">
                            <input
                              type="number"
                              step="0.01"
                              value={detalle.peso_por_cono || ""}
                              onChange={(e) =>
                                handleEditDetalleChange(
                                  idx,
                                  "peso_por_cono",
                                  parseFloat(e.target.value),
                                )
                              }
                              className="w-full border rounded px-2 py-1 text-sm text-right"
                            />
                          </td>
                          <td className="p-2 border">
                            <input
                              type="number"
                              step="0.01"
                              value={detalle.precio_unitario}
                              onChange={(e) =>
                                handleEditDetalleChange(
                                  idx,
                                  "precio_unitario",
                                  parseFloat(e.target.value),
                                )
                              }
                              className="w-full border rounded px-2 py-1 text-sm text-right"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={editLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {editLoading ? "Guardando..." : "Guardar Cambios"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

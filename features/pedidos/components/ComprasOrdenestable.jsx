import React, { useState } from "react";
import axiosClient from "../../../services/axiosClient";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OrdenCompraPDF from "../../../src/components/PDF/OrdenCompraPDF";

const ESTADO_STYLES = {
  pendiente: "bg-amber-50 text-amber-700 border border-amber-200",
  aprobada: "bg-sky-50 text-sky-700 border border-sky-200",
  recibida: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  anulada: "bg-slate-100 text-slate-500 border border-slate-200",
};

const TRANSICIONES_ESTADO = {
  pendiente: ["aprobada", "anulada"],
  aprobada: ["recibida"],
  recibida: [],
  anulada: [],
};

export function OrdenesTable({
  ordenes = [],
  estados = [],
  loading = false,
  onBuscar,
  onRefresh,
}) {
  // Estados para modales
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOrden, setSelectedOrden] = useState(null);
  const [editOrden, setEditOrden] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  const [estado, setEstado] = useState("");
  const [fecha, setFecha] = useState("");

  // Función para formatear fechas
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const cleanDate = dateString.split("T")[0];
    const [year, month, day] = cleanDate.split("-");
    if (!year || !month || !day) return cleanDate;
    return `${day}/${month}/${year}`;
  };

  const buscar = () => {
    onBuscar({
      estado,
      fecha,
    });
  };

  // Actualizar estado de una orden
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

  // Función segura para formatear montos
  const formatearMonto = (monto) => {
    if (!monto && monto !== 0) return "0.00";
    const numero = typeof monto === "string" ? parseFloat(monto) : monto;
    return isNaN(numero) ? "0.00" : numero.toFixed(2);
  };

  if (loading) {
    return (
      <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-12 text-center text-slate-400">
        <div className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <span>Cargando órdenes de compra...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 lg:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-50/50">
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Estado
              </label>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
              >
                <option value="">Todos los estados</option>
                {estados.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Fecha
              </label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <button
              onClick={buscar}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 shadow-sm shadow-blue-500/20 transition-all"
            >
              Filtrar
            </button>
          </div>

          <h2 className="text-base font-bold text-slate-800">
            Órdenes de Compra
          </h2>
        </div>

        {/* TABLA */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-100 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <th className="py-4 px-6">ID Orden</th>
                <th className="py-4 px-6">Proveedor</th>
                <th className="py-4 px-6">Insumos</th>
                <th className="py-4 px-6">Monto Total</th>
                <th className="py-4 px-6">Estado</th>
                <th className="py-4 px-6">Entrega Est.</th>
                <th className="py-4 px-6">Cambiar Estado</th>
                <th className="py-4 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {ordenes.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-12 text-slate-400">
                    No hay órdenes de compra registradas.
                  </td>
                </tr>
              ) : (
                ordenes.map((orden) => {
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
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      <td className="py-4 px-6 font-mono font-medium text-blue-600 text-xs">
                        {orden.orden_id}
                      </td>
                      <td className="py-4 px-6 font-semibold text-slate-800">
                        {orden.proveedor_razon_social ||
                          orden.proveedor?.razon_social ||
                          "-"}
                      </td>
                      <td className="py-4 px-6 text-slate-500 max-w-xs truncate">
                        {orden.detalles?.map((d) => d.titulo).join(", ") || "-"}
                      </td>
                      <td className="py-4 px-6 font-semibold text-slate-800">
                        {orden.moneda || "PEN"} {formatearMonto(montoTotal)}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                            ESTADO_STYLES[orden.estado] ||
                            "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}
                        >
                          {orden.estado || "pendiente"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs font-medium text-slate-500">
                        {formatDate(orden.fecha_entrega)}
                      </td>
                      <td className="py-4 px-6">
                        <select
                          value={orden.estado || "pendiente"}
                          onChange={(e) =>
                            handleUpdateEstado(orden.id, e.target.value)
                          }
                          disabled={!TRANSICIONES_ESTADO[orden.estado]?.length}
                          className={`text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer ${
                            !TRANSICIONES_ESTADO[orden.estado]?.length
                              ? "bg-slate-100 cursor-not-allowed opacity-60"
                              : ""
                          }`}
                        >
                          <option value={orden.estado}>{orden.estado}</option>
                          {TRANSICIONES_ESTADO[orden.estado]?.map((est) => (
                            <option key={est} value={est}>
                              {est}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {/* Botón Ver (Ojo) */}
                          <button
                            onClick={() => handleViewOrden(orden)}
                            className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                            title="Ver detalle"
                          >
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
                              className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
                              title="Editar orden"
                            >
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
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </button>
                          )}

                          {/* Botón Descargar PDF */}
                          <PDFDownloadLink
                            document={<OrdenCompraPDF orden={orden} />}
                            fileName={`orden-compra-${orden.orden_id}.pdf`}
                          >
                            {({ loading }) => (
                              <button
                                className="p-1.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors disabled:opacity-50"
                                title="Descargar PDF"
                                disabled={loading}
                              >
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
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-800">
                Detalle de Orden{" "}
                <span className="text-blue-600 font-mono">
                  #{selectedOrden.orden_id}
                </span>
              </h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="w-8 h-8 rounded-full bg-slate-200/60 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100 text-sm">
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                    Fecha de Orden
                  </p>
                  <p className="font-medium text-slate-700 mt-0.5">
                    {formatDate(selectedOrden.fecha_orden)}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                    Estado Actual
                  </p>
                  <p className="font-medium text-slate-700 mt-0.5 capitalize">
                    {selectedOrden.estado}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                    Proveedor
                  </p>
                  <p className="font-medium text-slate-700 mt-0.5">
                    {selectedOrden.proveedor_razon_social ||
                      selectedOrden.proveedor?.razon_social ||
                      "-"}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                    RUC
                  </p>
                  <p className="font-medium text-slate-700 mt-0.5">
                    {selectedOrden.proveedor_ruc ||
                      selectedOrden.proveedor?.ruc ||
                      "-"}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                    Contacto
                  </p>
                  <p className="font-medium text-slate-700 mt-0.5">
                    {selectedOrden.proveedor_contacto || "-"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Detalle de Insumos
                </h3>
                <div className="overflow-x-auto rounded-xl border border-slate-100">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                      <tr>
                        <th className="p-3 border-b">Calidad</th>
                        <th className="p-3 border-b">Título</th>
                        <th className="p-3 border-b">Color</th>
                        <th className="p-3 border-b text-right">Conos</th>
                        <th className="p-3 border-b text-right">Kg</th>
                        <th className="p-3 border-b text-right">Precio</th>
                        <th className="p-3 border-b text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      {selectedOrden.detalles?.map((detalle, idx) => {
                        const precioNumero =
                          parseFloat(detalle.precio_unitario) || 0;
                        const cantidadNumero =
                          parseFloat(detalle.cantidad_conos) || 0;
                        const total = cantidadNumero * precioNumero;
                        return (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="p-3">{detalle.calidad}</td>
                            <td className="p-3">{detalle.titulo}</td>
                            <td className="p-3">{detalle.color}</td>
                            <td className="p-3 text-right">{cantidadNumero}</td>
                            <td className="p-3 text-right">
                              {detalle.peso_por_cono || "-"}
                            </td>
                            <td className="p-3 text-right">
                              S/ {precioNumero.toFixed(2)}
                            </td>
                            <td className="p-3 text-right font-semibold text-slate-800">
                              S/ {total.toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
              <PDFDownloadLink
                document={<OrdenCompraPDF orden={selectedOrden} />}
                fileName={`orden-compra-${selectedOrden.orden_id}.pdf`}
              >
                {({ loading }) => (
                  <button className="px-4 py-2.5 bg-rose-600 text-white text-sm font-medium rounded-xl hover:bg-rose-700 shadow-sm transition-all flex items-center gap-2">
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
                className="px-4 py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-100 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PARA EDITAR ORDEN */}
      {showEditModal && editOrden && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-800">
                Editar Orden:{" "}
                <span className="text-blue-600 font-mono">
                  #{editOrden.orden_id}
                </span>
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="w-8 h-8 rounded-full bg-slate-200/60 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Datos del Proveedor & Entrega
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100 text-sm">
                  <div>
                    <span className="text-slate-400 text-xs block font-medium">
                      Razón Social
                    </span>
                    <strong className="text-slate-700">
                      {editOrden.proveedor?.razon_social || "-"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block font-medium">
                      RUC
                    </span>
                    <strong className="text-slate-700">
                      {editOrden.proveedor?.ruc || "-"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block font-medium">
                      Contacto / Teléfono
                    </span>
                    <strong className="text-slate-700">
                      {editOrden.proveedor?.contacto || "-"} (
                      {editOrden.proveedor?.telefono || "-"})
                    </strong>
                  </div>
                  <div className="sm:col-span-3 mt-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                      Fecha Entrega Estimada
                    </label>
                    <input
                      type="date"
                      value={
                        editOrden.fecha_entrega
                          ? editOrden.fecha_entrega.split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        handleEditChange("fecha_entrega", e.target.value)
                      }
                      className="w-full sm:w-1/3 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Detalle de Insumos
                </h3>
                <div className="overflow-x-auto rounded-xl border border-slate-100">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                      <tr>
                        <th className="p-3 border-b">Calidad</th>
                        <th className="p-3 border-b">Título</th>
                        <th className="p-3 border-b">Color</th>
                        <th className="p-3 border-b">Conos (und)</th>
                        <th className="p-3 border-b">Peso Neto</th>
                        <th className="p-3 border-b">Precio Unitario</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      {editOrden.detalles?.map((detalle, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="p-2.5">
                            <input
                              type="text"
                              value={detalle.calidad || ""}
                              onChange={(e) =>
                                handleEditDetalleChange(
                                  idx,
                                  "calidad",
                                  e.target.value,
                                )
                              }
                              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            />
                          </td>
                          <td className="p-2.5">
                            <input
                              type="text"
                              value={detalle.titulo || ""}
                              onChange={(e) =>
                                handleEditDetalleChange(
                                  idx,
                                  "titulo",
                                  e.target.value,
                                )
                              }
                              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            />
                          </td>
                          <td className="p-2.5">
                            <input
                              type="text"
                              value={detalle.color || ""}
                              onChange={(e) =>
                                handleEditDetalleChange(
                                  idx,
                                  "color",
                                  e.target.value,
                                )
                              }
                              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            />
                          </td>
                          <td className="p-2.5">
                            <input
                              type="number"
                              value={detalle.cantidad_conos || ""}
                              onChange={(e) =>
                                handleEditDetalleChange(
                                  idx,
                                  "cantidad_conos",
                                  parseInt(e.target.value) || 0,
                                )
                              }
                              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            />
                          </td>
                          <td className="p-2.5">
                            <input
                              type="number"
                              step="0.01"
                              value={detalle.peso_por_cono || ""}
                              onChange={(e) =>
                                handleEditDetalleChange(
                                  idx,
                                  "peso_por_cono",
                                  parseFloat(e.target.value) || 0,
                                )
                              }
                              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            />
                          </td>
                          <td className="p-2.5">
                            <input
                              type="number"
                              step="0.01"
                              value={detalle.precio_unitario || ""}
                              onChange={(e) =>
                                handleEditDetalleChange(
                                  idx,
                                  "precio_unitario",
                                  parseFloat(e.target.value) || 0,
                                )
                              }
                              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={editLoading}
                className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 shadow-sm shadow-blue-500/20 transition-all disabled:opacity-50"
              >
                {editLoading ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

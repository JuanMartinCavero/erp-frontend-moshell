// features/samples/pages/SamplePage.jsx
import React, { useState, useEffect } from "react";
import axiosClient from "../../../services/axiosClient";
//import { format } from "date-fns";
//import { es } from "date-fns/locale";

export default function SamplePage() {
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterActive, setFilterActive] = useState("all"); // all, active, inactive
  const [filterType, setFilterType] = useState("all"); // all, swatch, producto
  const [selectedSample, setSelectedSample] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [stats, setStats] = useState({
    total_swatch: 0,
    total_producto: 0,
    activas: 0,
    inactivas: 0,
  });

  // Cargar muestras
  const loadSamples = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (filterActive !== "all") params.is_active = filterActive === "active";
      if (filterType !== "all") params.tipo_muestra = filterType;

      const response = await axiosClient.get("/samples", { params });
      setSamples(response.data.data.data || []);
    } catch (error) {
      console.error("Error al cargar muestras:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar estadísticas
  const loadStats = async () => {
    try {
      const response = await axiosClient.get("/samples/statistics");
      setStats(response.data.data);
    } catch (error) {
      console.error("Error al cargar estadísticas:", error);
    }
  };

  useEffect(() => {
    loadSamples();
    loadStats();
  }, [search, filterActive, filterType]);

  // Abrir modal de edición
  const openEditModal = (sample) => {
    setSelectedSample(sample);
    setEditForm({
      tipo_muestra: sample.tipo_muestra || "producto",
      fecha_proyectada_entrega: sample.fecha_proyectada_entrega || "",
      fecha_real_entrega: sample.fecha_real_entrega || "",
      monto_adelanto_50: sample.monto_adelanto_50 || "",
      fecha_adelanto_50: sample.fecha_adelanto_50 || "",
      monto_restante_50: sample.monto_restante_50 || "",
      fecha_restante_50: sample.fecha_restante_50 || "",
      feedback: sample.feedback || "",
      status: sample.status || "PENDING",
    });
    setShowModal(true);
  };

  // Guardar cambios
  const saveChanges = async () => {
    try {
      await axiosClient.put(`/samples/${selectedSample.id}`, editForm);
      setShowModal(false);
      loadSamples();
      loadStats();
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al guardar los cambios");
    }
  };

  // Duplicar muestra
  const duplicateSample = async (id) => {
    if (!confirm("¿Duplicar esta muestra?")) return;
    try {
      await axiosClient.post(`/samples/${id}/duplicate`);
      loadSamples();
      loadStats();
    } catch (error) {
      console.error("Error al duplicar:", error);
    }
  };

  // Archivar/Activar muestra
  const toggleActive = async (id, isActive) => {
    const action = isActive ? "archivar" : "activar";
    if (!confirm(`¿${action} esta muestra?`)) return;
    try {
      await axiosClient.patch(`/samples/${id}/toggle-active`);
      loadSamples();
      loadStats();
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    }
  };

  // Obtener badge de estado de pago
  const getPaymentBadge = (estado) => {
    switch (estado) {
      case "pagado_total":
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Pagado Total</span>;
      case "pagado_adelanto":
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">50% Adelanto</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">Pendiente</span>;
    }
  };

  // Obtener badge de estado de muestra
  const getStatusBadge = (status) => {
    switch (status) {
      case "APPROVED":
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Aprobada</span>;
      case "REJECTED":
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">Rechazada</span>;
      case "IN_REVIEW":
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">En Revisión</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">Pendiente</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Muestras</h1>
          <p className="text-gray-500">Administra muestras de swatch y producto</p>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-purple-500">
          <p className="text-sm text-gray-500">Muestras Swatch</p>
          <p className="text-2xl font-bold">{stats.total_swatch}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">Muestras Producto</p>
          <p className="text-2xl font-bold">{stats.total_producto}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Activas</p>
          <p className="text-2xl font-bold">{stats.activas}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-gray-500">
          <p className="text-sm text-gray-500">Archivadas</p>
          <p className="text-2xl font-bold">{stats.inactivas}</p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">
        <div className="flex flex-wrap gap-4">
          <input
            className="flex-1 outline-none border rounded-lg px-4 py-2"
            placeholder="Buscar por pedido o cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border rounded-lg px-4 py-2"
            value={filterActive}
            onChange={(e) => setFilterActive(e.target.value)}
          >
            <option value="all">Todas</option>
            <option value="active">Activas</option>
            <option value="inactive">Archivadas</option>
          </select>
          <select
            className="border rounded-lg px-4 py-2"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">Todos los tipos</option>
            <option value="swatch">Swatch</option>
            <option value="producto">Producto</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="text-left p-4">Tipo</th>
                <th className="text-left p-4">Versión</th>
                <th className="text-left p-4">Pedido</th>
                <th className="text-left p-4">Cliente</th>
                <th className="text-left p-4">Fechas</th>
                <th className="text-left p-4">Pagos</th>
                <th className="text-center p-4">Estado</th>
                <th className="text-center p-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center p-8 text-gray-400">
                    Cargando muestras...
                  </td>
                </tr>
              ) : samples.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center p-8 text-gray-400">
                    No hay muestras registradas
                  </td>
                </tr>
              ) : (
                samples.map((sample) => (
                  <tr key={sample.id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        sample.tipo_muestra === "swatch" 
                          ? "bg-purple-100 text-purple-700" 
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {sample.tipo_muestra === "swatch" ? "Swatch" : "Producto"}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-sm">
                      v{sample.version}
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-gray-800">
                        {sample.technical_sheet?.pedido?.numero_pedido || "N/A"}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-gray-800">
                        {sample.technical_sheet?.pedido?.cliente?.name || "N/A"}
                      </p>
                    </td>
                    <td className="p-4 text-sm">
                      <div className="flex flex-col gap-1">
                        <span className="text-gray-500">Pedido: {sample.fecha_pedido_muestra || "-"}</span>
                        <span className="text-blue-600">Proyectada: {sample.fecha_proyectada_entrega || "-"}</span>
                        <span className="text-green-600">Real: {sample.fecha_real_entrega || "-"}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        {getPaymentBadge(sample.estado_pago_muestra)}
                        <span className="text-xs text-gray-500">
                          Adelanto: S/ {sample.monto_adelanto_50 || 0}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex flex-col gap-1 items-center">
                        {getStatusBadge(sample.status)}
                        {!sample.is_active && (
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-600">
                            Archivada
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => openEditModal(sample)}
                          className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => duplicateSample(sample.id)}
                          className="px-3 py-1 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                          Duplicar
                        </button>
                        <button
                          onClick={() => toggleActive(sample.id, sample.is_active)}
                          className={`px-3 py-1 text-sm rounded-lg ${
                            sample.is_active
                              ? "bg-yellow-500 hover:bg-yellow-600"
                              : "bg-green-500 hover:bg-green-600"
                          } text-white`}
                        >
                          {sample.is_active ? "Archivar" : "Activar"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL */}
      {showModal && selectedSample && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">
                Editar Muestra - Versión {selectedSample.version}
              </h2>
              <p className="text-gray-500">
                Pedido: {selectedSample.technical_sheet?.pedido?.numero_pedido}
              </p>
            </div>
            <div className="p-6 space-y-4">
              {/* Tipo Muestra */}
              <div>
                <label className="block text-sm font-medium mb-1">Tipo de Muestra</label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={editForm.tipo_muestra}
                  onChange={(e) => setEditForm({ ...editForm, tipo_muestra: e.target.value })}
                >
                  <option value="swatch">Swatch (Cuadradito)</option>
                  <option value="producto">Producto (Prenda completa)</option>
                </select>
              </div>

              {/* Fechas */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Fecha Proyectada Entrega</label>
                  <input
                    type="date"
                    className="w-full border rounded-lg px-3 py-2"
                    value={editForm.fecha_proyectada_entrega}
                    onChange={(e) => setEditForm({ ...editForm, fecha_proyectada_entrega: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Fecha Real Entrega</label>
                  <input
                    type="date"
                    className="w-full border rounded-lg px-3 py-2"
                    value={editForm.fecha_real_entrega}
                    onChange={(e) => setEditForm({ ...editForm, fecha_real_entrega: e.target.value })}
                  />
                </div>
              </div>

              {/* Pagos */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Pagos (50% - 50%)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Adelanto 50% (S/)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full border rounded-lg px-3 py-2"
                      value={editForm.monto_adelanto_50}
                      onChange={(e) => setEditForm({ ...editForm, monto_adelanto_50: parseFloat(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Fecha Adelanto</label>
                    <input
                      type="date"
                      className="w-full border rounded-lg px-3 py-2"
                      value={editForm.fecha_adelanto_50}
                      onChange={(e) => setEditForm({ ...editForm, fecha_adelanto_50: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Restante 50% (S/)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full border rounded-lg px-3 py-2"
                      value={editForm.monto_restante_50}
                      onChange={(e) => setEditForm({ ...editForm, monto_restante_50: parseFloat(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Fecha Restante</label>
                    <input
                      type="date"
                      className="w-full border rounded-lg px-3 py-2"
                      value={editForm.fecha_restante_50}
                      onChange={(e) => setEditForm({ ...editForm, fecha_restante_50: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Estado */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Estado Muestra</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2"
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  >
                    <option value="PENDING">Pendiente</option>
                    <option value="IN_REVIEW">En Revisión</option>
                    <option value="APPROVED">Aprobada</option>
                    <option value="REJECTED">Rechazada</option>
                  </select>
                </div>
              </div>

              {/* Feedback */}
              <div>
                <label className="block text-sm font-medium mb-1">Feedback / Observaciones</label>
                <textarea
                  rows="3"
                  className="w-full border rounded-lg px-3 py-2"
                  value={editForm.feedback}
                  onChange={(e) => setEditForm({ ...editForm, feedback: e.target.value })}
                />
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={saveChanges}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

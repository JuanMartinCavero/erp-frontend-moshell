import React, { useState, useEffect } from "react";
import axiosClient from "../../../services/axiosClient";

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

  // Función para formatear fechas 
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const cleanDate = dateString.split("T")[0];
    const [year, month, day] = cleanDate.split("-");
    if (!year || !month || !day) return cleanDate;
    return `${day}/${month}/${year}`;
  };

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
      fecha_proyectada_entrega: sample.fecha_proyectada_entrega
        ? sample.fecha_proyectada_entrega.split("T")[0]
        : "",
      fecha_real_entrega: sample.fecha_real_entrega
        ? sample.fecha_real_entrega.split("T")[0]
        : "",
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
    if (!confirm("¿Deseas duplicar esta muestra?")) return;
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
    if (!confirm(`¿Estás seguro de ${action} esta muestra?`)) return;
    try {
      await axiosClient.patch(`/samples/${id}/toggle-active`);
      loadSamples();
      loadStats();
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    }
  };

  // Obtener badge de estado de muestra
  const getStatusBadge = (status) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Aprobada
          </span>
        );
      case "REJECTED":
        return (
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-rose-50 text-rose-700 border border-rose-200">
            Rechazada
          </span>
        );
      case "IN_REVIEW":
        return (
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-sky-50 text-sky-700 border border-sky-200">
            En Revisión
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            Pendiente
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 lg:p-8 font-sans">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            Gestión de Muestras
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Administra eficientemente las muestras de swatch y producto.
          </p>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow border-l-4 border-l-purple-500">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Muestras Swatch
          </p>
          <p className="text-3xl font-bold text-slate-800 mt-2">
            {stats.total_swatch}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Muestras Producto
          </p>
          <p className="text-3xl font-bold text-slate-800 mt-2">
            {stats.total_producto}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow border-l-4 border-l-emerald-500">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Activas
          </p>
          <p className="text-3xl font-bold text-slate-800 mt-2">
            {stats.activas}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow border-l-4 border-l-slate-400">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Archivadas
          </p>
          <p className="text-3xl font-bold text-slate-800 mt-2">
            {stats.inactivas}
          </p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 lg:p-5 rounded-2xl shadow-sm border border-slate-100 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="Buscar por pedido o cliente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
            value={filterActive}
            onChange={(e) => setFilterActive(e.target.value)}
          >
            <option value="all">Todas las muestras</option>
            <option value="active">Activas</option>
            <option value="inactive">Archivadas</option>
          </select>
          <select
            className="px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
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
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-100 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <th className="py-4 px-6">Tipo</th>
                <th className="py-4 px-6">Versión</th>
                <th className="py-4 px-6">Pedido</th>
                <th className="py-4 px-6">Cliente</th>
                <th className="py-4 px-6">Fechas</th>
                <th className="py-4 px-6 text-center">Estado</th>
                <th className="py-4 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-slate-400">
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
                      <span>Cargando muestras...</span>
                    </div>
                  </td>
                </tr>
              ) : samples.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-slate-400">
                    No se encontraron muestras registradas.
                  </td>
                </tr>
              ) : (
                samples.map((sample) => (
                  <tr
                    key={sample.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                          sample.tipo_muestra === "swatch"
                            ? "bg-purple-50 text-purple-700 border border-purple-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {sample.tipo_muestra === "swatch"
                          ? "Swatch"
                          : "Producto"}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono font-medium text-slate-700">
                      v{sample.version}
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-800">
                      {sample.technical_sheet?.pedido?.numero_pedido || "N/A"}
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-700">
                      {sample.technical_sheet?.pedido?.cliente?.nombre || "N/A"}
                    </td>
                    <td className="py-4 px-6 text-xs space-y-1">
                      <div className="text-slate-500">
                        Pedido:{" "}
                        <span className="font-medium text-slate-700">
                          {formatDate(sample.fecha_pedido_muestra)}
                        </span>
                      </div>
                      <div className="text-blue-600">
                        Proyectada:{" "}
                        <span className="font-medium">
                          {formatDate(sample.fecha_proyectada_entrega)}
                        </span>
                      </div>
                      <div className="text-emerald-600">
                        Real:{" "}
                        <span className="font-medium">
                          {formatDate(sample.fecha_real_entrega)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex flex-col items-center gap-1.5">
                        {getStatusBadge(sample.status)}
                        {!sample.is_active && (
                          <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-slate-100 text-slate-500">
                            Archivada
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(sample)}
                          className="px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => duplicateSample(sample.id)}
                          className="px-3 py-1.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                        >
                          Duplicar
                        </button>
                        <button
                          onClick={() =>
                            toggleActive(sample.id, sample.is_active)
                          }
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                            sample.is_active
                              ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          }`}
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
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Editar Muestra{" "}
                  <span className="text-blue-600 font-mono">
                    v{selectedSample.version}
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pedido asociado:{" "}
                  <span className="font-semibold text-slate-700">
                    {selectedSample.technical_sheet?.pedido?.numero_pedido ||
                      "N/A"}
                  </span>
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-slate-200/60 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Tipo Muestra */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Tipo de Muestra
                </label>
                <select
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                  value={editForm.tipo_muestra}
                  onChange={(e) =>
                    setEditForm({ ...editForm, tipo_muestra: e.target.value })
                  }
                >
                  <option value="swatch">Swatch (Cuadradito)</option>
                  <option value="producto">Producto (Prenda completa)</option>
                </select>
              </div>

              {/* Fechas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Fecha Proyectada Entrega
                  </label>
                  <input
                    type="date"
                    className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    value={editForm.fecha_proyectada_entrega}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        fecha_proyectada_entrega: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Fecha Real Entrega
                  </label>
                  <input
                    type="date"
                    className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    value={editForm.fecha_real_entrega}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        fecha_real_entrega: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Estado */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Estado Muestra
                </label>
                <select
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                  value={editForm.status}
                  onChange={(e) =>
                    setEditForm({ ...editForm, status: e.target.value })
                  }
                >
                  <option value="PENDING">Pendiente</option>
                  <option value="IN_REVIEW">En Revisión</option>
                  <option value="APPROVED">Aprobada</option>
                  <option value="REJECTED">Rechazada</option>
                </select>
              </div>

              {/* Feedback */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Feedback / Observaciones
                </label>
                <textarea
                  rows="3"
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                  placeholder="Escribe algún comentario u observación..."
                  value={editForm.feedback}
                  onChange={(e) =>
                    setEditForm({ ...editForm, feedback: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={saveChanges}
                className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 shadow-sm shadow-blue-500/20 transition-all"
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

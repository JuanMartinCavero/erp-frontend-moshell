import React, { useState } from "react";
import { Calendar, ChevronDown, Download, Bell, Settings } from "lucide-react";

export function InventoryHeader({
  onRegister,
  periodo,
  setPeriodo,
  fechaInicio,
  setFechaInicio,
  fechaFin,
  setFechaFin,
  onAplicarFechas,
  onExportExcel,
  onExportPDF,
  loading,
  showKardex = false,
}) {
  const [showPeriodoMenu, setShowPeriodoMenu] = useState(false);
  const [showPersonalizado, setShowPersonalizado] = useState(
    periodo === "custom",
  );

  const opciones = [
    { label: "Todos (Sin filtro)", value: "all" },
    { label: "Hoy (1 día)", value: 1 },
    { label: "Últimos 7 días", value: 7 },
    { label: "Últimos 15 días", value: 15 },
    { label: "Últimos 30 días", value: 30 },
    { label: "Últimos 90 días", value: 90 },
    { label: "Personalizado", value: "custom" },
  ];

  const labelActual =
    opciones.find((o) => o.value === periodo)?.label || "Seleccionar período";

  const handlePeriodoChange = (value) => {
    setPeriodo(value);
    setShowPeriodoMenu(false);
    setShowPersonalizado(value === "custom");

    // Si selecciona "Todos", limpiamos las fechas automáticamente y recargamos sin filtro
    if (value === "all") {
      setFechaInicio("");
      setFechaFin("");
      onAplicarFechas("", "");
    }
  };

  const handleAplicar = () => {
    if (fechaInicio && fechaFin) {
      onAplicarFechas(fechaInicio, fechaFin);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Kardex de Inventario
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Monitoreo en tiempo real de entradas y salidas de textiles.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* ✅ Dropdown de período */}
          <div className="relative">
            <button
              onClick={() => setShowPeriodoMenu(!showPeriodoMenu)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
            >
              <Calendar className="w-4 h-4" />
              {labelActual}
              <ChevronDown className="w-4 h-4" />
            </button>

            {showPeriodoMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {opciones.map((op) => (
                  <button
                    key={op.value}
                    onClick={() => handlePeriodoChange(op.value)}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                      periodo === op.value ? "bg-gray-100 font-semibold" : ""
                    }`}
                  >
                    {op.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ✅ Selector de fechas personalizado - visible cuando se selecciona "Personalizado" */}
          {showPersonalizado && (
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
              <input
                type="date"
                value={fechaInicio || ""}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="px-2 py-1 border rounded text-sm bg-white"
              />
              <span className="text-gray-500">a</span>
              <input
                type="date"
                value={fechaFin || ""}
                onChange={(e) => setFechaFin(e.target.value)}
                className="px-2 py-1 border rounded text-sm bg-white"
              />
              <button
                onClick={handleAplicar}
                disabled={!fechaInicio || !fechaFin || loading}
                className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 disabled:opacity-50"
              >
                Aplicar
              </button>
            </div>
          )}

          {/* ✅ Exportar Excel */}
          <button
            onClick={onExportExcel}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border border-green-600 text-green-600 rounded-lg text-sm hover:bg-green-50 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            Excel
          </button>

          {/* ✅ Exportar PDF */}
          <button
            onClick={onExportPDF}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg text-sm hover:bg-red-50 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            PDF
          </button>

          {/* Registrar Material */}
          <button
            onClick={onRegister}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700"
          >
            Registrar Material
          </button>
        </div>
      </div>
    </header>
  );
}

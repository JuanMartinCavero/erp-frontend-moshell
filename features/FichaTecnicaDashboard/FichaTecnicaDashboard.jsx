import React, { useState } from "react";
import { useTechSheetsDashboard } from "./hooks/useTechSheetsDashboard";
import DashboardHeader from "./components/DashboardHeader";
import MetricsCards from "./components/MetricsCards";
import FiltersBar from "./components/FiltersBar";
import TechSheetsTable from "./components/TechSheetsTable";
import Pagination from "./components/Pagination";

export default function FichaTecnicaDashboard() {
  const [viewMode, setViewMode] = useState("list");

  const {
    techSheets,
    stats,
    loading,
    error,
    pagination,
    handleSearch,
    handleSeasonFilter,
    handleStatusFilter,
    handlePageChange,
    deleteTechSheet,
    duplicateTechSheet,
  } = useTechSheetsDashboard();

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-container-low flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Cargando fichas técnicas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface-container-low flex items-center justify-center">
        <div className="text-center text-red-400">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <DashboardHeader onSearch={handleSearch} />

      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold font-headline tracking-tight text-on-surface">
            Fichas Técnicas
          </h1>
          <p className="text-on-secondary-container text-sm">
            Gestión de especificaciones industriales y catálogo de productos.
          </p>
        </div>

        {/* Metrics Cards */}
        <MetricsCards stats={stats} />

        {/* Filters */}
        <FiltersBar
          onSeasonFilter={handleSeasonFilter}
          onStatusFilter={handleStatusFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Data Table */}
        <div className="bg-surface-container rounded-xl border border-outline-variant/10 overflow-hidden">
          <TechSheetsTable
            techSheets={techSheets}
            onDelete={deleteTechSheet}
            onDuplicate={duplicateTechSheet}
          />

          <Pagination
            currentPage={pagination.currentPage}
            total={pagination.total}
            perPage={pagination.perPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

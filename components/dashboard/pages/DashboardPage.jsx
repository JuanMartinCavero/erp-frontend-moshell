// src/components/dashboard/pages/DashboardPage.jsx
import React from 'react';
import KpiCards from '../KpiCards';
import ProductionChart from '../ProductionChart';
import MachineWorkload from '../MachineWorkload';
import OrdersTable from '../OrdersTable';
import { useDashboardData } from '../hooks/useDashboardData';  // ← Ruta corregida
import { RefreshCw } from 'lucide-react';

export default function DashboardPage() {  // ← Cambié el nombre para evitar conflicto
  const {
    kpis,
    productionChart,
    machineWorkload,
    recentOrders,
    loading,
    error,
    refreshing,
    refresh
  } = useDashboardData();

const handlePeriodChange = async (period) => {
  // Recargar datos con el nuevo período
  await refresh();
};

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={refresh}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <button 
          onClick={refresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <KpiCards data={kpis} loading={loading} />

      <div className="flex flex-col lg:flex-row gap-6">
        <ProductionChart 
          data={productionChart} 
          loading={loading}
          onPeriodChange={handlePeriodChange}
        />
        <MachineWorkload data={machineWorkload} loading={loading} />
      </div>

      <OrdersTable data={recentOrders} loading={loading} />
    </div>
  );
}
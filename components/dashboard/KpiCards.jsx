// src/components/dashboard/KpiCards.jsx
import React from 'react';
import { ClipboardList, Settings, AlertTriangle, Truck, TrendingUp, TrendingDown } from "lucide-react";

const KpiCards = ({ data, loading }) => {
  // Si está cargando, mostrar skeletons
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  // Si data es undefined o null, mostrar valores por defecto
  if (!data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-center text-slate-400">No hay datos disponibles</div>
          </div>
        ))}
      </div>
    );
  }

  // Extraer datos con valores por defecto para evitar errores
  const ordersInProgress = data.ordersInProgress || { value: 0, change: 0, changeType: 'positive' };
  const productionLines = data.productionLines || { active: 0, total: 0, capacityUtilization: 0 };
  const lowStock = data.lowStock || { count: 0, requiresAttention: false };
  const pendingDeliveries = data.pendingDeliveries || { pending: 0, dispatchedToday: 0 };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Card 1: Orders in Progress */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-sm font-medium text-slate-500 mb-1">Orders in Progress</div>
            <div className="text-2xl font-bold text-slate-900">{ordersInProgress.value}</div>
          </div>
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <ClipboardList className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm mt-auto">
          {ordersInProgress.changeType === 'positive' ? (
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-600" />
          )}
          <span className={`font-medium ${ordersInProgress.changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'}`}>
            {ordersInProgress.change > 0 ? '+' : ''}{ordersInProgress.change}%
          </span>
          <span className="text-slate-500">vs last month</span>
        </div>
      </div>

      {/* Card 2: Active Production Lines */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between relative">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-sm font-medium text-slate-500 mb-1">Active Production<br/>Lines</div>
            <div className="text-2xl font-bold text-slate-900">
              {productionLines.active}/{productionLines.total}
            </div>
          </div>
          <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
            <Settings className="w-5 h-5 text-emerald-600" />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-auto">
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-slate-600 rounded-full" 
              style={{ width: `${productionLines.capacityUtilization}%` }}
            ></div>
          </div>
          <div className="text-xs text-slate-400">{productionLines.capacityUtilization}% Capacity Utilization</div>
        </div>
      </div>

      {/* Card 3: Low Stock Alerts */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-sm font-medium text-slate-500 mb-1">Low Stock Alerts</div>
            <div className="text-2xl font-bold text-slate-900">{lowStock.count}</div>
          </div>
          <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
        </div>
        <div className="flex items-center text-sm mt-auto">
          <span className={`font-medium ${lowStock.requiresAttention ? 'text-amber-600' : 'text-emerald-600'}`}>
            {lowStock.requiresAttention ? '! Requires Attention' : 'Stock OK'}
          </span>
        </div>
      </div>

      {/* Card 4: Pending Deliveries */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-sm font-medium text-slate-500 mb-1">Pending Deliveries</div>
            <div className="text-2xl font-bold text-slate-900">{pendingDeliveries.pending}</div>
          </div>
          <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
            <Truck className="w-5 h-5 text-indigo-600" />
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm mt-auto">
          <span className="font-medium text-emerald-600">{pendingDeliveries.dispatchedToday} dispatched</span>
          <span className="text-slate-500">today</span>
        </div>
      </div>
    </div>
  );
};

export default KpiCards;
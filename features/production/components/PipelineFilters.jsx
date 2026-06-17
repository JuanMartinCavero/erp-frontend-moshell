// src/features/production/components/PipelineFilters.jsx

import React from 'react';
import { Filter, RefreshCw, Plus } from 'lucide-react';

const PipelineFilters = ({
  stats,
  filter,
  onFilterChange,
  onRefresh,
  onNewOrder,
  refreshing,
}) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="font-bold text-gray-500 uppercase tracking-wider">FILTERS:</span>

          <button
            onClick={() => onFilterChange('ALL')}
            className={`px-4 py-1.5 rounded-full border transition-all whitespace-nowrap ${
              filter === 'ALL'
                ? 'border-gray-200 bg-white shadow-sm font-semibold text-gray-700'
                : 'border-gray-200 bg-transparent font-medium text-gray-500 hover:bg-gray-50'
            }`}
          >
            All Orders
          </button>

          <button
            onClick={() => onFilterChange('HIGH')}
            className={`px-4 py-1.5 rounded-full border transition-all whitespace-nowrap ${
              filter === 'HIGH'
                ? 'bg-red-50 border-red-200 text-red-700 font-semibold'
                : 'border-gray-200 bg-transparent font-medium text-gray-500 hover:bg-gray-50'
            }`}
          >
            High Priority
          </button>

          <button
            onClick={() => onFilterChange('LATE')}
            className={`px-4 py-1.5 rounded-full border transition-all whitespace-nowrap ${
              filter === 'LATE'
                ? 'bg-amber-50 border-amber-200 text-amber-700 font-semibold'
                : 'border-gray-200 bg-transparent font-medium text-gray-500 hover:bg-gray-50'
            }`}
          >
            Late Orders
          </button>
        </div>

        {/* Stats + acciones */}
        <div className="flex flex-wrap items-center justify-start md:justify-end gap-4">
          <div className="flex items-center gap-6 text-sm font-semibold text-gray-600">
            <span className="flex items-center gap-2 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              {stats.delayed} Delayed
            </span>
            <span className="flex items-center gap-2 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {stats.active} Active
            </span>
          </div>

          <div className="h-5 w-px bg-gray-300 hidden md:block" />

          <button
            onClick={onRefresh}
            disabled={refreshing}
            className={`flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 whitespace-nowrap ${
              refreshing ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            <RefreshCw
              className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`}
            />
            Refresh
          </button>

          <button className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 whitespace-nowrap">
            <Filter className="w-4 h-4" /> Sort
          </button>

          <button
            onClick={onNewOrder}
            className="bg-[#42526E] hover:bg-[#344563] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm flex items-center gap-2 transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> New Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PipelineFilters;

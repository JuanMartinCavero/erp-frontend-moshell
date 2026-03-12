// src/components/dashboard/KpiCards.jsx
import React from 'react';
import { ClipboardList, Settings, AlertTriangle, Truck, TrendingUp } from "lucide-react";

const KpiCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Card 1: Orders in Progress */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-sm font-medium text-slate-500 mb-1">Orders in Progress</div>
            <div className="text-2xl font-bold text-slate-900">124</div>
          </div>
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <ClipboardList className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm mt-auto">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span className="font-medium text-emerald-600">+12.5%</span>
          <span className="text-slate-500">vs last month</span>
        </div>
      </div>

      {/* Card 2: Active Production Lines */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between relative">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-sm font-medium text-slate-500 mb-1">Active Production<br/>Lines</div>
            <div className="text-2xl font-bold text-slate-900">18/24</div>
          </div>
          <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
            <Settings className="w-5 h-5 text-emerald-600" />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-auto">
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-slate-600 w-[75%] rounded-full"></div>
          </div>
          <div className="text-xs text-slate-400">75% Capacity Utilization</div>
        </div>
      </div>

      {/* Card 3: Low Stock Alerts */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-sm font-medium text-slate-500 mb-1">Low Stock Alerts</div>
            <div className="text-2xl font-bold text-slate-900">12</div>
          </div>
          <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
        </div>
        <div className="flex items-center text-sm mt-auto">
          <span className="font-medium text-amber-600">! Requires Attention</span>
        </div>
      </div>

      {/* Card 4: Pending Deliveries */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-sm font-medium text-slate-500 mb-1">Pending Deliveries</div>
            <div className="text-2xl font-bold text-slate-900">45</div>
          </div>
          <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
            <Truck className="w-5 h-5 text-indigo-600" />
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm mt-auto">
          <span className="font-medium text-emerald-600">8 dispatched</span>
          <span className="text-slate-500">today</span>
        </div>
      </div>
    </div>
  );
};

export default KpiCards;
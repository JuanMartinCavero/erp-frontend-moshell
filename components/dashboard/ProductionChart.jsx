// src/components/dashboard/ProductionChart.jsx
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { ChevronDown } from 'lucide-react';

const ProductionChart = ({ data = [], loading, onPeriodChange }) => {
  const [period, setPeriod] = useState('weekly');

  const periods = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' }
  ];

  const handlePeriodChange = () => {
    const currentIndex = periods.findIndex(p => p.value === period);
    const nextIndex = (currentIndex + 1) % periods.length;
    const newPeriod = periods[nextIndex].value;
    setPeriod(newPeriod);
    if (onPeriodChange) onPeriodChange(newPeriod);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col w-full h-[388px] animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-slate-200 rounded w-1/4 mb-6"></div>
        <div className="flex-1 bg-slate-100 rounded"></div>
      </div>
    );
  }

  const chartData = data.length > 0 ? data : [];

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col w-full h-[388px] items-center justify-center">
        <p className="text-slate-400">No hay datos de producción disponibles</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col w-full h-[388px]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-1">Production Status</h2>
          <p className="text-sm text-slate-500">Ordered vs Produced units by department</p>
        </div>
        <button 
          onClick={handlePeriodChange}
          className="flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors"
        >
          {periods.find(p => p.value === period)?.label || 'Weekly'}
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </button>
      </div>

      <div className="flex-1 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }}
              dy={10}
              interval={0}
              angle={-15}
              textAnchor="end"
              height={50}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              width={40}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '11px' }}
              formatter={(value, name) => {
                if (name === 'Pedido') return [`${value} units`, 'Cantidad Pedida'];
                if (name === 'Producido') return [`${value} units`, 'Cantidad Producida'];
                return [value, name];
              }}
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              iconType="circle"
              formatter={(value) => {
                if (value === 'pedido') return 'Cantidad Pedida';
                if (value === 'producido') return 'Cantidad Producida';
                return value;
              }}
            />
            <Bar dataKey="pedido" fill="#455768" name="pedido" radius={[4, 4, 0, 0]} maxBarSize={50} />
            <Bar dataKey="producido" fill="#10b981" name="producido" radius={[4, 4, 0, 0]} maxBarSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductionChart;
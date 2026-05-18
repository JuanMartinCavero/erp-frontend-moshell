// src/components/dashboard/ProductionChart.jsx
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
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

  const chartData = data.length > 0 ? data : [
    { name: 'KNITTING', value: 0 },
    { name: 'IRONING', value: 0 },
    { name: 'FINISHING', value: 0 },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col w-full h-[388px]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-1">Production Status</h2>
          <p className="text-sm text-slate-500">Output units by department - Last 24 Hours</p>
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
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: 30, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [`${value} units`, 'Production']}
            />
            <Bar dataKey="value" fill="#455768" radius={[4, 4, 0, 0]} maxBarSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductionChart;
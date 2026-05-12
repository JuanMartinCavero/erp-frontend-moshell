// src/components/dashboard/MachineWorkload.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MachineWorkload = ({ data = [], loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col h-[388px] w-full lg:w-[360px] shrink-0 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-1/2 mb-6"></div>
        <div className="space-y-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i}>
              <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
              <div className="h-2 bg-slate-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getColorClass = (value) => {
    if (value > 80) return 'bg-emerald-500';
    if (value > 50) return 'bg-slate-600';
    return 'bg-slate-300';
  };

  const workloads = data.length > 0 ? data : [
    { name: "Auto-Loom A1-A8", value: 0, color: "bg-slate-300" },
    { name: "Dyeing Unit B1", value: 0, color: "bg-slate-300" },
    { name: "Stitching Hall 2", value: 0, color: "bg-slate-300" },
    { name: "Finishing Unit C", value: 0, color: "bg-slate-300" },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col h-[388px] w-full lg:w-[360px] shrink-0">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Machine Workload</h2>
      
      <div className="flex flex-col gap-6 flex-1">
        {workloads.map((item) => (
          <div key={item.name} className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-slate-900">{item.name}</span>
              <span className="text-slate-900">{item.value}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${getColorClass(item.value)}`} 
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => navigate('/machines')}
        className="w-full py-2.5 mt-6 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
      >
        View Detailed Maintenance
      </button>
    </div>
  );
};

export default MachineWorkload;
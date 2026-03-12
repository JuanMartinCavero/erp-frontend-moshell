// src/components/dashboard/MachineWorkload.jsx
import React from 'react';

const MachineWorkload = () => {
  const workloads = [
    { name: "Auto-Loom A1-A8", value: 92, color: "bg-emerald-500", bg: "bg-slate-100" },
    { name: "Dyeing Unit B1", value: 45, color: "bg-slate-600", bg: "bg-slate-100" },
    { name: "Stitching Hall 2", value: 78, color: "bg-slate-600", bg: "bg-slate-100" },
    { name: "Finishing Unit C", value: 15, color: "bg-slate-300", bg: "bg-slate-100" },
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
            <div className={`h-2 w-full ${item.bg} rounded-full overflow-hidden`}>
              <div 
                className={`h-full rounded-full ${item.color}`} 
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-2.5 mt-6 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
        View Detailed Maintenance
      </button>
    </div>
  );
};

export default MachineWorkload;
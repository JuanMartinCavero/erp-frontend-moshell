import React from 'react';
import { CheckCircle2, FileText, Clock } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/Card';

export default function WorkflowStatus({ workflowStatus }) {
  const steps = [
    { key: "sample_eval", label: "Sample Eval", icon: CheckCircle2 },
    { key: "prototype", label: "Prototype", icon: CheckCircle2 },
    { key: "tech_sheet", label: "Technical Sheet", icon: FileText },
    { key: "client_approval", label: "Client Approval", icon: Clock },
  ];

  const getStatusColor = (status) => {
    if (status === 'COMPLETED') return 'text-emerald-600';
    if (status === 'IN_REVIEW') return 'text-amber-600';
    return 'text-gray-400';
  };

  const completedCount = Object.values(workflowStatus).filter(s => s === 'COMPLETED').length;

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-8">Workflow Status</h3>
        <div className="relative flex justify-between items-center px-8">
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200">
            <div className="h-full bg-[#42526E]" style={{ width: `${completedCount * 25}%` }} />
          </div>
          {steps.map((step, i) => {
            const status = workflowStatus[step.key] || "PENDING";
            const isActive = status !== "PENDING";
            const Icon = step.icon;
            return (
              <div key={i} className="relative z-10 flex flex-col items-center bg-white px-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${isActive ? 'bg-[#42526E] text-white' : 'bg-gray-100 text-gray-400'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-gray-900">{step.label}</span>
                <span className={`text-[10px] font-bold mt-1 uppercase tracking-wider ${getStatusColor(status)}`}>
                  {status}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
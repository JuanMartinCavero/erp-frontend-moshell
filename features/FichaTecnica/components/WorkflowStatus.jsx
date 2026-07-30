import React from 'react';
import { CheckCircle2, FileText, Clock, Package, ThumbsUp, Loader } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/Card';

export default function WorkflowStatus({ workflowStatus, workflowDetails }) {
  // Si no hay datos, mostrar carga
  if (!workflowStatus) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center items-center py-8">
            <Loader className="w-6 h-6 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-500">Cargando estados...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Definir los pasos con sus iconos (en español)
  const steps = [
    { key: 'design', label: 'Diseño', icon: FileText },
    { key: 'swatch', label: 'Swatch', icon: CheckCircle2 },
    { key: 'prototype', label: 'Prototipo', icon: Package },
    { key: 'client_approval', label: 'Aprobación Cliente', icon: ThumbsUp },
    { key: 'payment', label: 'Pago', icon: Clock },
    { key: 'production', label: 'Producción', icon: Package },
  ];

  // Mapeo de estados a colores
  const getStatusColor = (status) => {
    const colors = {
      'PENDING': 'text-gray-400',
      'IN_PROGRESS': 'text-blue-600',
      'COMPLETED': 'text-emerald-600',
      'REJECTED': 'text-red-600',
      'DRAFT': 'text-gray-400',
      'IN_REVIEW': 'text-amber-600',
      'CANCELED': 'text-red-600',
    };
    return colors[status] || 'text-gray-400';
  };

  const getStatusBadge = (status) => {
    const styles = {
      'PENDING': 'bg-gray-100 text-gray-500',
      'IN_PROGRESS': 'bg-blue-100 text-blue-700',
      'COMPLETED': 'bg-emerald-100 text-emerald-700',
      'REJECTED': 'bg-red-100 text-red-700',
      'DRAFT': 'bg-gray-100 text-gray-500',
      'IN_REVIEW': 'bg-amber-100 text-amber-700',
    };
    return styles[status] || 'bg-gray-100 text-gray-500';
  };

  // 👇 MAPEO DE ESTADOS A ESPAÑOL
  const getStatusLabel = (status) => {
    const labels = {
      'PENDING': 'Pendiente',
      'IN_PROGRESS': 'En Progreso',
      'COMPLETED': 'Completado',
      'REJECTED': 'Rechazado',
      'DRAFT': 'Borrador',
      'IN_REVIEW': 'En Revisión',
      'CANCELED': 'Cancelado',
      'APPROVED': 'Aprobado',
    };
    return labels[status] || status;
  };

  // Contar completados
  const completedCount = Object.values(workflowStatus).filter(s => s === 'COMPLETED').length;
  const totalSteps = steps.length;
  const progress = (completedCount / totalSteps) * 100;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Estado del Flujo de Trabajo
          </h3>
          <span className="text-xs font-medium text-gray-500">
            {completedCount} / {totalSteps} completados
          </span>
        </div>

        {/* Barra de progreso */}
        <div className="w-full h-1.5 bg-gray-200 rounded-full mb-8 overflow-hidden">
          <div 
            className="h-full bg-[#42526E] transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Pasos */}
        <div className="relative flex justify-between items-center px-2">
          {steps.map((step, i) => {
            const status = workflowStatus[step.key] || 'PENDING';
            const details = workflowDetails?.[step.key];
            const Icon = step.icon;

            return (
              <div key={i} className="relative z-10 flex flex-col items-center bg-white px-2">
                <div className="flex flex-col items-center">
                  {/* Círculo con icono */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                    status === 'COMPLETED' ? 'bg-emerald-500 text-white ring-4 ring-emerald-100' :
                    status === 'IN_PROGRESS' ? 'bg-blue-500 text-white ring-4 ring-blue-100' :
                    status === 'REJECTED' ? 'bg-red-500 text-white ring-4 ring-red-100' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Etiqueta */}
                  <span className="text-sm font-bold text-gray-900 text-center">
                    {step.label}
                  </span>

                  {/* Estado en español */}
                  <span className={`text-[10px] font-bold mt-1 px-2 py-0.5 rounded-full ${getStatusBadge(status)}`}>
                    {getStatusLabel(status)}
                  </span>

                  {/* Detalle (opcional) */}
                  {details?.detail && (
                    <span className="text-[9px] text-gray-400 mt-0.5 text-center max-w-[80px] truncate">
                      {details.detail}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
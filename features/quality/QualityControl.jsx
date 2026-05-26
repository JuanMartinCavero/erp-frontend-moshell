// src/features/quality/QualityControl.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  XCircle, 
  CheckSquare, 
  Square,
  ChevronDown,
  Info,
  Banknote,
  Calendar,
  ChevronRight,
  ClipboardCheck,
  PackageCheck,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Progress } from "../../components/ui/Progress";
import { useQuality } from './hooks/useQuality';

// Componente de Checklist
const InspectionChecklist = ({ items, onUpdateItem }) => {
  const getStatusBadge = (status) => {
    if (status === 'PASSED') {
      return <Badge variant="success" className="bg-emerald-50 text-emerald-700 flex items-center gap-1">
        <CheckCircle2 className="w-3.5 h-3.5" /> PASSED
      </Badge>;
    }
    if (status === 'FAILED') {
      return <Badge variant="destructive" className="bg-red-50 text-red-700 flex items-center gap-1">
        <XCircle className="w-3.5 h-3.5" /> FAILED
      </Badge>;
    }
    return (
      <div className="flex gap-2">
        <button 
          onClick={() => onUpdateItem(items.id, 'PASSED')}
          className="text-emerald-600 hover:text-emerald-700"
        >
          <CheckCircle2 className="w-5 h-5" />
        </button>
        <button 
          onClick={() => onUpdateItem(items.id, 'FAILED')}
          className="text-red-600 hover:text-red-700"
        >
          <XCircle className="w-5 h-5" />
        </button>
      </div>
    );
  };

  return (
    <Card>
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-xl">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <ClipboardCheck className="w-5 h-5 text-gray-500" /> Quality Inspection Checklist
        </h3>
      </div>
      <div className="divide-y divide-gray-100 p-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <div>
              <p className="font-bold text-sm text-gray-900">{item.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
            </div>
            {getStatusBadge(item.status)}
          </div>
        ))}
      </div>
    </Card>
  );
};

// Componente de Historial
const ActivityLog = ({ history }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'PASSED': return 'bg-emerald-500';
      case 'FAILED': return 'bg-red-500';
      case 'REWORK': return 'bg-amber-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div>
      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Activity Log</h4>
      <div className="space-y-4 pl-2 border-l-2 border-gray-100 ml-2">
        {history.length === 0 ? (
          <div className="text-sm text-gray-400 text-center py-4">
            No inspections recorded yet
          </div>
        ) : (
          history.map((record) => (
            <div key={record.id} className="relative">
              <div className={`absolute -left-[13px] top-1 w-2.5 h-2.5 ${getStatusColor(record.status)} rounded-full ring-4 ring-gray-50`}></div>
              <p className="text-xs font-bold text-gray-900">
                Inspection {record.status} by {record.inspector}
              </p>
              <p className="text-xs text-gray-500">{record.comments}</p>
              <p className="text-[10px] text-gray-500 mt-1">
                {new Date(record.created_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Componente principal
export default function QualityControl() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { order, checklist, history, loading, error, submitting, submitInspection, updateChecklistItem, refresh } = useQuality(orderId);
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitInspection = async (status) => {
    // Convertir checklist a objeto para guardar
    const checklistData = {};
    checklist.forEach(item => {
      if (item.status) {
        checklistData[item.id] = item.status;
      }
    });
    
    setIsSubmitting(true);
    const result = await submitInspection(status, checklistData, comments);
    setIsSubmitting(false);
    
    if (result.success) {
      setComments('');
      // Opcional: mostrar notificación de éxito
    } else {
      alert('Error: ' + result.error);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
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

  if (!order) {
    return (
      <div className="p-8 text-center text-gray-500">
        No se encontró la orden de producción
      </div>
    );
  }

  const allChecklistPassed = checklist.length > 0 && checklist.every(item => item.status === 'PASSED');
  const canApprove = allChecklistPassed && order.quality_status !== 'PASSED';

  return (
    <div className="p-8 overflow-y-auto">
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <span>Operations</span>
        <ChevronRight className="w-3 h-3" />
        <span>Quality Control</span>
      </div>

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order: {order.order_number}</h1>
          <p className="text-sm text-gray-500">
            Client: {order.client} <span className="mx-2">|</span> Item: {order.item}
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={refresh}
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4 inline mr-1" /> Refresh
          </button>
          <Badge 
            variant={order.quality_status === 'PASSED' ? 'success' : order.quality_status === 'FAILED' ? 'destructive' : 'secondary'} 
            className="px-3 py-1.5 flex items-center gap-1.5 text-sm"
          >
            {order.quality_status === 'PASSED' && <CheckCircle2 className="w-4 h-4" />}
            {order.quality_status === 'FAILED' && <XCircle className="w-4 h-4" />}
            Quality: {order.quality_status}
          </Badge>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="flex-1 space-y-6">
          <InspectionChecklist 
            items={checklist} 
            onUpdateItem={updateChecklistItem}
          />

          <div className="bg-gray-50 rounded-xl p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Inspection Comments
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter any observations or issues found during inspection..."
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => handleSubmitInspection('PASSED')}
              disabled={!canApprove || submitting || isSubmitting}
              className={`flex-1 py-3 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2 ${
                canApprove && !submitting && !isSubmitting
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              APPROVE & CONTINUE
            </button>
            
            <button
              onClick={() => handleSubmitInspection('REWORK')}
              disabled={submitting || isSubmitting}
              className="flex-1 py-3 bg-amber-600 text-white rounded-lg font-bold text-sm hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              NEEDS REWORK
            </button>
            
            <button
              onClick={() => handleSubmitInspection('FAILED')}
              disabled={submitting || isSubmitting}
              className="flex-1 py-3 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              REJECT
            </button>
          </div>
        </div>

        <div className="w-80 space-y-6">
          <Card>
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <PackageCheck className="w-4 h-4 text-gray-400" /> Order Summary
              </h3>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Order Number:</span>
                <span className="font-medium">{order.order_number}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Quantity Ordered:</span>
                <span className="font-medium">{order.quantity_ordered} units</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Quantity Produced:</span>
                <span className="font-medium">{order.quantity_produced} units</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Defective Units:</span>
                <span className="font-medium text-red-600">{order.quantity_defective} units</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
                <span className="text-gray-500">Current Phase:</span>
                <span className="font-medium">{order.current_phase || 'N/A'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Next Phase:</span>
                <span className="font-medium text-emerald-600">{order.next_phase || 'Complete'}</span>
              </div>
            </div>
          </Card>

          <ActivityLog history={history} />
        </div>
      </div>
    </div>
  );
}
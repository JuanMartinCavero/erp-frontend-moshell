import React, { useMemo, useState } from 'react';
import { 
  CheckCircle2, 
  FileText, 
  Plus, 
  ChevronRight,
  XCircle,
  Eye,
  Copy,
  Archive,
  RefreshCw,
  AlertCircle,
  Check,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { techSheetApi } from '../services/techSheetApi';
import api from '../../../services/api';

export default function PrototypeHistoryTab({ samples, techSheetId, onAfterAddSample }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedSample, setSelectedSample] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showNewSampleForm, setShowNewSampleForm] = useState(false);
  const [newSampleData, setNewSampleData] = useState({
    tipo_muestra: 'producto',
    fecha_proyectada_entrega: '',
    monto_adelanto_50: '',
    monto_restante_50: '',
  });

  // Calcular siguiente versión
  const nextVersion = useMemo(() => {
    const versions = (samples || [])
      .map((s) => `${s?.version ?? ''}`)
      .map((v) => {
        const m = v.match(/\d+/);
        return m ? Number(m[0]) : null;
      })
      .filter((n) => typeof n === 'number' && !Number.isNaN(n));

    const max = versions.length ? Math.max(...versions) : 0;
    return String(max + 1);
  }, [samples]);

  // Ordenar muestras por versión
  const sortedSamples = useMemo(() => {
    return [...(samples || [])].sort((a, b) => {
      return parseFloat(a.version) - parseFloat(b.version);
    });
  }, [samples]);

  const getLastVersion = useMemo(() => {
    if (sortedSamples.length === 0) return 0;
    return parseFloat(sortedSamples[sortedSamples.length - 1].version);
  }, [sortedSamples]);

  // Obtener badge de estado
  const getStatusBadge = (status) => {
    const styles = {
      PENDING: 'warning',
      IN_REVIEW: 'info',
      APPROVED: 'success',
      REJECTED: 'destructive',
    };
    return styles[status] || 'secondary';
  };

  const getStatusLabel = (status) => {
    const labels = {
      PENDING: 'Pendiente',
      IN_REVIEW: 'En Revisión',
      APPROVED: 'Aprobada',
      REJECTED: 'Rechazada',
    };
    return labels[status] || status;
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      IN_REVIEW: 'bg-blue-100 text-blue-800',
      APPROVED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentBadge = (estado) => {
    const styles = {
      pendiente: 'bg-red-100 text-red-800',
      pagado_adelanto: 'bg-yellow-100 text-yellow-800',
      pagado_total: 'bg-green-100 text-green-800',
    };
    return styles[estado] || 'bg-gray-100 text-gray-800';
  };

  // Crear nueva versión (desde el botón "New Version" simple)
  const handleAddSample = async () => {
    if (!techSheetId) return;
    setLoading(true);
    setError(null);
    try {
      await techSheetApi.addSample(techSheetId, {
        version: nextVersion,
        type: 'PROTOTYPE',
        status: 'PENDING',
        feedback: null,
        images: [],
        measurements: [],
      });
      setSuccess(`Versión ${nextVersion} creada`);
      if (typeof onAfterAddSample === 'function') {
        await onAfterAddSample();
      }
      setTimeout(() => setSuccess(null), 3000);
    } catch (e) {
      console.error(e);
      setError(e?.response?.data?.message || 'Error al crear muestra');
    } finally {
      setLoading(false);
    }
  };

  // Crear nueva versión con datos personalizados (desde el formulario)
  const handleCreateVersion = async () => {
    if (!techSheetId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(`/technical-sheets/${techSheetId}/samples`, {
        version: nextVersion,
        type: 'PROTOTYPE',
        status: 'PENDING',
        tipo_muestra: newSampleData.tipo_muestra || 'producto',
        fecha_proyectada_entrega: newSampleData.fecha_proyectada_entrega || null,
        monto_adelanto_50: newSampleData.monto_adelanto_50 || null,
        monto_restante_50: newSampleData.monto_restante_50 || null,
      });
      
      if (response.data.success) {
        setSuccess(`Versión ${nextVersion} creada exitosamente`);
        setShowNewSampleForm(false);
        setNewSampleData({
          tipo_muestra: 'producto',
          fecha_proyectada_entrega: '',
          monto_adelanto_50: '',
          monto_restante_50: '',
        });
        if (typeof onAfterAddSample === 'function') {
          await onAfterAddSample();
        }
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (e) {
      console.error(e);
      setError(e?.response?.data?.message || 'Error al crear muestra');
    } finally {
      setLoading(false);
    }
  };

  // Aprobar muestra
  const handleApprove = async (sampleId) => {
    if (!confirm('¿Aprobar esta muestra?')) return;
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/samples/${sampleId}`, {
        status: 'APPROVED',
        evaluated_by: 'Usuario',
        evaluated_at: new Date().toISOString(),
      });
      if (response.data.success) {
        setSuccess('Muestra aprobada exitosamente');
        if (typeof onAfterAddSample === 'function') {
          await onAfterAddSample();
        }
        setShowModal(false);
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (e) {
      console.error(e);
      setError(e?.response?.data?.message || 'Error al aprobar muestra');
    } finally {
      setLoading(false);
    }
  };

  // Rechazar muestra
  const handleReject = async (sampleId) => {
    const reason = prompt('Motivo del rechazo:');
    if (reason === null) return; // Cancelar
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/samples/${sampleId}`, {
        status: 'REJECTED',
        feedback: reason,
      });
      if (response.data.success) {
        setSuccess('Muestra rechazada');
        if (typeof onAfterAddSample === 'function') {
          await onAfterAddSample();
        }
        setShowModal(false);
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (e) {
      console.error(e);
      setError(e?.response?.data?.message || 'Error al rechazar muestra');
    } finally {
      setLoading(false);
    }
  };

  // Duplicar muestra
  const handleDuplicate = async (sampleId) => {
    if (!confirm('¿Duplicar esta muestra?')) return;
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(`/samples/${sampleId}/duplicate`);
      if (response.data.success) {
        setSuccess('Muestra duplicada exitosamente');
        if (typeof onAfterAddSample === 'function') {
          await onAfterAddSample();
        }
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (e) {
      console.error(e);
      setError(e?.response?.data?.message || 'Error al duplicar muestra');
    } finally {
      setLoading(false);
    }
  };

  // Archivar/Activar muestra
  const handleToggleActive = async (sampleId, isActive) => {
    const action = isActive ? 'archivar' : 'activar';
    if (!confirm(`¿${action} esta muestra?`)) return;
    setLoading(true);
    setError(null);
    try {
      const response = await api.patch(`/samples/${sampleId}/toggle-active`);
      if (response.data.success) {
        setSuccess(response.data.message);
        if (typeof onAfterAddSample === 'function') {
          await onAfterAddSample();
        }
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (e) {
      console.error(e);
      setError(e?.response?.data?.message || 'Error al cambiar estado');
    } finally {
      setLoading(false);
    }
  };

  // Ver detalle de muestra
  const handleViewDetail = (sample) => {
    setSelectedSample(sample);
    setShowModal(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Prototype History ({samples?.length || 0})</CardTitle>
        <div className="flex gap-2">
          <button
            onClick={() => setShowNewSampleForm(!showNewSampleForm)}
            disabled={loading}
            className={`px-3 py-1.5 bg-gray-100 rounded-md text-xs font-semibold flex items-center gap-1 hover:bg-gray-200 transition-colors ${
              loading ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            <Plus className="w-3.5 h-3.5" /> Nueva Versión
          </button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Mensajes de éxito/error */}
        {success && (
          <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            ✅ {success}
          </div>
        )}
        {error && (
          <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {/* Formulario para Nueva Versión */}
        {showNewSampleForm && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
            <h4 className="font-semibold text-gray-700 text-sm">Crear Nueva Versión {nextVersion}</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Tipo de Muestra
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-1.5 text-sm"
                  value={newSampleData.tipo_muestra}
                  onChange={(e) => setNewSampleData({
                    ...newSampleData,
                    tipo_muestra: e.target.value
                  })}
                >
                  <option value="swatch">Swatch</option>
                  <option value="producto">Producto</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Fecha Proyectada Entrega
                </label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-3 py-1.5 text-sm"
                  value={newSampleData.fecha_proyectada_entrega}
                  onChange={(e) => setNewSampleData({
                    ...newSampleData,
                    fecha_proyectada_entrega: e.target.value
                  })}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Adelanto 50% (S/)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full border rounded-lg px-3 py-1.5 text-sm"
                  value={newSampleData.monto_adelanto_50}
                  onChange={(e) => setNewSampleData({
                    ...newSampleData,
                    monto_adelanto_50: e.target.value
                  })}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Restante 50% (S/)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full border rounded-lg px-3 py-1.5 text-sm"
                  value={newSampleData.monto_restante_50}
                  onChange={(e) => setNewSampleData({
                    ...newSampleData,
                    monto_restante_50: e.target.value
                  })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNewSampleForm(false)}
                className="px-3 py-1.5 border rounded-lg text-sm hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateVersion}
                disabled={loading}
                className="px-3 py-1.5 bg-[#42526E] text-white rounded-lg text-sm hover:bg-[#344563] disabled:opacity-50"
              >
                {loading ? 'Creando...' : 'Crear Versión'}
              </button>
            </div>
          </div>
        )}

        {samples?.length > 0 ? (
          <div className="space-y-3">
            {sortedSamples.map((s, i) => {
              const isLastVersion = parseFloat(s.version) === getLastVersion;
              return (
                <div 
                  key={i} 
                  className={`flex flex-wrap items-center justify-between p-4 border rounded-xl transition-all ${
                    s.status === 'APPROVED' 
                      ? 'border-green-200 bg-green-50/30' 
                      : s.status === 'REJECTED'
                      ? 'border-red-200 bg-red-50/30'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        s.status === 'APPROVED'
                          ? 'bg-green-100 text-green-600'
                          : s.status === 'REJECTED'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {s.status === 'APPROVED' ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : s.status === 'REJECTED' ? (
                        <XCircle className="w-5 h-5" />
                      ) : (
                        <FileText className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-bold text-sm">
                          Prototype {s.version} ({s.type || s.tipo_muestra || 'PROTOTYPE'})
                        </h5>
                        {isLastVersion && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                            Última
                          </span>
                        )}
                        {!s.is_active && (
                          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                            Archivada
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        {s.evaluated_by ? `Evaluado por ${s.evaluated_by}` : 'Sin evaluar'}
                        {s.fecha_proyectada_entrega && ` · Entrega: ${s.fecha_proyectada_entrega}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap mt-2 sm:mt-0">
                    {/* Estado de pago */}
                    {s.estado_pago_muestra && (
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getPaymentBadge(s.estado_pago_muestra)}`}>
                        {s.estado_pago_muestra}
                      </span>
                    )}
                    {/* Badge de estado */}
                    <Badge variant={getStatusBadge(s.status)} className="text-xs">
                      {getStatusLabel(s.status)}
                    </Badge>
                    {/* Botones de acción */}
                    <div className="flex items-center gap-1">
                      {/* Aprobar */}
                      {s.status !== 'APPROVED' && s.is_active !== false && (
                        <button
                          onClick={() => handleApprove(s.id)}
                          className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors"
                          title="Aprobar muestra"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      {/* Rechazar */}
                      {s.status !== 'REJECTED' && s.is_active !== false && (
                        <button
                          onClick={() => handleReject(s.id)}
                          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                          title="Rechazar muestra"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      {/* Ver detalle */}
                      <button
                        onClick={() => handleViewDetail(s)}
                        className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                        title="Ver detalle"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {/* Duplicar */}
                      <button
                        onClick={() => handleDuplicate(s.id)}
                        className="p-1 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded transition-colors"
                        title="Duplicar"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      {/* Archivar/Activar */}
                      <button
                        onClick={() => handleToggleActive(s.id, s.is_active !== false)}
                        className={`p-1 rounded transition-colors ${
                          s.is_active !== false
                            ? "text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50"
                            : "text-green-600 hover:text-green-800 hover:bg-green-50"
                        }`}
                        title={s.is_active !== false ? "Archivar" : "Activar"}
                      >
                        {s.is_active !== false ? (
                          <Archive className="w-4 h-4" />
                        ) : (
                          <RefreshCw className="w-4 h-4" />
                        )}
                      </button>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No hay prototipos</p>
        )}
      </CardContent>

      {/* MODAL: Detalle de muestra */}
      {showModal && selectedSample && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-bold">
                Detalle de Muestra v{selectedSample.version}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Tipo</p>
                  <p className="font-medium">{selectedSample.tipo_muestra || selectedSample.type || 'Producto'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Estado</p>
                  <span className={`px-2 py-1 text-xs rounded-full inline-block ${getStatusColor(selectedSample.status)}`}>
                    {getStatusLabel(selectedSample.status)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fecha Pedido</p>
                  <p className="font-medium">{selectedSample.fecha_pedido_muestra || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fecha Proyectada</p>
                  <p className="font-medium">{selectedSample.fecha_proyectada_entrega || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fecha Real</p>
                  <p className="font-medium">{selectedSample.fecha_real_entrega || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Estado Pago</p>
                  <span className={`px-2 py-1 text-xs rounded-full inline-block ${getPaymentBadge(selectedSample.estado_pago_muestra)}`}>
                    {selectedSample.estado_pago_muestra || 'Pendiente'}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Adelanto 50%</p>
                  <p className="font-medium">S/ {selectedSample.monto_adelanto_50 || '0.00'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Restante 50%</p>
                  <p className="font-medium">S/ {selectedSample.monto_restante_50 || '0.00'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Activa</p>
                  <p className="font-medium">{selectedSample.is_active !== false ? '✅ Sí' : '❌ No (Archivada)'}</p>
                </div>
              </div>
              
              {selectedSample.feedback && (
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">Feedback</p>
                  <div className="font-medium text-gray-700 bg-gray-50 p-3 rounded-lg text-sm">
                    {selectedSample.feedback}
                  </div>
                </div>
              )}

              {selectedSample.measurements && Object.keys(selectedSample.measurements).length > 0 && (
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">Medidas</p>
                  <pre className="font-medium text-gray-700 bg-gray-50 p-3 rounded-lg text-sm overflow-auto max-h-40">
                    {JSON.stringify(selectedSample.measurements, null, 2)}
                  </pre>
                </div>
              )}

              <div className="border-t pt-4 flex justify-end gap-2">
                {selectedSample.status !== 'APPROVED' && selectedSample.is_active !== false && (
                  <button
                    onClick={() => {
                      handleApprove(selectedSample.id);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Aprobar
                  </button>
                )}
                {selectedSample.status !== 'REJECTED' && selectedSample.is_active !== false && (
                  <button
                    onClick={() => {
                      handleReject(selectedSample.id);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Rechazar
                  </button>
                )}
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

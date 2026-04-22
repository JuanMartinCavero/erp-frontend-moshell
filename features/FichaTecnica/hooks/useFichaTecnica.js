import { useState, useEffect, useCallback } from 'react';
import api from '../../../services/api';

export const useFichaTecnica = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [techSheet, setTechSheet] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [pedido, setPedido] = useState(null);
  const [materiales, setMateriales] = useState([]);
  const [workflowStatus, setWorkflowStatus] = useState({
    sample_eval: 'PENDING',
    prototype: 'PENDING',
    tech_sheet: 'IN_REVIEW',
    client_approval: 'PENDING'
  });

  const loadTechSheet = useCallback(async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/technical-sheets/${id}`);
      const data = response.data.data;
      
      setTechSheet(data.techSheet);
      setCliente(data.cliente);
      setPedido(data.pedido);
      setMateriales(data.materiales || []);
      setWorkflowStatus(data.workflow_status || {
        sample_eval: 'PENDING',
        prototype: 'PENDING',
        tech_sheet: 'IN_REVIEW',
        client_approval: 'PENDING'
      });
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.message || 'Error al cargar');
    } finally {
      setLoading(false);
    }
  }, [id]); // Solo depende de id

  useEffect(() => {
    loadTechSheet();
  }, [loadTechSheet]); // Solo se ejecuta cuando loadTechSheet cambia

  const updateSpecs = useCallback(async (editedSpecs) => {
    try {
      const response = await api.put(`/technical-sheets/${id}`, editedSpecs);
      setTechSheet(response.data.data);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  }, [id]);

  const sendToProduction = useCallback(async (quantity) => {
    try {
      const response = await api.post(`/technical-sheets/${id}/send-to-production`, { quantity });
      if (response.data.success) {
        await loadTechSheet();
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  }, [id, loadTechSheet]);

  const exportPDF = useCallback(async () => {
    try {
      const response = await api.get(`/technical-sheets/${id}/export-pdf`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ficha_tecnica_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [id]);

  return {
    loading,
    error,
    techSheet,
    cliente,
    pedido,
    materiales,
    workflowStatus,
    loadTechSheet,
    updateSpecs,
    sendToProduction,
    exportPDF
  };
};
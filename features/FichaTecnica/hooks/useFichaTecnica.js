import { useState, useEffect, useCallback } from "react";
import api from "../../../services/api";

export const useFichaTecnica = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [techSheet, setTechSheet] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [pedido, setPedido] = useState(null);
  const [materiales, setMateriales] = useState([]);
  const [workflowStatus, setWorkflowStatus] = useState({
    sample_eval: "PENDING",
    prototype: "PENDING",
    tech_sheet: "IN_REVIEW",
    client_approval: "PENDING",
  });
  const [cantidadPedido, setCantidadPedido] = useState(0);
  const [maquina, setMaquina] = useState(null);
  const [productionOrder, setProductionOrder] = useState(null);
  const [workflowDetails, setWorkflowDetails] = useState(null);

  const loadTechSheet = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      
      // ✅ Cargar ficha técnica (sin modificar)
      const response = await api.get(`/technical-sheets/${id}`);
      const data = response.data.data;

      setTechSheet(data.techSheet);
      setCliente(data.cliente);
      setPedido(data.pedido);
      // ❌ Ya no usamos data.materiales
      // setMateriales(data.materiales || []);
      
      setWorkflowStatus(
        data.workflow_status || {
          sample_eval: "PENDING",
          prototype: "PENDING",
          tech_sheet: "IN_REVIEW",
          client_approval: "PENDING",
        },
      );
      setCantidadPedido(data.cantidad_pedido || 0);
      setMaquina(data.techSheet?.machine || null);
      setProductionOrder(data.production_order || null);
      setWorkflowDetails(data.workflow_details || null);

      // ✅ Cargar materiales desde el nuevo endpoint (sin afectar otras interfaces)
      try {
        const materialesResponse = await api.get(`/technical-sheets/${id}/materiales`);
        setMateriales(materialesResponse.data.data || []);
      } catch (materialError) {
        console.warn("No se pudieron cargar los materiales:", materialError);
        setMateriales([]);
      }

    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.message || "Error al cargar");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadTechSheet();
  }, [loadTechSheet]);

  const updateSpecs = useCallback(
    async (editedSpecs) => {
      try {
        const response = await api.put(`/technical-sheets/${id}`, editedSpecs);
        setTechSheet(response.data.data);
        return { success: true };
      } catch (err) {
        return { success: false, error: err.response?.data?.message };
      }
    },
    [id],
  );

  const sendToProduction = useCallback(
    async (quantity) => {
      try {
        const response = await api.post(
          `/technical-sheets/${id}/send-to-production`,
          { quantity },
        );
        if (response.data.success) {
          await loadTechSheet();
        }
        return { success: true };
      } catch (err) {
        return { success: false, error: err.response?.data?.message };
      }
    },
    [id, loadTechSheet],
  );

  const exportPDF = useCallback(async () => {
    try {
      const response = await api.get(`/technical-sheets/${id}/export-pdf`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `ficha_tecnica_${id}.pdf`);
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
    cantidadPedido,
    materiales,
    workflowStatus,
    workflowDetails,
    maquina,
    productionOrder,
    loadTechSheet,
    updateSpecs,
    sendToProduction,
    exportPDF,
  };
};

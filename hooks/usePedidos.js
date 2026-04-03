import { useState } from "react";
import {
  getPedidos,
  createPedido,
  getReordenData,
  updateEstadoPedido,
  getPedidoDetalle,
  getPedidosStats,
  updatePedido,
  deletePedido as deletePedidoApi,
} from "../services/pedidosApi";

export default function usePedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const refreshPedidos = () => fetchPedidos();

  // Obtener pedidos
  const fetchPedidos = async (params = {}) => {
    setLoading(true);
    try {
      const res = await getPedidos(params);
      setPedidos(res.data.data);
      setPagination({
        current_page: res.data.current_page,
        last_page: res.data.last_page,
        total: res.data.total,
      });
    } catch (error) {
      setError("Error al cargar pedidos");
    } finally {
      setLoading(false);
    }
  };

  // Crear pedido
  const addPedido = async (data) => {
    setLoading(true);
    try {
      const res = await createPedido(data);
      await fetchPedidos();
      return res.data;
    } catch (error) {
      console.log("Error al crear pedido:", error.response?.data);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Reorden
  const fetchReorden = async (id) => {
    setLoading(true);
    try {
      const res = await getReordenData(id);
      return res.data;
    } catch (error) {
      console.log("Error en reorden:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Obtener detalle de pedido
  const fetchPedidoDetalle = async (id) => {
    setLoading(true);
    try {
      const res = await getPedidoDetalle(id);
      return res.data;
    } catch (error) {
      console.log("Error al obtener detalle:", error);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar estado
  const changeEstadoPedido = async (id, estado) => {
    try {
      await updateEstadoPedido(id, estado);
      fetchPedidos();
    } catch (error) {
      console.log("Error al actualizar estado:", error);
    }
  };

  // Obtener estadísticas
  const fetchStats = async () => {
    try {
      const res = await getPedidosStats();
      setStats(res.data);
    } catch (error) {
      console.log("Error al obtener stats:", error);
    }
  };

  // Delete pedido
  const deletePedido = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deletePedidoApi(id);
      setPedidos((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (error) {
      setError("Error al eliminar pedido");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update pedido
  const updatePedidoHook = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await updatePedido(id, data);
      setPedidos((prev) => prev.map((p) => (p.id === id ? res.data : p)));
      return res.data;
    } catch (error) {
      setError("Error al actualizar pedido");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    pedidos,
    stats,
    loading,
    error,
    pagination,
    refreshPedidos,
    fetchPedidos,
    addPedido,
    fetchReorden,
    fetchPedidoDetalle,
    changeEstadoPedido,
    fetchStats,
    deletePedido,
    updatePedido: updatePedidoHook,
  };
}

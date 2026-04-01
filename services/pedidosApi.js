import axiosClient from "./axiosClient";

// Obtener pedidos con filtros (zona: nacional/internacional, frecuencia: nuevo/recurrente)
export const getPedidos = (params = {}) => {
  return axiosClient.get("/pedidos", { params });
};

// Crear nuevo pedido
export const createPedido = (data) => {
  return axiosClient.post(`/pedidos`, data);
};

// Obtener datos de un pedido anterior para REORDEN
export const getReordenData = (id) => {
  return axiosClient.get(`/pedidos/${id}/reorden`);
};

// Actualizar estado de pedido (por ejemplo, de "Ingreso" a "Tejiendo")
export const updateEstadoPedido = (id, estado) => {
  return axiosClient.put(`/pedidos/${id}/estado`, { estado });
};

// Ver detalle completo de un pedido
export const getPedidoDetalle = (id) => {
  return axiosClient.get(`/pedidos/${id}`);
};

export const getPedidosStats = () => {
  return axiosClient.get(`/pedidos-stats`);
};

// Update pedido completo
export const updatePedido = (id, data) => {
  return axiosClient.put(`/pedidos/${id}`, data);
};

// Delete pedido
export const deletePedido = (id) => {
  return axiosClient.delete(`/pedidos/${id}`);
};

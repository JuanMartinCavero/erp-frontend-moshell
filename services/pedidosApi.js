//C:\Users\USER\Downloads\ERP Moshell\erp-frontend-moshell\services\pedidosApi.js
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

export const updateEstadoPago = (id, estado_pago) => {
  return axiosClient.put(`/pedidos/${id}/estado-pago`, { estado_pago });
};

export const registrarPago = (id, monto) => {
  return axiosClient.put(`/pedidos/${id}/pago`, { monto });
};

export const obtenerMuestas = () => {
  return axiosClient.get(`/pedidos-samples`);
};

// services/pedidosApi.js - agregar al final

// Obtener muestras (usando el nuevo endpoint)
export const getSamples = (params = {}) => {
  return axiosClient.get("/samples", { params });
};

export const getSamplesStatistics = () => {
  return axiosClient.get("/samples/statistics");
};

export const updateSample = (id, data) => {
  return axiosClient.put(`/samples/${id}`, data);
};

export const duplicateSample = (id) => {
  return axiosClient.post(`/samples/${id}/duplicate`);
};

export const toggleSampleActive = (id) => {
  return axiosClient.patch(`/samples/${id}/toggle-active`);
};

export const getSampleItems = (id) => {
  return axiosClient.get(`/samples/${id}/items`);
};

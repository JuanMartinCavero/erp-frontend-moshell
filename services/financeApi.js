import axiosClient from "./axiosClient";

export const obtenerDashboardFinanzas = async () => {
  const response = await axiosClient.get(`/finances/dashboard`);
  return response.data;
};

export const registrarPagoPedido = async (data) => {
  const response = await axiosClient.post(`/finances/pago-pedido`, data);
  return response.data;
};

export const registrarPagoOrden = async (data) => {
  const response = await axiosClient.post(`/finances/pago-orden`, data);
  return response.data;
};

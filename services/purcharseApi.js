import axiosClient from "./axiosClient";

export const ComprasKpi = async () => {
  const response = await axiosClient.get("/ordenes-compra/kpis");
  return response.data;
};

export const obtenerEstadosOrdenCompra = async () => {
  const response = await axiosClient.get("/ordenes-compra/estados");
  return response.data;
};

export const obtenerOrdenesCompra = async (filtros = {}) => {
  const response = await axiosClient.get("/ordenes-compra", {
    params: filtros,
  });

  return response.data;
};

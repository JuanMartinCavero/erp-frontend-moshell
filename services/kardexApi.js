import axiosClient from "./axiosClient";

export const getKardexPorMaterial = async (materialId) => {
  const response = await axiosClient.get(`/kardex/${materialId}`);
  return response.data;
};

export const registrarMovimiento = async (data) => {
  const response = await axiosClient.post(`/kardex/movimiento`, data);
  return response.data;
};
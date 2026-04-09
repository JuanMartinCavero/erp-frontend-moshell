import axiosClient from "./axiosClient";

export const getKardexPorMaterial = async (materialId) => {
  const response = await axiosClient.get(`/kardex/${materialId}`);
  return response.data;
};

export const registrarMovimiento = async (data) => {
  // CORREGIDO: cambiar /kardex/movimiento a /kardex
  const response = await axiosClient.post(`/kardex`, data);
  return response.data;
};
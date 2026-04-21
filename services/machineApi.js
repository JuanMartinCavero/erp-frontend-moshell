import axiosClient from "./axiosClient";

export const getMachines = async () => {
  const response = await axiosClient.get(`/machines`);
  return response.data;
};

// Obtener una máquina
export const getMachine = async (id) => {
  const response = await axiosClient.get(`/machines/${id}`);
  return response.data;
};

// Crear máquina
export const createMachine = async (data) => {
  const response = await axiosClient.post(`/machines`, data);
  return response.data;
};

// Actualizar máquina
export const updateMachine = async (id, data) => {
  const response = await axiosClient.put(`/machines/${id}`, data);
  return response.data;
};

// Eliminación lógica (is_active = false)
export const deleteMachine = async (id) => {
  const response = await axiosClient.delete(`/machines/${id}`);
  return response.data;
};

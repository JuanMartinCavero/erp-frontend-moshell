import axiosClient from "./axiosClient";

// Obtener clientes
export const getClientes = () => {
  return axiosClient.get(`/clientes`);
};

// Crear cliente
export const createCliente = (data) => {
  return axiosClient.post(`/clientes`, data);
};

// Buscar cliente
export const searchClientes = (q) => {
  return axiosClient.get(`/clientes/search?q=${q}`);
};

// Actualizar cliente
export const updateCliente = (id, data) => {
  return axiosClient.put(`/clientes/${id}`, data);
};

// Desactivar cliente
export const deleteCliente = (id) => {
  return axiosClient.delete(`/clientes/${id}`);
};

// Reactivar cliente
export const activarCliente = (id) => {
  return axiosClient.put(`/clientes/${id}/activar`);
};

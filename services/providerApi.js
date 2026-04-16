import axiosClient from "./axiosClient";

export const getProviders = async () => {
  const res = await axiosClient.get("/proveedores");
  return res.data;
};

export const getProviderById = async (id) => {
  const res = await axiosClient.get(`/proveedores/${id}`);
  return res.data;
};

export const createProvider = async (data) => {
  const res = await axiosClient.post("/proveedores", data);
  return res.data;
};

export const updateProvider = async (id, data) => {
  const res = await axiosClient.put(`/proveedores/${id}`, data);
  return res.data;
};

export const deleteProvider = async (id) => {
  const res = await axiosClient.delete(`/proveedores/${id}`);
  return res.data;
};

export const getProviderStats = async () => {
  const res = await axiosClient.get("/proveedores/stats");
  return res.data;
};

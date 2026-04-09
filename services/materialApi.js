import axiosClient from "./axiosClient";

export const getMateriales = async () => {
  const response = await axiosClient.get("/materiales");
  return response.data;
};

export const crearMaterial = async (data) => {
  const response = await axiosClient.post("/materiales", data);
  return response.data;
};

export const buscarMaterialPorCodigo = async (codigo) => {
  const response = await axiosClient.get(`/materiales/codigo/${codigo}`);
  return response.data;
};

export const generarCodigoDeBarras = async (id) => {
  const response = await axiosClient.get(`/materiales/${id}/barcode`);
  return response.data;
};

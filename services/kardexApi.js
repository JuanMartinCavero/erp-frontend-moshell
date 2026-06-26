import axiosClient from "./axiosClient";

// ============================================
// FUNCIONES EXISTENTES
// ============================================

export const getKardexPorMaterial = async (materialId) => {
  const response = await axiosClient.get(`/kardex/${materialId}`);
  return response.data;
};

export const registrarMovimiento = async (data) => {
  const response = await axiosClient.post(`/kardex`, data);
  return response.data;
};

export const exportExcel = async (materialId, params = {}) => {
  const response = await axiosClient.get(`/kardex/${materialId}/export-excel`, {
    params,
    responseType: "blob",
  });
  
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  const materialCodigo = params.material_codigo || materialId;
  link.setAttribute("download", `kardex_${materialCodigo}_${new Date().toISOString().split('T')[0]}.xlsx`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

// ============================================
// NUEVAS FUNCIONES
// ============================================

export const getMaterialesFiltrados = async (params = {}) => {
  const response = await axiosClient.get('/materiales/filtros', { params });
  return response.data;
};

export const exportMultipleExcel = async (materialIds, params = {}) => {
  // ✅ Enviar material_ids como string separado por comas (no como array)
  const response = await axiosClient.post('/kardex/export-multiple', {
    material_ids: materialIds.join(','), // ← Convertir array a string
    ...params
  }, {
    responseType: 'blob'
  });
  
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.download = `kardex_multiple_${new Date().toISOString().split('T')[0]}.xlsx`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

export const getResumenGeneral = async (params = {}) => {
  const response = await axiosClient.get('/kardex/resumen-general', { params });
  return response.data;
};
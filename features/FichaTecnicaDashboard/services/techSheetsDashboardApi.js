import api from '../../../services/api';

export const techSheetsDashboardApi = {
  // Obtener todas las fichas técnicas
  getAll: (params) => api.get('/technical-sheets', { params }),
  
  // Obtener estadísticas
  getStats: () => api.get('/technical-sheets/stats'),
  
  // Eliminar ficha técnica
  delete: (id) => api.delete(`/technical-sheets/${id}`),
  
  // Duplicar ficha técnica
  duplicate: (id) => api.post(`/technical-sheets/${id}/duplicate`),
};
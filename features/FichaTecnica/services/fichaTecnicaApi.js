import api from '../../../services/api';

export const fichaTecnicaApi = {
  getById: (id) => api.get(`/technical-sheets/${id}`),
  update: (id, data) => api.put(`/technical-sheets/${id}`, data),
  sendToProduction: (id, quantity) => api.post(`/technical-sheets/${id}/send-to-production`, { quantity }),
  exportPDF: (id) => api.get(`/technical-sheets/${id}/export-pdf`, { responseType: 'blob' })
};
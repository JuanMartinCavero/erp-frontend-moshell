import api from './api';

export const techSheetApi = {
    getById: (id) => api.get(`/technical-sheets/${id}`),
    update: (id, data) => api.put(`/technical-sheets/${id}`, data),
    addSample: (techSheetId, sampleData) => api.post(`/technical-sheets/${techSheetId}/samples`, sampleData),
    updateSampleStatus: (sampleId, statusData) => api.put(`/samples/${sampleId}/status`, statusData),
    requestApproval: (techSheetId, comments) => api.post(`/technical-sheets/${techSheetId}/request-approval`, { comments }),
    updateApproval: (techSheetId, approvalData) => api.put(`/technical-sheets/${techSheetId}/client-approval`, approvalData),
    sendToProduction: (techSheetId, quantity) => api.post(`/technical-sheets/${techSheetId}/send-to-production`, { quantity }),
    getTrackingHistory: (techSheetId) => api.get(`/technical-sheets/${techSheetId}/tracking`),
    exportPDF: (techSheetId) => api.get(`/technical-sheets/${techSheetId}/export-pdf`, { responseType: 'blob' })
};

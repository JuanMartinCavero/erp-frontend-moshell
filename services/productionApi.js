// src/services/productionApi.js

import api from './api';

export const productionApi = {
    // Obtener pipeline completo (órdenes agrupadas por fase)
    getPipeline: () => api.get('/production/pipeline'),
    
    // Obtener una orden específica
    getOrder: (id) => api.get(`/production-orders/${id}`),
    
    // Mover orden a otra fase
    moveOrderToPhase: (orderId, phaseId) => 
        api.put(`/production-orders/${orderId}/phase`, { phase_id: phaseId }),
    
    // Actualizar prioridad de orden
    updateOrderPriority: (orderId, priority) => 
        api.put(`/production-orders/${orderId}/priority`, { priority }),
    
    // Crear orden desde ficha técnica
    createProductionOrder: (techSheetId, data) => 
        api.post(`/technical-sheets/${techSheetId}/production-order`, data),
    
    // Obtener estadísticas del pipeline
    getPipelineStats: () => api.get('/production/pipeline/stats')
};
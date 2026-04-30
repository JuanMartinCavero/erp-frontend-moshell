// src/services/productionApi.js

import api from './api';

export const productionApi = {
    // Obtener pipeline
    getPipeline: () => api.get('/production/pipeline'),
    
    // Órdenes de producción
    getOrders: () => api.get('/production-orders'),
    getOrder: (id) => api.get(`/production-orders/${id}`),
    
    createOrder: (data) => api.post('/production-orders', data),
    
    updateOrder: (id, data) => api.put(`/production-orders/${id}`, data),
    
    updateOrderStatus: (id, status) => api.patch(`/production-orders/${id}/status`, { status }),
    
    updateOrderQuality: (id, qualityStatus) => api.patch(`/production-orders/${id}/quality`, { quality_status: qualityStatus }),
    
    // Seguimiento por fases
    updatePhase: (orderId, phaseId, estado) => 
        api.post(`/production-orders/${orderId}/tracking`, { fases_produccion_id: phaseId, estado }),
    
    // Materiales
    reserveMaterials: (orderId, materials) => 
        api.post(`/production-orders/${orderId}/reserve-materials`, { materials }),
    
    consumeMaterials: (orderId, materials) => 
        api.post(`/production-orders/${orderId}/consume-materials`, { materials }),
    
    // Producción
    startProduction: (orderId) => api.post(`/production-orders/${orderId}/start`),
    completeProduction: (orderId, producedQuantity) => 
        api.post(`/production-orders/${orderId}/complete`, { quantity_produced: producedQuantity }),
};
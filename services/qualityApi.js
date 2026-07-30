// src/services/qualityApi.js
import api from './api';

export const qualityApi = {
    /**
     * Obtener datos completos de calidad para una orden
     */
    getQualityData: (productionOrderId) => 
        api.get(`/quality/data/${productionOrderId}`),
    
    /**
     * Obtener historial de calidad de una orden
     */
    getHistory: (productionOrderId) => 
        api.get(`/quality/history/${productionOrderId}`),
    
    /**
     * Enviar resultado de inspección
     */
    submitInspection: (data) => 
        api.post('/quality/inspection', data),
    
    /**
     * Obtener estadísticas de calidad
     */
    getStatistics: () => 
        api.get('/quality/statistics'),

     /**
     * Obtener órdenes para el dashboard de calidad
     */
    getQualityOrders: (params = {}) => api.get('/quality/orders', { params }),
};
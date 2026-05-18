// src/services/dashboardApi.js (se mantiene igual)
import api from './api';

export const dashboardApi = {
    getDashboardData: () => api.get('/dashboard'),
    getKpis: () => api.get('/dashboard/kpis'),
   getProductionChart: (periodo = 'weekly') => api.get(`/dashboard/production-chart?periodo=${periodo}`),
    getMachineWorkload: () => api.get('/dashboard/machine-workload'),
    getRecentOrders: () => api.get('/dashboard/recent-orders')
};
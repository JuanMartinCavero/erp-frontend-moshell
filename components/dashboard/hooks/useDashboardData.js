// src/components/dashboard/hooks/useDashboardData.js
import { useState, useEffect, useCallback } from 'react';
import { dashboardApi } from '../../../services/dashboardApi';

export const useDashboardData = () => {
    const [kpis, setKpis] = useState({
        ordersInProgress: { value: 0, change: 0, changeType: 'positive' },
        productionLines: { active: 0, total: 0, capacityUtilization: 0 },
        lowStock: { count: 0, requiresAttention: false },
        pendingDeliveries: { pending: 0, dispatchedToday: 0 }
    });
    const [productionChart, setProductionChart] = useState([]);
    const [machineWorkload, setMachineWorkload] = useState([]);
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const loadDashboardData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await dashboardApi.getDashboardData();
            
            console.log('Respuesta completa:', response);
            console.log('response.data:', response.data);
            console.log('response.data.data:', response.data?.data);
            
            if (response.data && response.data.success) {
                const responseData = response.data.data;
                
                // Verificar que responseData existe
                if (responseData) {
                    // Extraer KPIs con valores seguros
                    const kpisData = responseData.kpis || {};
                    
                    setKpis({
                        ordersInProgress: {
                            value: kpisData.orders_in_progress?.value ?? 0,
                            change: kpisData.orders_in_progress?.change ?? 0,
                            changeType: kpisData.orders_in_progress?.change_type ?? 'positive'
                        },
                        productionLines: {
                            active: kpisData.production_lines?.active ?? 0,
                            total: kpisData.production_lines?.total ?? 0,
                            capacityUtilization: kpisData.production_lines?.capacity_utilization ?? 0
                        },
                        lowStock: {
                            count: kpisData.low_stock?.count ?? 0,
                            requiresAttention: kpisData.low_stock?.requires_attention ?? false
                        },
                        pendingDeliveries: {
                            pending: kpisData.pending_deliveries?.pending ?? 0,
                            dispatchedToday: kpisData.pending_deliveries?.dispatched_today ?? 0
                        }
                    });
                    
                    setProductionChart(responseData.productionChart || []);
                    setMachineWorkload(responseData.machineWorkload || []);
                    setRecentOrders(responseData.recentOrders || []);
                    setError(null);
                } else {
                    setError('No hay datos disponibles');
                }
            } else {
                setError(response.data?.message || 'Error al cargar datos');
            }
        } catch (err) {
            console.error('Error loading dashboard:', err);
            setError(err.response?.data?.message || 'Error de conexión con el servidor');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    const refresh = useCallback(() => {
        setRefreshing(true);
        loadDashboardData();
    }, [loadDashboardData]);

    useEffect(() => {
        loadDashboardData();
        const interval = setInterval(() => refresh(), 30000);
        return () => clearInterval(interval);
    }, [loadDashboardData, refresh]);

    return {
        kpis,
        productionChart,
        machineWorkload,
        recentOrders,
        loading,
        error,
        refreshing,
        refresh
    };
};
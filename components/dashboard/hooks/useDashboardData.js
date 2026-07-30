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
    const [currentPeriod, setCurrentPeriod] = useState('weekly'); // ← NUEVO: estado para el período

    // Modificada para aceptar parámetro period
    const loadDashboardData = useCallback(async (period = 'weekly') => {
        try {
            setLoading(true);
            // Cargar KPIs y datos principales (sin período)
            const response = await dashboardApi.getDashboardData();
            
            // Cargar gráfico con el período específico
            const chartResponse = await dashboardApi.getProductionChart(period);
            
            console.log('Respuesta KPIs:', response);
            console.log('Respuesta gráfico:', chartResponse);
            
            if (response.data && response.data.success) {
                const responseData = response.data.data;
                
                if (responseData) {
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
                    
                    setMachineWorkload(responseData.machineWorkload || []);
                    setRecentOrders(responseData.recentOrders || []);
                    setError(null);
                } else {
                    setError('No hay datos disponibles');
                }
            } else {
                setError(response.data?.message || 'Error al cargar datos');
            }
            
            // Procesar datos del gráfico
            if (chartResponse.data && chartResponse.data.success) {
                setProductionChart(chartResponse.data.data || []);
            } else {
                setProductionChart([]);
            }
            
        } catch (err) {
            console.error('Error loading dashboard:', err);
            setError(err.response?.data?.message || 'Error de conexión con el servidor');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    // Nueva función para recargar solo el gráfico con un período diferente
    const loadChartWithPeriod = useCallback(async (period) => {
        try {
            setCurrentPeriod(period);
            const chartResponse = await dashboardApi.getProductionChart(period);
            if (chartResponse.data && chartResponse.data.success) {
                setProductionChart(chartResponse.data.data || []);
            }
        } catch (err) {
            console.error('Error loading chart:', err);
        }
    }, []);

    const refresh = useCallback(() => {
        setRefreshing(true);
        loadDashboardData(currentPeriod);
    }, [loadDashboardData, currentPeriod]);

    useEffect(() => {
        loadDashboardData('weekly');
        // const interval = setInterval(() => refresh(), 30000);
        // return () => clearInterval(interval);
    }, [loadDashboardData, refresh]);

    return {
        kpis,
        productionChart,
        machineWorkload,
        recentOrders,
        loading,
        error,
        refreshing,
        refresh,
        loadChartWithPeriod,  // ← EXPORTADO: para cambiar el período desde el gráfico
        currentPeriod         // ← EXPORTADO: período actual
    };
};
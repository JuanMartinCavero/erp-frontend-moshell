// src/features/production/hooks/useProductionPipeline.js

import { useState, useEffect, useCallback } from 'react';
import { productionApi } from '../../../services/productionApi';

export default function useProductionPipeline() {
    const [columns, setColumns] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        delayed: 0,
        high_priority: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [filter, setFilter] = useState('ALL');

    const loadPipeline = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await productionApi.getPipeline();
            
            if (response && response.data) {
                if (response.data.success === true) {
                    setColumns(response.data.data?.columns || []);
                    setStats(response.data.data?.stats || {
                        total: 0,
                        active: 0,
                        delayed: 0,
                        high_priority: 0
                    });
                    setError(null);
                } else if (response.data.message === "No autenticado") {
                    setError("No autenticado. Por favor, inicia sesión nuevamente.");
                    setColumns([]);
                } else {
                    setError(response.data.message || "Error al cargar los datos");
                    setColumns([]);
                }
            } else {
                setError("No se recibieron datos del servidor");
                setColumns([]);
            }
        } catch (err) {
            console.error('Error loading pipeline:', err);
            if (err.response?.status === 401) {
                setError("Sesión expirada. Por favor, inicia sesión nuevamente.");
            } else {
                setError(err.response?.data?.message || err.message || 'Error de conexión');
            }
            setColumns([]);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    const refresh = useCallback(() => {
        setRefreshing(true);
        loadPipeline();
    }, [loadPipeline]);

    // ✅ CORREGIDO: Añadir quantityProduced como parámetro
    const moveOrder = useCallback(async (orderId, phaseId, sourceColId, destColId, quantityProduced = 0) => {
        let movedOrder = null;
        
        setColumns(prevColumns => {
            const newColumns = [...prevColumns];
            const sourceIndex = newColumns.findIndex(col => col.id === sourceColId);
            const destIndex = newColumns.findIndex(col => col.id === destColId);
            
            if (sourceIndex !== -1) {
                const sourceCards = [...(newColumns[sourceIndex].cards || [])];
                const orderIndex = sourceCards.findIndex(card => card.order_id === orderId);
                
                if (orderIndex !== -1) {
                    movedOrder = sourceCards[orderIndex];
                    sourceCards.splice(orderIndex, 1);
                    newColumns[sourceIndex] = {
                        ...newColumns[sourceIndex],
                        cards: sourceCards,
                        count: sourceCards.length
                    };
                }
            }
            
            if (destIndex !== -1 && movedOrder) {
                const destCards = [...(newColumns[destIndex].cards || []), movedOrder];
                newColumns[destIndex] = {
                    ...newColumns[destIndex],
                    cards: destCards,
                    count: destCards.length
                };
            }
            
            return newColumns;
        });
        
        try {
            // ✅ CORREGIDO: Pasar quantityProduced a la API
            await productionApi.moveOrderToPhase(orderId, phaseId, quantityProduced);
            return { success: true };
        } catch (error) {
            await loadPipeline();
            return { success: false, error: error.message };
        }
    }, [loadPipeline]);

    const filterByPriority = useCallback((priority) => {
        setFilter(priority);
        if (priority === 'ALL') {
            refresh();
        } else {
            setColumns(prevColumns => {
                return prevColumns.map(column => ({
                    ...column,
                    displayedCards: (column.cards || []).filter(card => 
                        priority === 'HIGH' ? card.priority === 'HIGH' : false
                    )
                }));
            });
        }
    }, [refresh]);

    useEffect(() => {
        loadPipeline();
    }, [loadPipeline]);

    return {
        columns,
        stats,
        loading,
        error,
        refreshing,
        filter,
        refresh,
        moveOrder,
        filterByPriority
    };
}
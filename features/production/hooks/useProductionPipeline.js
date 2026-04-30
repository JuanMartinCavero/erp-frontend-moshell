// src/features/production/hooks/useProductionPipeline.js

import { useState, useEffect, useCallback } from 'react';
import { productionApi } from '../../../services/productionApi';

// ✅ Exportación por defecto - NO uses 'export const'
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
            const response = await productionApi.getPipeline();
            
            if (response.data.success) {
                setColumns(response.data.data.columns);
                setStats(response.data.data.stats);
                setError(null);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error de conexión');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    const refresh = useCallback(() => {
        setRefreshing(true);
        loadPipeline();
    }, [loadPipeline]);

    const moveOrder = useCallback(async (orderId, phaseId, sourceColId, destColId) => {
        // Optimistic update
        let movedOrder = null;
        
        setColumns(prevColumns => {
            const newColumns = [...prevColumns];
            const sourceIndex = newColumns.findIndex(col => col.id === sourceColId);
            const destIndex = newColumns.findIndex(col => col.id === destColId);
            
            if (sourceIndex !== -1) {
                const sourceCards = [...newColumns[sourceIndex].cards];
                const orderIndex = sourceCards.findIndex(card => card.order_id === orderId);
                
                if (orderIndex !== -1) {
                    movedOrder = sourceCards[orderIndex];
                    sourceCards.splice(orderIndex, 1);
                    newColumns[sourceIndex].cards = sourceCards;
                    newColumns[sourceIndex].count = sourceCards.length;
                }
            }
            
            if (destIndex !== -1 && movedOrder) {
                const destCards = [...newColumns[destIndex].cards];
                destCards.push(movedOrder);
                newColumns[destIndex].cards = destCards;
                newColumns[destIndex].count = destCards.length;
            }
            
            return newColumns;
        });
        
        // Persistir cambio
        try {
            await productionApi.moveOrderToPhase(orderId, phaseId);
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
                    displayedCards: column.cards.filter(card => 
                        priority === 'HIGH' ? card.priority === 'HIGH' :
                        priority === 'LATE' ? false : true
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
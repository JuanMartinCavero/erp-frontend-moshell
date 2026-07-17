// src/features/quality/hooks/useQuality.js
import { useState, useEffect, useCallback } from 'react';
import { qualityApi } from '../../../services/qualityApi';

export const useQuality = (productionOrderId) => {
    const [order, setOrder] = useState(null);
    const [checklist, setChecklist] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const loadQualityData = useCallback(async () => {
        if (!productionOrderId) {
            setLoading(false);
            return;
        }
        
        try {
            setLoading(true);
            const response = await qualityApi.getQualityData(productionOrderId);
            
            if (response.data.success) {
                setOrder(response.data.data.order);
                setChecklist(response.data.data.checklist);
                setHistory(response.data.data.history);
                setError(null);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            console.error('Error loading quality data:', err);
            setError(err.response?.data?.message || 'Error de conexión');
        } finally {
            setLoading(false);
        }
    }, [productionOrderId]);

    const submitInspection = useCallback(async (status, checklistData, comments) => {
        setSubmitting(true);
        try {
            const response = await qualityApi.submitInspection({
                production_order_id: productionOrderId,
                status: status,
                checklist: checklistData,
                comments: comments,
                advance_phase: status === 'PASSED'
            });
            
            if (response.data.success) {
                // Recargar datos después de la inspección
                await loadQualityData();
                return { success: true, data: response.data.data };
            } else {
                return { success: false, error: response.data.message };
            }
        } catch (err) {
            console.error('Error submitting inspection:', err);
            return { 
                success: false, 
                error: err.response?.data?.message || 'Error al registrar inspección' 
            };
        } finally {
            setSubmitting(false);
        }
    }, [productionOrderId, loadQualityData]);

  // src/features/quality/hooks/useQuality.js
const updateChecklistItem = useCallback((itemId, status) => {
    setChecklist(prev => {
        // Recorrer las categorías y actualizar el ítem correcto
        return prev.map(category => ({
            ...category,
            items: category.items.map(item =>
                item.id === itemId ? { ...item, status } : item
            )
        }));
    });
}, []);

    useEffect(() => {
        loadQualityData();
    }, [loadQualityData]);

    return {
        order,
        checklist,
        history,
        loading,
        error,
        submitting,
        submitInspection,
        updateChecklistItem,
        refresh: loadQualityData
    };
};
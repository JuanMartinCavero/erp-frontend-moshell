import { useState, useEffect, useCallback } from 'react';
import { qualityApi } from '../../../services/qualityApi';

export const useQualityOrders = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    passed: 0,
    failed: 0,
    rework: 0
  });
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
    onPageChange: () => {}
  });
  const [currentFilters, setCurrentFilters] = useState({});
  
  const loadOrders = useCallback(async (page = 1, filters = {}) => {
    try {
      setLoading(true);
      const response = await qualityApi.getQualityOrders({
        page,
        ...filters
      });
      
      if (response.data.success) {
        setOrders(response.data.data.data);
        setStats(response.data.stats);
        setPagination({
          current_page: response.data.data.current_page,
          last_page: response.data.data.last_page,
          per_page: response.data.data.per_page,
          total: response.data.data.total,
          onPageChange: (newPage) => loadOrders(newPage, currentFilters)
        });
      }
    } catch (error) {
      console.error('Error loading quality orders:', error);
    } finally {
      setLoading(false);
    }
  }, [currentFilters]);
  
  const filterOrders = useCallback((filters) => {
    setCurrentFilters(filters);
    loadOrders(1, filters);
  }, [loadOrders]);
  
  const refresh = useCallback(() => {
    loadOrders(pagination.current_page, currentFilters);
  }, [loadOrders, pagination.current_page, currentFilters]);
  
  useEffect(() => {
    loadOrders();
  }, []);
  
  return {
    orders,
    stats,
    loading,
    pagination,
    refresh,
    filterOrders
  };
};
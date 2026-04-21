import { useState, useEffect, useCallback } from 'react';
import { techSheetsDashboardApi } from '../services/techSheetsDashboardApi';

export const useTechSheetsDashboard = () => {
  const [techSheets, setTechSheets] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    enDesarrollo: 0,
    pendienteAprobacion: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    season: '',
    status: '',
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  const loadTechSheets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page: pagination.currentPage,
        limit: pagination.perPage,
        search: filters.search,
        season: filters.season,
        status: filters.status,
      };
      
      const response = await techSheetsDashboardApi.getAll(params);
      setTechSheets(response.data.data);
      setPagination(prev => ({
        ...prev,
        total: response.data.meta?.total || response.data.data.length,
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar fichas técnicas');
    } finally {
      setLoading(false);
    }
  }, [pagination.currentPage, pagination.perPage, filters]);

  const loadStats = useCallback(async () => {
    try {
      const response = await techSheetsDashboardApi.getStats();
      setStats(response.data.data);
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  }, []);

  useEffect(() => {
    loadTechSheets();
    loadStats();
  }, [loadTechSheets, loadStats]);

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSeasonFilter = (season) => {
    setFilters(prev => ({ ...prev, season }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleStatusFilter = (status) => {
    setFilters(prev => ({ ...prev, status }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const deleteTechSheet = async (id) => {
    try {
      await techSheetsDashboardApi.delete(id);
      await loadTechSheets();
      await loadStats();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  };

  const duplicateTechSheet = async (id) => {
    try {
      await techSheetsDashboardApi.duplicate(id);
      await loadTechSheets();
      await loadStats();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  };

  return {
    techSheets,
    stats,
    loading,
    error,
    filters,
    pagination,
    handleSearch,
    handleSeasonFilter,
    handleStatusFilter,
    handlePageChange,
    deleteTechSheet,
    duplicateTechSheet,
    reload: loadTechSheets,
  };
};
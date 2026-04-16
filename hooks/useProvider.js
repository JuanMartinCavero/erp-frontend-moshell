import React from "react";
import { useState, useEffect } from "react";

import {
  getProviders,
  getProviderById,
  createProvider,
  updateProvider,
  deleteProvider,
  getProviderStats,
} from "../services/providerApi";

export const useProvider = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const data = await getProviders();
      setProviders(data);
    } catch (error) {
      console.error("Error cargando proveedores", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProviderById = async (id) => {
    setLoading(true);
    try {
      const data = await getProviderById(id);
      return data;
    } catch (error) {
      console.error("Error cargando proveedor", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addProvider = async (provider) => {
    const data = await createProvider(provider);
    setProviders((prev) => [data.proveedor, ...prev]);
    fetchStats();
  };

  const editProvider = async (id, provider) => {
    const data = await updateProvider(id, provider);
    setProviders((prev) => prev.map((p) => (p.id === id ? data.proveedor : p)));
  };

  const removeProvider = async (id) => {
    await deleteProvider(id);
    setProviders((prev) => prev.filter((p) => p.id !== id));
  };

  const fetchStats = async () => {
    try {
      const data = await getProviderStats();
      setStats(data);
    } catch (error) {
      console.error("Error stats", error);
    }
  };

  useEffect(() => {
    fetchProviders();
    fetchStats();
  }, []);

  return {
    providers,
    stats,
    loading,
    fetchProviders,
    fetchProviderById,
    addProvider,
    editProvider,
    removeProvider,
    fetchStats,
  };
};

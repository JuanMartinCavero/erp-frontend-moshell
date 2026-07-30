import { useState, useEffect } from "react";
import {
  getMateriales,
  buscarMaterialPorCodigo,
  crearMaterial,
  generarCodigoDeBarras,
  statsMateriales,
} from "../services/materialApi";

export const useMaterial = () => {
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  const obtenerMateriales = async () => {
    try {
      setLoading(true);
      const data = await getMateriales();
      return data;
    } catch (error) {
      console.error("Error obteniendo materiales", error);
    } finally {
      setLoading(false);
    }
  };

  const buscarMaterial = async (codigo) => {
    try {
      setLoading(true);
      const data = await buscarMaterialPorCodigo(codigo);
      setMaterial(data);
      return data;
    } catch (error) {
      console.error("Material no encontrado");
      setMaterial(null);
    } finally {
      setLoading(false);
    }
  };

  const registrarMaterial = async (data) => {
    try {
      setLoading(true);
      const nuevoMaterial = await crearMaterial(data);
      setMaterial(nuevoMaterial);
      return nuevoMaterial;
    } catch (error) {
      console.error("Error registrando material", error);
    } finally {
      setLoading(false);
    }
  };

  const obtenerCodigoDeBarras = async (id) => {
    try {
      setLoading(true);
      const data = await generarCodigoDeBarras(id);
      return data; // solo devuelve, no intenta setear
    } catch (error) {
      console.error("Error generando código de barras", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await statsMateriales();
      setStats(res);
    } catch (error) {
      console.error("Error stats", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    material,
    loading,
    stats,
    fetchStats,
    obtenerMateriales,
    buscarMaterial,
    registrarMaterial,
    obtenerCodigoDeBarras,
  };
};

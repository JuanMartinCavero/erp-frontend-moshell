import { useState } from "react";
import {
  getMateriales,
  buscarMaterialPorCodigo,
  crearMaterial,
  generarCodigoDeBarras,
} from "../services/materialApi";

export const useMaterial = () => {
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(false);

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

  return {
    material,
    loading,
    obtenerMateriales,
    buscarMaterial,
    registrarMaterial,
    obtenerCodigoDeBarras,
  };
};

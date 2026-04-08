import { useState } from "react";
import { buscarMaterialPorCodigo, crearMaterial } from "../services/materialApi";

export const useMaterial = () => {

  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(false);

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

  return {
    material,
    loading,
    buscarMaterial,
    registrarMaterial
  };
};
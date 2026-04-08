import { useEffect, useState } from "react";
import { getKardexPorMaterial } from "../services/kardexApi";

export const useKardex = (materialId) => {

  const [kardex, setKardex] = useState([]);
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchKardex = async () => {
    if (!materialId) return;

    try {
      setLoading(true);
      const data = await getKardexPorMaterial(materialId);

      setMaterial(data.material);
      setKardex(data.kardex);

    } catch (error) {
      console.error("Error cargando kardex:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKardex();
  }, [materialId]);

  return {
    material,
    kardex,
    loading,
    refetch: fetchKardex,
  };
};
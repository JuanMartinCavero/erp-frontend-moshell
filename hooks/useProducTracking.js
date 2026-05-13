import { useState } from "react";
import { nextPhase } from "../services/productionTracking";

export default function useProductionTracking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const moveToNextPhase = async (orderId) => {
    try {
      setLoading(true);
      setError(null);

      const data = await nextPhase(orderId);

      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al cambiar fase");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    moveToNextPhase,
    loading,
    error,
  };
}

import { useEffect, useState } from "react";
import { ComprasKpi } from "../services/purcharseApi";

export default function usePurcharse() {

  const [kpis, setKpis] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchKpis = async () => {
    try {
      const res = await ComprasKpi();
      setKpis(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKpis();
  }, []);

  return { kpis, loading, fetchKpis };
}
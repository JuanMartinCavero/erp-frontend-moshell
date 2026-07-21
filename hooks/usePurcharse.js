import { useEffect, useState } from "react";
import {
  ComprasKpi,
  obtenerEstadosOrdenCompra,
  obtenerOrdenesCompra,
} from "../services/purcharseApi";

export default function usePurcharse() {
  const [kpis, setKpis] = useState(null);
  const [estados, setEstados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordenes, setOrdenes] = useState([]);

  const fetchKpis = async () => {
    const res = await ComprasKpi();
    setKpis(res);
  };

  const fetchEstados = async () => {
    const res = await obtenerEstadosOrdenCompra();
    setEstados(res);
  };

  const fetchOrdenes = async (filtros = {}) => {
    const res = await obtenerOrdenesCompra(filtros);
    setOrdenes(res);
  };

  const cargarDatos = async () => {
    try {
      await Promise.all([fetchKpis(), fetchEstados(), fetchOrdenes()]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return {
    kpis,
    estados,
    ordenes,
    loading,
    fetchKpis,
    fetchEstados,
    fetchOrdenes,
  };
}

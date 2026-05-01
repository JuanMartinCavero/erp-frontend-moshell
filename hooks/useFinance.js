import { useEffect, useState } from "react";
import {
  obtenerDashboardFinanzas,
  registrarPagoPedido,
  registrarPagoOrden,
} from "../services/financeApi";

export const useFinance = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar dashboard financiero
  const hookDashboard = async () => {
    try {
      setLoading(true);

      const data = await obtenerDashboardFinanzas();

      setDashboard(data);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Registrar pago de pedido (cliente)
  const hookRegistrarPagoPedido = async (data) => {
    try {
      setLoading(true);

      const response = await registrarPagoPedido(data);

      // refrescar dashboard después del pago
      await hookDashboard();

      return response;
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Registrar pago de orden (proveedor)
  const hookRegistrarPagoOrden = async (data) => {
    try {
      setLoading(true);

      const response = await registrarPagoOrden(data);

      // refrescar dashboard
      await hookDashboard();

      return response;
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    hookDashboard();
  }, []);

  return {
    dashboard,
    loading,
    error,
    hookDashboard,
    hookRegistrarPagoPedido,
    hookRegistrarPagoOrden,
  };
};

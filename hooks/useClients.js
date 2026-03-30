import { useEffect, useState } from "react";
import {
  getClientes,
  createCliente,
  searchClientes,
  updateCliente,
  deleteCliente,
  activarCliente,
} from "../services/clientsApi";
export default function useClients() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchClientes = async () => {
    setLoading(true);
    try {
      const res = await getClientes();
      setClientes(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const addCliente = async (data) => {
    setLoading(true);
    try {
      const res = await createCliente(data);
      setClientes((prev) => [res.data, ...prev]);
    } catch (error) {
      console.log(error.response?.data);
    }
    setLoading(false);
  };

  const removeCliente = async (id) => {
    setLoading(true);
    try {
      await deleteCliente(id);
      setClientes((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, estado: false } : c
        )
      );
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const activar = async (id) => {
    setLoading(true);
    try {
      await activarCliente(id);
      setClientes((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, estado: true } : c
        )
      );
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const editCliente = async (id, data) => {
    setLoading(true);
    try {
      const res = await updateCliente(id, data);
      setClientes((prev) =>
        prev.map((c) => (c.id === id ? res.data : c))
      );
    } catch (error) {
      console.log(error.response?.data);
    }
    setLoading(false);
  };

  const buscar = async (q) => {
    if (!q) return fetchClientes();

    setLoading(true);
    try {
      const res = await searchClientes(q);
      setClientes(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return {
    clientes,
    loading,
    fetchClientes,
    addCliente,
    removeCliente,
    activar,
    buscar,
    editCliente,
  };
}
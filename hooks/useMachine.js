import { useState, useEffect } from "react";
import {
  getMachines,
  getMachine,
  createMachine,
  updateMachine,
  deleteMachine,
  machinesProduction,
  getMachineStats,
} from "../services/machineApi";

export const useMachines = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  // Obtener todas las máquinas
  const fetchMachines = async () => {
    try {
      setLoading(true);
      const data = await getMachines();
      setMachines(data);
    } catch (error) {
      console.error("Error cargando máquinas:", error);
    } finally {
      setLoading(false);
    }
  };

  // Obtener una máquina
  const fetchMachine = async (id) => {
    try {
      const data = await getMachine(id);
      return data;
    } catch (error) {
      console.error("Error obteniendo máquina:", error);
    }
  };

  // Crear máquina
  const addMachine = async (machineData) => {
    try {
      const response = await createMachine(machineData);

      setMachines((prev) => [response.data, ...prev]);

      return response;
    } catch (error) {
      console.error("Error creando máquina:", error);
      throw error;
    }
  };

  // Actualizar máquina
  const editMachine = async (id, machineData) => {
    try {
      const response = await updateMachine(id, machineData);

      setMachines((prev) => prev.map((m) => (m.id === id ? response.data : m)));

      return response;
    } catch (error) {
      console.error("Error actualizando máquina:", error);
      throw error;
    }
  };

  // Eliminación lógica
  const removeMachine = async (id) => {
    try {
      await deleteMachine(id);

      setMachines((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Error eliminando máquina:", error);
      throw error;
    }
  };

  const fetchMachinesProduction = async () => {
    try {
      setLoading(true);
      const data = await machinesProduction();
      setMachines(data);
    } catch (error) {
      console.error("Error cargando cola de producción:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await getMachineStats();
      setStats(data);
    } catch (error) {
      console.error("Error stats", error);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  return {
    machines,
    loading,
    stats,
    fetchMachines,
    fetchMachine,
    addMachine,
    editMachine,
    removeMachine,
    fetchMachinesProduction,
    fetchStats,
  };
};

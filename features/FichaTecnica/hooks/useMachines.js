import { useState, useEffect } from 'react';
import { getMachines } from '../../../services/machineApi';

export const useMachines = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMachines = async () => {
      try {
        setLoading(true);
        const data = await getMachines();
        setMachines(data);
      } catch (err) {
        console.error('Error loading machines:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadMachines();
  }, []);

  return { machines, loading, error };
};
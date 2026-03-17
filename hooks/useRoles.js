import { useState, useEffect } from "react";
import { rolesApi } from "../services/rolesApi"; // ← Esta es la ruta correcta

export function useRoles() {
  const [grupos, setGrupos] = useState([]); // ← Inicializar como array vacío
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [toast, setToast] = useState(null);
  
  // Modales
  const [modalCrear, setModalCrear] = useState(null);
  const [modalEditar, setModalEditar] = useState(null);
  const [modalEliminar, setModalEliminar] = useState(null);

  const showToast = (msg, tipo = "ok") => {
    setToast({ msg, tipo });
    setTimeout(() => setToast(null), 3000);
  };

  // Cargar datos del backend
  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        setInitialLoading(true);
        console.log("Fetching roles...");
        
        const response = await rolesApi.getAll();
        console.log("Respuesta de API:", response);
        
        // Verificar que response.data existe y es un array
        if (response && response.success && Array.isArray(response.data)) {
          setGrupos(response.data);
          console.log("Grupos cargados:", response.data);
        } else {
          console.warn("La respuesta no tiene el formato esperado:", response);
          setGrupos([]);
          showToast("Error al cargar los datos", "error");
        }
      } catch (error) {
        console.error("Error completo:", error);
        showToast("Error de conexión con el backend", "error");
        setGrupos([]); // ← Asegurar que sea array aunque falle
      } finally {
        setInitialLoading(false);
      }
    };

    fetchGrupos();
  }, []);

  // ── CRUD handlers ──────────────────────────────────────────────────────────
  const handleCrear = async (form) => {
    setLoading(true);
    try {
      await rolesApi.create(form);
      // Recargar datos después de crear
      const response = await rolesApi.getAll();
      if (response && response.success && Array.isArray(response.data)) {
        setGrupos(response.data);
      }
      setModalCrear(null);
      showToast("Rol creado correctamente.");
    } catch (error) {
      console.error("Error al crear:", error);
      showToast(error.message || "Error al crear el rol.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = async (form) => {
    setLoading(true);
    try {
      await rolesApi.update(modalEditar.rol.id, form);
      // Recargar datos después de editar
      const response = await rolesApi.getAll();
      if (response && response.success && Array.isArray(response.data)) {
        setGrupos(response.data);
      }
      setModalEditar(null);
      showToast("Rol actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar:", error);
      showToast(error.message || "Error al actualizar el rol.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async () => {
    setLoading(true);
    try {
      await rolesApi.delete(modalEliminar.rol.id);
      // Recargar datos después de eliminar
      const response = await rolesApi.getAll();
      if (response && response.success && Array.isArray(response.data)) {
        setGrupos(response.data);
      }
      setModalEliminar(null);
      showToast("Rol eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar:", error);
      showToast(error.message || "Error al eliminar.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Stats rápidos con validación
  const totalStats = {
    grupos: Array.isArray(grupos) ? grupos.length : 0,
    roles: Array.isArray(grupos) 
      ? grupos.reduce((s, g) => s + (g.roles?.length || 0), 0) 
      : 0,
    usuarios: Array.isArray(grupos)
      ? grupos.reduce((s, g) => s + (g.roles?.reduce((ss, r) => ss + (r.usuarios || 0), 0) || 0), 0)
      : 0
  };

  return {
    grupos: Array.isArray(grupos) ? grupos : [], // ← Siempre devolver array
    loading,
    initialLoading,
    toast,
    
    // Modales
    modalCrear,
    modalEditar,
    modalEliminar,
    setModalCrear,
    setModalEditar,
    setModalEliminar,
    
    // Stats
    totalRoles: totalStats.roles,
    totalUsuarios: totalStats.usuarios,
    
    // Handlers
    handleCrear,
    handleEditar,
    handleEliminar,
    showToast
  };
}
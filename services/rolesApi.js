import axiosClient from "./axiosClient";
// IMPORTANTE: Ajusta esta URL según tu backend
const API_URL = import.meta.env.VITE_API_URL;

// Función helper para obtener el token
const getToken = () => localStorage.getItem("token");

// Función helper para crear headers con autorización
const getHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${getToken()}`
});

export const rolesApi = {
  // Obtener todos los roles
  getAll: async () => {
    const res = await fetch(`${API_URL}/roles`, {
      headers: getHeaders()
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const response = await res.json();
    return response;
  },

  // Crear un nuevo rol
  create: async (form) => {
    const res = await fetch(`${API_URL}/api/roles`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        nombre: form.nombre,
        grupo: form.grupo,
        nivel: form.nivel,
        permisos: form.permisos,
      })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Error al crear");
    }
    return data;
  },

  // Actualizar un rol
  update: async (id, form) => {
    const res = await fetch(`${API_URL}/roles/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({
        nombre: form.nombre,
        grupo: form.grupo,
        nivel: form.nivel,
        permisos: form.permisos,
      })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Error al actualizar");
    }
    return data;
  },

  // Eliminar un rol
  delete: async (id) => {
    const res = await fetch(`${API_URL}/api/roles/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${getToken()}`
      }
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Error al eliminar");
    }
    return data;
  },

  // Recargar todos los datos
  refresh: async () => {
    const res = await fetch(`${API_URL}/roles`, {
      headers: getHeaders()
    });
    const data = await res.json();
    return data;
  }
};
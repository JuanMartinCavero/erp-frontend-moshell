import React, { useState, useEffect } from "react";
import { Search, Bell, Moon, Filter, Edit2, Trash2, Shield, X, Check, AlertCircle, Plus, Save } from "lucide-react";
import axios from "axios";

// Configuración de axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
});

// Interceptor para agregar el token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

const UsersPage = () => {
  // Estados
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  
  // Modal de permisos
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [userPermissions, setUserPermissions] = useState([]);
  const [userRolePermissions, setUserRolePermissions] = useState([]);
  const [availablePermissions, setAvailablePermissions] = useState([]);
  const [assigningPermission, setAssigningPermission] = useState(false);
  
  // Modal de nuevo usuario
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    role_id: ""
  });
  const [creatingUser, setCreatingUser] = useState(false);
  
  // Modal de editar usuario
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editUserForm, setEditUserForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    role_id: "",
    estado: 1
  });
  const [updatingUser, setUpdatingUser] = useState(false);
  
  // Modal de crear permiso
  const [showCreatePermissionModal, setShowCreatePermissionModal] = useState(false);
  const [newPermission, setNewPermission] = useState({
    nombre: "",
    slug: "",
    modulo: "",
    descripcion: "",
    nivel_minimo: null
  });
  const [creatingPermission, setCreatingPermission] = useState(false);
  const [permissionModules, setPermissionModules] = useState([]);


// Modal de editar permiso
const [showEditPermissionModal, setShowEditPermissionModal] = useState(false);
const [editingPermission, setEditingPermission] = useState(null);
const [editPermissionForm, setEditPermissionForm] = useState({
  nombre: "",
  slug: "",
  modulo: "",
  descripcion: "",
  nivel_minimo: null,
  estado: 1
});
const [updatingPermission, setUpdatingPermission] = useState(false);
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Cargar datos iniciales
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    fetchAllData();
    fetchPermissionModules();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchUsers(), fetchRoles(), fetchPermissions()]);
    } catch (err) {
      console.error("Error cargando datos:", err);
      setError("Error al cargar los datos del servidor");
    } finally {
      setLoading(false);
    }
  };

  // Fetch usuarios
  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      throw err;
    }
  };

  // Fetch roles
  const fetchRoles = async () => {
    try {
      const response = await api.get("/roles");
      if (response.data.success) {
        setRoles(response.data.data || []);
      }
    } catch (err) {
      console.error("Error fetching roles:", err);
      setRoles([]);
    }
  };

  // Fetch todos los permisos
  const fetchPermissions = async () => {
    try {
      const response = await api.get("/permissions");
      if (response.data.success) {
        const allPermissions = [];
        Object.values(response.data.data).forEach(modulePermissions => {
          allPermissions.push(...modulePermissions);
        });
        setPermissions(allPermissions);
      }
    } catch (err) {
      console.error("Error fetching permissions:", err);
      setPermissions([]);
    }
  };

  // Fetch módulos de permisos para el selector
  const fetchPermissionModules = async () => {
    try {
      const response = await api.get("/permissions/modules");
      if (response.data.success) {
        setPermissionModules(Object.keys(response.data.data));
      }
    } catch (err) {
      console.error("Error fetching permission modules:", err);
      setPermissionModules(["compras", "produccion", "calidad", "inventario", "ventas", "finanzas", "usuarios", "reportes","administracion"]);
    }
  };

  // Fetch permisos de un usuario específico
  const fetchUserPermissions = async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/permissions`);
      if (response.data.success) {
        const data = response.data.data;
        setUserPermissions(data.additional_permissions || []);
        setUserRolePermissions(data.role_effective_permissions || []);
        
        const userPermIds = (data.additional_permissions || []).map(p => p.id);
        const available = permissions.filter(p => !userPermIds.includes(p.id));
        setAvailablePermissions(available);
      }
    } catch (err) {
      console.error("Error fetching user permissions:", err);
      setUserPermissions([]);
      setUserRolePermissions([]);
      setAvailablePermissions([]);
    }
  };

  // Abrir modal de permisos
  const openPermissionsModal = async (user) => {
    setSelectedUser(user);
    setShowPermissionsModal(true);
    await fetchUserPermissions(user.id);
  };

  // Abrir modal de editar usuario
  const openEditUserModal = (user) => {
    setEditingUser(user);
    setEditUserForm({
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      role_id: user.role_id,
      estado: user.estado
    });
    setShowEditUserModal(true);
  };

  // Actualizar usuario
  const updateUser = async (e) => {
    e.preventDefault();
    setUpdatingUser(true);
    try {
      const response = await api.put(`/users/${editingUser.id}`, editUserForm);
      if (response.data.id) {
        alert("Usuario actualizado exitosamente");
        setShowEditUserModal(false);
        setEditingUser(null);
        await fetchUsers();
      }
    } catch (err) {
      console.error("Error updating user:", err);
      alert(err.response?.data?.message || "Error al actualizar usuario");
    } finally {
      setUpdatingUser(false);
    }
  };

  // Crear nuevo permiso
  const createPermission = async (e) => {
    e.preventDefault();
    setCreatingPermission(true);
    try {
      const response = await api.post("/permissions", newPermission);
      if (response.data.success) {
        alert("Permiso creado exitosamente");
        setShowCreatePermissionModal(false);
        setNewPermission({
          nombre: "",
          slug: "",
          modulo: "",
          descripcion: "",
          nivel_minimo: null
        });
        await fetchPermissions();
      } else {
        alert(response.data.message || "Error al crear permiso");
      }
    } catch (err) {
      console.error("Error creating permission:", err);
      alert(err.response?.data?.message || "Error al crear permiso");
    } finally {
      setCreatingPermission(false);
    }
  };


// Abrir modal de editar permiso
const openEditPermissionModal = (permission) => {
  setEditingPermission(permission);
  setEditPermissionForm({
    nombre: permission.nombre,
    slug: permission.slug,
    modulo: permission.modulo,
    descripcion: permission.descripcion || "",
    nivel_minimo: permission.nivel_minimo,
    estado: permission.estado ? 1 : 0
  });
  setShowEditPermissionModal(true);
   console.log("showEditPermissionModal:", true); // ← Para debug
};

// Actualizar permiso
const updatePermission = async (e) => {
  e.preventDefault();
  setUpdatingPermission(true);
  try {
    const response = await api.put(`/permissions/${editingPermission.id}`, editPermissionForm);
    if (response.data.success) {
      alert("Permiso actualizado exitosamente");
      setShowEditPermissionModal(false);
      setEditingPermission(null);
      await fetchPermissions();
    } else {
      alert(response.data.message || "Error al actualizar permiso");
    }
  } catch (err) {
    console.error("Error updating permission:", err);
    alert(err.response?.data?.message || "Error al actualizar permiso");
  } finally {
    setUpdatingPermission(false);
  }
};


// Eliminar/Desactivar permiso
const deletePermission = async (permission) => {
  if (confirm(`¿Estás seguro de eliminar el permiso "${permission.nombre}"?`)) {
    try {
      const response = await api.delete(`/permissions/${permission.id}`);
      if (response.data.success) {
        alert(response.data.message);
        await fetchPermissions();
      } else {
        alert(response.data.message || "Error al eliminar permiso");
      }
    } catch (err) {
      console.error("Error deleting permission:", err);
      alert(err.response?.data?.message || "Error al eliminar permiso");
    }
  }
};

  // Asignar permiso
  const assignPermission = async (permissionId) => {
    setAssigningPermission(true);
    try {
      const response = await api.post(`/users/${selectedUser.id}/permissions`, {
        permission_id: permissionId,
        motivo: "Asignado desde el panel de administración",
      });
      if (response.data.success) {
        await fetchUserPermissions(selectedUser.id);
      } else {
        alert(response.data.message || "Error al asignar permiso");
      }
    } catch (err) {
      console.error("Error assigning permission:", err);
      alert(err.response?.data?.message || "Error al asignar permiso");
    } finally {
      setAssigningPermission(false);
    }
  };

  // Remover permiso
  const removePermission = async (permissionId) => {
    try {
      const response = await api.delete(`/users/${selectedUser.id}/permissions/${permissionId}`);
      if (response.data.success) {
        await fetchUserPermissions(selectedUser.id);
      } else {
        alert(response.data.message || "Error al remover permiso");
      }
    } catch (err) {
      console.error("Error removing permission:", err);
      alert(err.response?.data?.message || "Error al remover permiso");
    }
  };

  // Crear usuario
  const createUser = async (e) => {
    e.preventDefault();
    setCreatingUser(true);
    try {
      const response = await api.post("/users", newUser);
      if (response.data.id) {
        alert("Usuario creado exitosamente");
        setShowNewUserModal(false);
        setNewUser({ nombre: "", apellido: "", email: "", password: "", role_id: "" });
        await fetchUsers();
      }
    } catch (err) {
      console.error("Error creating user:", err);
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        alert(Object.values(errors).flat().join("\n"));
      } else {
        alert(err.response?.data?.message || "Error al crear usuario");
      }
    } finally {
      setCreatingUser(false);
    }
  };

  // Cambiar estado del usuario
  const toggleUserStatus = async (user) => {
    try {
      const response = await api.put(`/users/${user.id}`, {
        estado: user.estado === 1 ? 0 : 1
      });
      if (response.data.id) {
        await fetchUsers();
      }
    } catch (err) {
      console.error("Error toggling user status:", err);
      alert("Error al cambiar estado del usuario");
    }
  };

  // Obtener todos los roles planos para selects
  const getFlatRoles = () => {
    const flat = [];
    roles.forEach(roleGroup => {
      if (roleGroup.roles && Array.isArray(roleGroup.roles)) {
        roleGroup.roles.forEach(role => {
          flat.push({
            id: role.id,
            nombre: role.nombre,
            grupo: roleGroup.grupo,
            nivel: role.nivel,
            permisos: role.permisos
          });
        });
      }
    });
    return flat;
  };

  // Filtrar usuarios
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === "" || 
      user.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.apellido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === "" || user.role?.nombre === selectedRole;
    
    const matchesStatus = selectedStatus === "" || 
      (selectedStatus === "Activo" && user.estado === 1) ||
      (selectedStatus === "Inactivo" && user.estado === 0);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Paginación
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats calculados
  const stats = [
    { label: "TOTAL USUARIOS", value: users.length.toString() },
    { label: "USUARIOS ACTIVOS", value: users.filter(u => u.estado === 1).length.toString(), subtext: "Activos" },
    { label: "ROLES", value: getFlatRoles().length.toString() },
    { label: "PERMISOS TOTALES", value: permissions.length.toString(), subtext: "Disponibles" },
  ];

  // Obtener color de avatar
  const getAvatarColor = (nombre) => {
    const colors = ["bg-blue-500", "bg-orange-500", "bg-teal-500", "bg-purple-500", "bg-pink-500", "bg-green-500"];
    const index = nombre ? nombre.length % colors.length : 0;
    return colors[index];
  };

  // Agrupar permisos por módulo
  const groupPermissionsByModule = (perms) => {
    const grouped = {};
    perms.forEach(perm => {
      if (!grouped[perm.modulo]) grouped[perm.modulo] = [];
      grouped[perm.modulo].push(perm);
    });
    return grouped;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Gestión de Usuarios</h1>
          <p className="text-sm text-gray-500 mt-1">Administra los usuarios y sus permisos en el sistema</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreatePermissionModal(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 flex items-center gap-2"
            title="Crear nuevo permiso"
          >
            <Plus size={18} />
            <span>Nuevo Permiso</span>
          </button>
          <button
            onClick={() => setShowNewUserModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Nuevo Usuario</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{stat.label}</div>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              {stat.subtext && <div className="text-sm mb-1 text-gray-500">{stat.subtext}</div>}
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por nombre, apellido o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Todos los Roles</option>
            {getFlatRoles().map(role => (
              <option key={role.id} value={role.nombre}>{role.nombre}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Todos los Estados</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
          <button 
            onClick={() => {
              setSearchTerm("");
              setSelectedRole("");
              setSelectedStatus("");
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <Filter size={18} />
            <span>Limpiar</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Usuario</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rol</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nivel</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No se encontraron usuarios
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${getAvatarColor(user.nombre)} rounded-full flex items-center justify-center text-white font-medium`}>
                          {user.nombre?.charAt(0)}{user.apellido?.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{user.nombre} {user.apellido}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                        {user.role?.nombre || "Sin rol"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full" 
                            style={{ width: `${((user.role?.permisos || 0) / 20) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{user.role?.permisos || 0}/20</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${user.estado === 1 ? "bg-green-500" : "bg-gray-400"}`}></div>
                        <span className={`text-sm font-medium ${user.estado === 1 ? "text-green-600" : "text-gray-500"}`}>
                          {user.estado === 1 ? "Activo" : "Inactivo"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => openEditUserModal(user)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" 
                          title="Editar usuario"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => toggleUserStatus(user)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title={user.estado === 1 ? "Desactivar usuario" : "Activar usuario"}
                        >
                          <Trash2 size={16} />
                        </button>
                        <button
                          onClick={() => openPermissionsModal(user)}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Gestionar permisos"
                        >
                          <Shield size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, filteredUsers.length)} de {filteredUsers.length} usuarios
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded disabled:opacity-50"
              >
                Anterior
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 text-sm rounded ${currentPage === pageNum ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-200"}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Editar Usuario */}
      {showEditUserModal && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Editar Usuario</h2>
              <button onClick={() => setShowEditUserModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={updateUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                <input
                  type="text"
                  value={editUserForm.nombre}
                  onChange={(e) => setEditUserForm({ ...editUserForm, nombre: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apellido *</label>
                <input
                  type="text"
                  value={editUserForm.apellido}
                  onChange={(e) => setEditUserForm({ ...editUserForm, apellido: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={editUserForm.email}
                  onChange={(e) => setEditUserForm({ ...editUserForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rol *</label>
                <select
                  value={editUserForm.role_id}
                  onChange={(e) => setEditUserForm({ ...editUserForm, role_id: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Seleccionar rol</option>
                  {getFlatRoles().map(role => (
                    <option key={role.id} value={role.id}>
                      {role.nombre} (Nivel {role.permisos}/20)
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  value={editUserForm.estado}
                  onChange={(e) => setEditUserForm({ ...editUserForm, estado: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value={1}>Activo</option>
                  <option value={0}>Inactivo</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditUserModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={updatingUser}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  {updatingUser ? "Guardando..." : "Guardar Cambios"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Crear Permiso */}
      {showCreatePermissionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Crear Nuevo Permiso</h2>
              <button onClick={() => setShowCreatePermissionModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={createPermission} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Permiso *</label>
                <input
                  type="text"
                  value={newPermission.nombre}
                  onChange={(e) => setNewPermission({ ...newPermission, nombre: e.target.value })}
                  placeholder="Ej: Aprobar Órdenes de Compra"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                <input
                  type="text"
                  value={newPermission.slug}
                  onChange={(e) => setNewPermission({ ...newPermission, slug: e.target.value })}
                  placeholder="Ej: purchase-order.approve"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">Identificador único. Usa formato: modulo.accion</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Módulo *</label>
                <select
                  value={newPermission.modulo}
                  onChange={(e) => setNewPermission({ ...newPermission, modulo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Seleccionar módulo</option>
                  {permissionModules.map(mod => (
                    <option key={mod} value={mod}>{mod}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nivel Mínimo Requerido</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={newPermission.nivel_minimo || ""}
                  onChange={(e) => setNewPermission({ ...newPermission, nivel_minimo: e.target.value ? parseInt(e.target.value) : null })}
                  placeholder="Opcional"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-xs text-gray-400 mt-1">Nivel mínimo que debe tener el rol para obtener este permiso automáticamente</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={newPermission.descripcion}
                  onChange={(e) => setNewPermission({ ...newPermission, descripcion: e.target.value })}
                  rows={3}
                  placeholder="Describe qué hace este permiso..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreatePermissionModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={creatingPermission}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                >
                  {creatingPermission ? "Creando..." : "Crear Permiso"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


{/* Modal de Editar Permiso */}
{showEditPermissionModal && editingPermission && (
  <div 
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" 
    style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        setShowEditPermissionModal(false);
      }
    }}
  >
    <div className="bg-white rounded-lg w-full max-w-md mx-4 shadow-xl">
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Editar Permiso</h2>
        <button onClick={() => setShowEditPermissionModal(false)} className="text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={updatePermission} className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Permiso *</label>
          <input
            type="text"
            value={editPermissionForm.nombre}
            onChange={(e) => setEditPermissionForm({ ...editPermissionForm, nombre: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
          <input
            type="text"
            value={editPermissionForm.slug}
            onChange={(e) => setEditPermissionForm({ ...editPermissionForm, slug: e.target.value })}
            placeholder="Ej: modulo.accion"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <p className="text-xs text-gray-400 mt-1">Identificador único. Usa formato: modulo.accion</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Módulo *</label>
          <select
            value={editPermissionForm.modulo}
            onChange={(e) => setEditPermissionForm({ ...editPermissionForm, modulo: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Seleccionar módulo</option>
            {permissionModules.map(mod => (
              <option key={mod} value={mod}>{mod}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nivel Mínimo Requerido</label>
          <input
            type="number"
            min="1"
            max="20"
            value={editPermissionForm.nivel_minimo || ""}
            onChange={(e) => setEditPermissionForm({ ...editPermissionForm, nivel_minimo: e.target.value ? parseInt(e.target.value) : null })}
            placeholder="Opcional"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <p className="text-xs text-gray-400 mt-1">Nivel mínimo que debe tener el rol para obtener este permiso automáticamente</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea
            value={editPermissionForm.descripcion}
            onChange={(e) => setEditPermissionForm({ ...editPermissionForm, descripcion: e.target.value })}
            rows={3}
            placeholder="Describe qué hace este permiso..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
          <select
            value={editPermissionForm.estado}
            onChange={(e) => setEditPermissionForm({ ...editPermissionForm, estado: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value={1}>Activo</option>
            <option value={0}>Inactivo</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => setShowEditPermissionModal(false)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={updatingPermission}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {updatingPermission ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      {/* Modal de Permisos de Usuario */}
      {showPermissionsModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[85vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Gestionar Permisos</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedUser.nombre} {selectedUser.apellido} - {selectedUser.role?.nombre}
                  <span className="ml-2 text-xs text-gray-400">(Nivel de rol: {selectedUser.role?.permisos || 0}/20)</span>
                </p>
              </div>
              <button onClick={() => setShowPermissionsModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-auto max-h-[60vh]">
              {/* Permisos por nivel de rol */}
              {userRolePermissions.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    Permisos por Nivel de Rol (Nivel {selectedUser.role?.permisos})
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {Object.entries(groupPermissionsByModule(userRolePermissions)).map(([modulo, perms]) => (
                        <div key={modulo} className="text-sm">
                          <span className="font-medium text-gray-700">{modulo}:</span>
                          <span className="text-gray-600 ml-1">{perms.length}</span>
                        </div>
                      ))}
                    </div>
                    <details className="mt-3">
                      <summary className="text-xs text-indigo-600 cursor-pointer hover:text-indigo-800">Ver todos</summary>
                      <div className="mt-2 space-y-1">
                        {userRolePermissions.map(perm => (
                          <div key={perm.id} className="text-xs text-gray-500">• {perm.nombre}</div>
                        ))}
                      </div>
                    </details>
                  </div>
                </div>
              )}

              {/* Permisos adicionales asignados */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Shield size={16} className="text-purple-500" />
                  Permisos Adicionales Asignados
                  {userPermissions.length > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full">
                      {userPermissions.length}
                    </span>
                  )}
                </h3>
                {userPermissions.length === 0 ? (
                  <p className="text-sm text-gray-500 italic p-4 bg-gray-50 rounded-lg">
                    No tiene permisos adicionales asignados
                  </p>
                ) : (
                  <div className="space-y-2">
                    {userPermissions.map((perm) => (
                      <div key={perm.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{perm.nombre}</div>
                          <div className="text-xs text-gray-500">
                            {perm.modulo} • {perm.slug}
                            {perm.nivel_minimo && <span className="ml-2 text-indigo-500">Nivel mínimo: {perm.nivel_minimo}</span>}
                          </div>
                        </div>
                        <button
                          onClick={() => removePermission(perm.id)}
                          className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

          {/* Permisos disponibles para asignar */}
<div>
  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
    <Plus size={16} className="text-indigo-500" />
    Permisos Disponibles para Asignar
  </h3>
  {availablePermissions.length === 0 ? (
    <p className="text-sm text-gray-500 italic p-4 bg-gray-50 rounded-lg">
      No hay más permisos disponibles para asignar
    </p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {availablePermissions.map((perm) => (
        <div key={perm.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors">
          <div className="flex-1">
            <div className="font-medium text-gray-900 text-sm">{perm.nombre}</div>
            <div className="text-xs text-gray-500">
              {perm.modulo} • {perm.slug}
              {perm.nivel_minimo && <span className="ml-2 text-indigo-500">Req. nivel {perm.nivel_minimo}</span>}
            </div>
          </div>
          <div className="flex items-center gap-1">
            {/* Botón Editar */}
            <button
              onClick={() => openEditPermissionModal(perm)}
              className="p-1 text-gray-400 hover:text-indigo-600 rounded transition-colors"
              title="Editar permiso"
            >
              <Edit2 size={14} />
            </button>
            {/* Botón Eliminar */}
            <button
              onClick={() => deletePermission(perm)}
              className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
              title="Eliminar permiso"
            >
              <Trash2 size={14} />
            </button>
            {/* Botón Asignar */}
            <button
              onClick={() => assignPermission(perm.id)}
              disabled={assigningPermission}
              className="px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50"
            >
              {assigningPermission ? "Asignando..." : "Asignar"}
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowPermissionsModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Nuevo Usuario */}
      {showNewUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Nuevo Usuario</h2>
              <button onClick={() => setShowNewUserModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={createUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                <input
                  type="text"
                  value={newUser.nombre}
                  onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apellido *</label>
                <input
                  type="text"
                  value={newUser.apellido}
                  onChange={(e) => setNewUser({ ...newUser, apellido: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña *</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  minLength={8}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rol *</label>
                <select
                  value={newUser.role_id}
                  onChange={(e) => setNewUser({ ...newUser, role_id: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Seleccionar rol</option>
                  {getFlatRoles().map(role => (
                    <option key={role.id} value={role.id}>
                      {role.nombre} (Nivel {role.permisos}/20)
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewUserModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={creatingUser}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  {creatingUser ? "Creando..." : "Crear Usuario"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
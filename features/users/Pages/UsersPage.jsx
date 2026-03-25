import React, { useState, useEffect } from "react";
import { Search, Bell, Moon, Filter, Edit2, Trash2, Shield, X, Check, AlertCircle, Plus } from "lucide-react";
import axios from "axios";

// Configuración de axios
const api = axios.create({
  baseURL: "http://localhost:8000/api",
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
      window.location.href = "/login";
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

  // Fetch permisos de un usuario específico
  const fetchUserPermissions = async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/permissions`);
      if (response.data.success) {
        const data = response.data.data;
        setUserPermissions(data.additional_permissions || []);
        setUserRolePermissions(data.role_effective_permissions || []);
        
        // Filtrar permisos disponibles (no asignados al usuario)
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

  // Stats calculados desde datos reales
  const stats = [
    {
      label: "TOTAL USUARIOS",
      value: users.length.toString(),
    },
    {
      label: "USUARIOS ACTIVOS",
      value: users.filter(u => u.estado === 1).length.toString(),
      subtext: "Activos",
    },
    {
      label: "ROLES",
      value: getFlatRoles().length.toString(),
    },
    {
      label: "PERMISOS TOTALES",
      value: permissions.length.toString(),
      subtext: "Disponibles",
    },
  ];

  // Obtener color de avatar basado en nombre
  const getAvatarColor = (nombre) => {
    const colors = ["bg-blue-500", "bg-orange-500", "bg-teal-500", "bg-purple-500", "bg-pink-500", "bg-green-500"];
    const index = nombre ? nombre.length % colors.length : 0;
    return colors[index];
  };

  // Agrupar permisos por módulo para visualización
  const groupPermissionsByModule = (perms) => {
    const grouped = {};
    perms.forEach(perm => {
      if (!grouped[perm.modulo]) {
        grouped[perm.modulo] = [];
      }
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
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
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
          <button className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg">
            <Bell size={20} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg">
            <Moon size={20} />
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Permisos */}
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
                        <button
                          onClick={() => assignPermission(perm.id)}
                          disabled={assigningPermission}
                          className="px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50"
                        >
                          {assigningPermission ? "Asignando..." : "Asignar"}
                        </button>
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
                  onChange={(e) => setNewUser({ ...newUser, role_id: e.target.value })}
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
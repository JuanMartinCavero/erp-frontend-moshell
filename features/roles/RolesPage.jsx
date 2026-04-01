import React, { useState, useEffect } from "react";
import { useRoles } from "../../hooks/useRoles";
import { Shield, Plus, X, Check, Trash2, Edit2, Layers, AlertCircle } from "lucide-react";
import api from "../../services/api";

// ── Modal reutilizable ────────────────────────────────────────────────────────
function Modal({ title, onClose, children, size = "max-w-lg" }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${size} mx-4 overflow-hidden`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none">&times;</button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

// ── Formulario de Rol ─────────────────────────────────────────────────────────
function RolForm({ initial = {}, grupos = [], onSubmit, onCancel, loading }) {
  const gruposList = grupos.map(g => ({ id: g.grupo, nombre: g.grupo }));

  const [form, setForm] = React.useState({
    nombre:    initial.nombre    || "",
    nivel:     initial.nivel     || "bajo",
    permisos:  initial.permisos  || 1,
    grupo:     initial.grupo      || gruposList[0]?.nombre || "Gerencia General",
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Nombre del rol</label>
        <input
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          value={form.nombre}
          onChange={e => set("nombre", e.target.value)}
          placeholder="Ej. Supervisor de Calidad"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Grupo / Área</label>
        <select
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          value={form.grupo}
          onChange={e => set("grupo", e.target.value)}
        >
          {gruposList.map(g => <option key={g.id} value={g.nombre}>{g.nombre}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Nivel de acceso</label>
        <select
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          value={form.nivel}
          onChange={e => set("nivel", e.target.value)}
        >
          <option value="alto">Alto</option>
          <option value="medio">Medio</option>
          <option value="bajo">Bajo</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Número de permisos (1-20)</label>
        <input
          type="number" min="1" max="20"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          value={form.permisos}
          onChange={e => set("permisos", Number(e.target.value))}
        />
        <p className="text-xs text-gray-400 mt-1">Define el nivel jerárquico del rol. Los permisos con nivel mínimo ≤ este número estarán disponibles por defecto.</p>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          onClick={() => onSubmit(form)}
          disabled={loading || !form.nombre.trim()}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium py-2 rounded-lg transition-colors"
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>
        <button
          onClick={onCancel}
          className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium py-2 rounded-lg transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

// ── Modal de Gestión de Permisos por Rol ──────────────────────────────────────
function RolePermissionsModal({ role, onClose, onPermissionChange }) {
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [rolePermissions, setRolePermissions] = useState([]);
  const [availablePermissions, setAvailablePermissions] = useState([]);
  const [allPermissions, setAllPermissions] = useState([]);

  useEffect(() => {
    if (role) {
      fetchRolePermissions();
      fetchAllPermissions();
    }
  }, [role]);

  const fetchRolePermissions = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/roles/${role.id}/permissions`);
      if (response.data.success) {
        setRolePermissions(response.data.data.specific_permissions || []);
      }
    } catch (error) {
      console.error("Error fetching role permissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllPermissions = async () => {
    try {
      const response = await api.get("/permissions");
      if (response.data.success) {
        const allPerms = [];
        Object.values(response.data.data).forEach(modulePerms => {
          allPerms.push(...modulePerms);
        });
        setAllPermissions(allPerms);
      }
    } catch (error) {
      console.error("Error fetching all permissions:", error);
    }
  };

  // Actualizar permisos disponibles (excluyendo los ya asignados)
  useEffect(() => {
    const rolePermIds = rolePermissions.map(p => p.id);
    const available = allPermissions.filter(p => !rolePermIds.includes(p.id));
    setAvailablePermissions(available);
  }, [rolePermissions, allPermissions]);

  const assignPermission = async (permissionId) => {
    setAssigning(true);
    try {
      const response = await api.post(`/roles/${role.id}/permissions`, {
        permission_id: permissionId,
        motivo: "Asignado desde la gestión de roles"
      });
      if (response.data.success) {
        await fetchRolePermissions();
        if (onPermissionChange) onPermissionChange();
      } else {
        alert(response.data.message || "Error al asignar permiso");
      }
    } catch (error) {
      console.error("Error assigning permission:", error);
      alert(error.response?.data?.message || "Error al asignar permiso");
    } finally {
      setAssigning(false);
    }
  };

  const removePermission = async (permissionId) => {
    try {
      const response = await api.delete(`/roles/${role.id}/permissions/${permissionId}`);
      if (response.data.success) {
        await fetchRolePermissions();
        if (onPermissionChange) onPermissionChange();
      } else {
        alert(response.data.message || "Error al remover permiso");
      }
    } catch (error) {
      console.error("Error removing permission:", error);
      alert(error.response?.data?.message || "Error al remover permiso");
    }
  };

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
      <Modal title={`Permisos de ${role?.nombre}`} onClose={onClose} size="max-w-4xl">
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal title={`Permisos de ${role?.nombre}`} onClose={onClose} size="max-w-4xl">
      <div className="space-y-6 max-h-[60vh] overflow-y-auto">
        {/* Info del rol */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-900">{role?.nombre}</p>
              <p className="text-xs text-gray-500">Nivel jerárquico: {role?.permisos}/20</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Grupo: {role?.grupo}</p>
              <p className="text-xs text-gray-500">Nivel: {role?.nivel}</p>
            </div>
          </div>
        </div>

        {/* Permisos específicos asignados al rol */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Shield size={16} className="text-purple-500" />
            Permisos Específicos Asignados
            {rolePermissions.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full">
                {rolePermissions.length}
              </span>
            )}
          </h3>
          {rolePermissions.length === 0 ? (
            <p className="text-sm text-gray-500 italic p-4 bg-gray-50 rounded-lg">
              Este rol no tiene permisos específicos asignados. Solo tiene los permisos por su nivel jerárquico.
            </p>
          ) : (
            <div className="space-y-2">
              {Object.entries(groupPermissionsByModule(rolePermissions)).map(([modulo, perms]) => (
                <div key={modulo} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 uppercase">
                    {modulo}
                  </div>
                  <div className="divide-y divide-gray-100">
                    {perms.map(perm => (
                      <div key={perm.id} className="flex items-center justify-between p-3 hover:bg-gray-50">
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{perm.nombre}</div>
                          <div className="text-xs text-gray-500">{perm.slug}</div>
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
              No hay más permisos disponibles para asignar a este rol.
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
                    disabled={assigning}
                    className="px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {assigning ? "Asignando..." : "Asignar"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Nota sobre jerarquía */}
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-xs text-blue-700">
            <strong>Nota:</strong> Los permisos con nivel mínimo ≤ {role?.permisos} ya están disponibles por jerarquía.
            Los permisos específicos que asignes aquí son adicionales y pueden dar acceso a funcionalidades que normalmente no estarían disponibles por nivel.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-gray-100">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
}

// ── Tarjeta de Rol ────────────────────────────────────────────────────────────
function RolCard({ rol, grupoNombre, onEdit, onDelete, onManagePermissions }) {
  const GROUP_STYLES = {
    "Gerencia General":  { bg: "bg-violet-50", border: "border-violet-200", badge: "bg-violet-100 text-violet-700", dot: "bg-violet-500", header: "bg-violet-600" },
    "Administración":    { bg: "bg-sky-50",    border: "border-sky-200",    badge: "bg-sky-100 text-sky-700",       dot: "bg-sky-500",    header: "bg-sky-600"    },
    "Operaciones":       { bg: "bg-emerald-50",border: "border-emerald-200",badge: "bg-emerald-100 text-emerald-700",dot: "bg-emerald-500",header: "bg-emerald-600"},
  };
  
  const NIVEL_BADGE = {
    alto:  "bg-red-100 text-red-700 border border-red-200",
    medio: "bg-amber-100 text-amber-700 border border-amber-200",
    bajo:  "bg-gray-100 text-gray-600 border border-gray-200",
  };

  const st = GROUP_STYLES[grupoNombre] || GROUP_STYLES["Operaciones"];
  
  return (
    <div className={`flex items-center justify-between px-4 py-3 rounded-xl border ${st.border} ${st.bg} group transition-all hover:shadow-sm`}>
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${st.dot}`} />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-800 truncate">{rol.nombre}</p>
          <p className="text-xs text-gray-500">{rol.permisos} permisos · {rol.usuarios} usuario{rol.usuarios !== 1 ? "s" : ""}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-3 flex-shrink-0">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${NIVEL_BADGE[rol.nivel]}`}>
          {rol.nivel}
        </span>
        <button
          onClick={() => onManagePermissions(rol)}
          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-purple-600 transition-all p-1 rounded"
          title="Gestionar permisos"
        >
          <Shield size={14} />
        </button>
        <button
          onClick={() => onEdit(rol)}
          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-indigo-600 transition-all p-1 rounded"
          title="Editar"
        >
          <Edit2 size={14} />
        </button>
        <button
          onClick={() => onDelete(rol)}
          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-1 rounded"
          title="Eliminar"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

// ── Tarjeta de Grupo ──────────────────────────────────────────────────────────
function GrupoCard({ grupo, onEditRol, onDeleteRol, onAddRol, onManagePermissions }) {
  const GROUP_STYLES = {
    "Gerencia General":  { bg: "bg-violet-50", border: "border-violet-200", badge: "bg-violet-100 text-violet-700", dot: "bg-violet-500", header: "bg-violet-600" },
    "Administración":    { bg: "bg-sky-50",    border: "border-sky-200",    badge: "bg-sky-100 text-sky-700",       dot: "bg-sky-500",    header: "bg-sky-600"    },
    "Operaciones":       { bg: "bg-emerald-50",border: "border-emerald-200",badge: "bg-emerald-100 text-emerald-700",dot: "bg-emerald-500",header: "bg-emerald-600"},
  };

  const [expandido, setExpandido] = React.useState(true);
  const st = GROUP_STYLES[grupo.grupo] || GROUP_STYLES["Operaciones"];
  const totalUsuarios = grupo.roles.reduce((s, r) => s + r.usuarios, 0);

  return (
    <div className={`rounded-2xl border ${st.border} overflow-hidden shadow-sm`}>
      {/* Cabecera del grupo */}
      <div
        className={`${st.header} px-5 py-3.5 flex items-center justify-between cursor-pointer select-none`}
        onClick={() => setExpandido(e => !e)}
      >
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-white font-semibold text-sm">{grupo.grupo}</span>
            <span className="text-white/70 text-xs">{grupo.descripcion}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right mr-2">
            <p className="text-white text-xs font-medium">{grupo.roles.length} roles</p>
            <p className="text-white/70 text-xs">{totalUsuarios} usuarios</p>
          </div>
          <svg
            className={`w-4 h-4 text-white/80 transition-transform ${expandido ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>

      {/* Lista de roles */}
      {expandido && (
        <div className={`${st.bg} px-4 py-3 space-y-2`}>
          {grupo.roles.map(rol => (
            <RolCard
              key={rol.id}
              rol={rol}
              grupoNombre={grupo.grupo}
              onEdit={onEditRol}
              onDelete={onDeleteRol}
              onManagePermissions={onManagePermissions}
            />
          ))}
          <button
            onClick={() => onAddRol(grupo)}
            className="w-full mt-1 py-2 text-xs font-medium text-gray-500 hover:text-indigo-600 border border-dashed border-gray-300 hover:border-indigo-400 rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus size={14} />
            Agregar rol a {grupo.grupo}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Página principal ──────────────────────────────────────────────────────────
export default function RolesPage() {
  const {
    grupos,
    loading,
    initialLoading,
    toast,
    modalCrear,
    modalEditar,
    modalEliminar,
    setModalCrear,
    setModalEditar,
    setModalEliminar,
    totalRoles,
    totalUsuarios,
    handleCrear,
    handleEditar,
    handleEliminar,
  } = useRoles();

  const [busqueda, setBusqueda] = React.useState("");
  const [permissionModalRole, setPermissionModalRole] = React.useState(null);

  // Filtro de búsqueda
  const gruposFiltrados = grupos
    .filter(grupo => grupo && typeof grupo === 'object')
    .map(g => ({
      ...g,
      roles: Array.isArray(g.roles) 
        ? g.roles.filter(r => r && r.nombre && r.nombre.toLowerCase().includes(busqueda.toLowerCase()))
        : []
    }))
    .filter(g => g.roles.length > 0 || busqueda === "");

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando roles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium transition-all ${
          toast.tipo === "error" ? "bg-red-600 text-white" : "bg-gray-900 text-white"
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Encabezado */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Gestión de Roles</h1>
          <p className="text-sm text-gray-500 mt-0.5">Administra los roles, niveles de acceso y permisos por rol.</p>
        </div>
        <button
          onClick={() => setModalCrear(grupos[0] || { grupo: "Gerencia General" })}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          <Plus size={18} />
          Nuevo Rol
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Grupos", valor: grupos.length },
          { label: "Roles totales", valor: totalRoles },
          { label: "Usuarios asignados", valor: totalUsuarios },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm">
            <p className="text-2xl font-bold text-gray-900">{s.valor}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Búsqueda */}
      <div className="relative mb-5">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
        </svg>
        <input
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder:text-gray-400"
          placeholder="Buscar rol..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </div>

      {/* Grupos de roles */}
      <div className="space-y-4">
        {gruposFiltrados.length > 0 ? (
          gruposFiltrados.map(grupo => (
            <GrupoCard
              key={grupo.grupo}
              grupo={grupo}
              onEditRol={(rol) => setModalEditar({ rol, grupoId: grupo.grupo })}
              onDeleteRol={(rol) => setModalEliminar({ rol, grupoId: grupo.grupo })}
              onAddRol={(g) => setModalCrear(g)}
              onManagePermissions={(rol) => setPermissionModalRole(rol)}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
            <p className="text-gray-500">No hay roles para mostrar</p>
          </div>
        )}
      </div>

      {/* Modal: Crear rol */}
      {modalCrear && (
        <Modal title="Nuevo Rol" onClose={() => setModalCrear(null)}>
          <RolForm
            grupos={grupos}
            initial={{ grupo: modalCrear.grupo }}
            onSubmit={handleCrear}
            onCancel={() => setModalCrear(null)}
            loading={loading}
          />
        </Modal>
      )}

      {/* Modal: Editar rol */}
      {modalEditar && (
        <Modal title="Editar Rol" onClose={() => setModalEditar(null)}>
          <RolForm
            grupos={grupos}
            initial={{ 
              ...modalEditar.rol, 
              grupo: modalEditar.rol.grupo 
            }}
            onSubmit={handleEditar}
            onCancel={() => setModalEditar(null)}
            loading={loading}
          />
        </Modal>
      )}

      {/* Modal: Confirmar eliminar */}
      {modalEliminar && (
        <Modal title="Eliminar Rol" onClose={() => setModalEliminar(null)}>
          <p className="text-sm text-gray-600 mb-5">
            ¿Estás seguro de eliminar el rol <span className="font-semibold text-gray-800">"{modalEliminar.rol.nombre}"</span>?
            Esta acción no se puede deshacer.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleEliminar}
              disabled={loading}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-medium py-2 rounded-lg transition-colors"
            >
              {loading ? "Eliminando..." : "Sí, eliminar"}
            </button>
            <button
              onClick={() => setModalEliminar(null)}
              className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium py-2 rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </Modal>
      )}

      {/* Modal: Gestión de permisos por rol */}
      {permissionModalRole && (
        <RolePermissionsModal
          role={permissionModalRole}
          onClose={() => setPermissionModalRole(null)}
          onPermissionChange={() => {
            // Opcional: refrescar datos si es necesario
          }}
        />
      )}
    </div>
  );
}
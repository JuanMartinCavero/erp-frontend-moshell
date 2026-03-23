import React from "react"; // ← Agrega esta línea
import { useRoles } from "../../hooks/useRoles";

// ── Modal reutilizable ────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
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
  // Extraer los nombres de los grupos únicos
  const gruposList = grupos.map(g => ({
    id: g.grupo,
    nombre: g.grupo
  }));

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
        <label className="block text-xs font-medium text-gray-600 mb-1">Número de permisos</label>
        <input
          type="number" min="1" max="20"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          value={form.permisos}
          onChange={e => set("permisos", Number(e.target.value))}
        />
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

// ── Tarjeta de Rol ────────────────────────────────────────────────────────────
function RolCard({ rol, grupoNombre, onEdit, onDelete }) {
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
      <div className="flex items-center gap-3 min-w-0">
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${st.dot}`} />
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">{rol.nombre}</p>
          <p className="text-xs text-gray-500">{rol.permisos} permisos · {rol.usuarios} usuario{rol.usuarios !== 1 ? "s" : ""}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-3 flex-shrink-0">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${NIVEL_BADGE[rol.nivel]}`}>
          {rol.nivel}
        </span>
        <button
          onClick={() => onEdit(rol)}
          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-indigo-600 transition-all p-1 rounded"
          title="Editar"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-1.414a2 2 0 01.586-1.414z"/>
          </svg>
        </button>
        <button
          onClick={() => onDelete(rol)}
          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-1 rounded"
          title="Eliminar"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── Tarjeta de Grupo ──────────────────────────────────────────────────────────
function GrupoCard({ grupo, onEditRol, onDeleteRol, onAddRol }) {
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
            />
          ))}
          <button
            onClick={() => onAddRol(grupo)}
            className="w-full mt-1 py-2 text-xs font-medium text-gray-500 hover:text-indigo-600 border border-dashed border-gray-300 hover:border-indigo-400 rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
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

 // Filtro de búsqueda con validaciones
const gruposFiltrados = grupos
  .filter(grupo => grupo && typeof grupo === 'object') // Asegurar que grupo existe
  .map(g => ({
    ...g,
    roles: Array.isArray(g.roles) 
      ? g.roles.filter(r => 
          r && r.nombre && r.nombre.toLowerCase().includes(busqueda.toLowerCase())
        )
      : [] // Si no hay roles, array vacío
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
          <p className="text-sm text-gray-500 mt-0.5">Administra los roles y niveles de acceso por área.</p>
        </div>
        <button
          onClick={() => setModalCrear(grupos[0] || { grupo: "Gerencia General" })}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
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
    key={grupo.id} // ← AHORA SÍ: cada rol tiene ID único
    grupo={grupo}
    onEditRol={(rol) => setModalEditar({ rol, grupoId: grupo.grupo })}
    onDeleteRol={(rol) => setModalEliminar({ rol, grupoId: grupo.grupo })}
    onAddRol={(g) => setModalCrear(g)}
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
    </div>
  );
}
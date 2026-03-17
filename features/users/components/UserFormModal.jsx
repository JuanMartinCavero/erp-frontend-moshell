import { useState, useEffect } from "react";

const UserFormModal = ({ open, onClose, onSubmit, user }) => {

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    role_id: ""
  });

  useEffect(() => {
    if (user) {
      setForm({
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        password: "",
        role_id: user.role_id
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-6 rounded-lg w-[400px]">

        <h2 className="text-lg font-bold mb-4">
          {user ? "Editar Usuario" : "Nuevo Usuario"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <select
            name="role_id"
            value={form.role_id}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Seleccionar Rol</option>
            <option value="1">Administrador</option>
            <option value="2">Producción</option>
            <option value="3">Inventario</option>
          </select>

          <div className="flex justify-end gap-2 mt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Guardar
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default UserFormModal;
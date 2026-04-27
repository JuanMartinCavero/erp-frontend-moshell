import { useState, useEffect } from "react";

export default function ModalMachine({
  isOpen,
  onClose,
  onSave,
  machine = null,
}) {
  const [form, setForm] = useState({
    code: "",
    nombre: "",
    tipo: "",
    is_external: false,
    status: "inhabilitado",
  });

  useEffect(() => {
    if (machine) {
      setForm(machine);
    } else {
      setForm({
        code: "",
        nombre: "",
        tipo: "",
        is_external: false,
        status: "inhabilitado",
      });
    }
  }, [machine]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-bold mb-4">
          {machine ? "Editar Máquina" : "Agregar Máquina"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
       
          <input
            type="text"
            name="code"
            placeholder="Codigo de Maquina"
            value={form.code}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />

          <input
            type="text"
            name="tipo"
            placeholder="Tipo"
            value={form.tipo}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="inhabilitado">Inhabilitado</option>
            <option value="en funcionamiento">En funcionamiento</option>
            <option value="mantenimiento">Mantenimiento</option>
          </select>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="is_external"
              checked={form.is_external}
              onChange={handleChange}
            />
            Máquina externa
          </label>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

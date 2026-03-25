import React, { useState, useEffect } from "react";

const initialState = {
  nombre: "",
  empresa: "",
  tipo_identificacion: "RUC",
  identificacion_fiscal: "",
  pais: "",
  ciudad: "",
  telefono: "",
  correo: "",
  direccion: "",
  es_internacional: false,
};

const ClientModal = ({ isOpen, onClose, onSave, clienteEdit }) => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (clienteEdit) {
      setForm(clienteEdit);
    } else {
      setForm(initialState);
    }
  }, [clienteEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.nombre || !form.identificacion_fiscal || !form.pais) {
      setError("Completa los campos obligatorios");
      return;
    }

    try {
      await onSave(form);
    } catch (err) {
      setError(err?.response?.data?.error || "Error al guardar");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      
      {/* Modal */}
      <div className="w-full max-w-2xl bg-white dark:bg-background-dark rounded-2xl shadow-2xl border border-slate-200 dark:border-primary/20 animate-fadeIn">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-primary/20">
          <h2 className="text-lg font-bold">
            {clienteEdit ? "Editar Cliente" : "Nuevo Cliente"}
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-red-500 transition"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-2 gap-4">

            <div className="col-span-2">
              <label className="text-xs text-slate-500">Nombre *</label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/50 outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-slate-500">Empresa</label>
              <input
                name="empresa"
                value={form.empresa}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-lg border"
              />
            </div>

            <div>
              <label className="text-xs text-slate-500">País *</label>
              <input
                name="pais"
                value={form.pais}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-lg border"
              />
            </div>

            <div>
              <label className="text-xs text-slate-500">Tipo</label>
              <select
                name="tipo_identificacion"
                value={form.tipo_identificacion}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-lg border"
              >
                <option value="RUC">RUC</option>
                <option value="DNI">DNI</option>
                <option value="NIT">NIT</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-500">
                Identificación *
              </label>
              <input
                name="identificacion_fiscal"
                value={form.identificacion_fiscal}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-lg border"
              />
            </div>

            <div>
              <label className="text-xs text-slate-500">Ciudad</label>
              <input
                name="ciudad"
                value={form.ciudad}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-lg border"
              />
            </div>

            <div>
              <label className="text-xs text-slate-500">Teléfono</label>
              <input
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-lg border"
              />
            </div>

            <div className="col-span-2">
              <label className="text-xs text-slate-500">Correo</label>
              <input
                name="correo"
                value={form.correo}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-lg border"
              />
            </div>

            <div className="col-span-2">
              <label className="text-xs text-slate-500">Dirección</label>
              <textarea
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-lg border"
              />
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="es_internacional"
              checked={form.es_internacional}
              onChange={handleChange}
            />
            <span className="text-sm text-slate-600">
              Cliente internacional
            </span>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-primary/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border hover:bg-slate-100 transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-primary text-white rounded-lg shadow hover:scale-[1.02] transition"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientModal;
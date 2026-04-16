import { X } from "lucide-react";
import { useState } from "react";
import { useProvider } from "../../../hooks/useProvider";

export default function ModalProvider({ isOpen, onClose, onSave }) {
  const { fetchProviderByRuc } = useProvider();
  const [loadingRuc, setLoadingRuc] = useState(false);

  const handleSearchRuc = async () => {
    if (!form.ruc) return;
    setLoadingRuc(true);
    try {
      const res = await fetchProviderByRuc(form.ruc);
      if (!res?.success || !res?.data) {
        alert("RUC no encontrado");
        return;
      }
      const data = res.data;
      setForm((prev) => ({
        ...prev,
        razon_social: data.razonSocial ?? "",
        direccion: data.direccion ?? data.direccionCompleta ?? "",
      }));
    } catch (error) {
      console.error("Error buscando RUC", error);
      alert("Error consultando RUC");
    } finally {
      setLoadingRuc(false);
    }
  };

  const [form, setForm] = useState({
    ruc: "",
    razon_social: "",
    telefono: "",
    email: "",
    direccion: "",
    contacto: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({
      ruc: "",
      razon_social: "",
      telefono: "",
      email: "",
      direccion: "",
      contacto: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg p-6 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Nuevo Proveedor</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              name="ruc"
              placeholder="RUC"
              value={form.ruc}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 dark:bg-slate-800"
              required
            />

            <button
              type="button"
              onClick={handleSearchRuc}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              disabled={loadingRuc}
            >
              {loadingRuc ? "..." : "Buscar"}
            </button>
          </div>

          <input
            type="text"
            name="razon_social"
            placeholder="Razón Social"
            value={form.razon_social}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 dark:bg-slate-800"
            required
            disabled
          />

          {/* <input
            type="text"
            name="nombre_comercial"
            placeholder="Nombre Comercial"
            value={form.nombre_comercial}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 dark:bg-slate-800"
          /> */}

          <input
            type="text"
            name="contacto"
            placeholder="Persona de contacto"
            value={form.contacto}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 dark:bg-slate-800"
          />

          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 dark:bg-slate-800"
          />

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 dark:bg-slate-800"
          />

          <textarea
            name="direccion"
            placeholder="Dirección"
            value={form.direccion}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 dark:bg-slate-800"
            disabled
          />

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useProvider } from "../../../hooks/useProvider";

export default function ModalProvider({ isOpen, onClose, onSave, provider }) {
  const { fetchProviderByRuc } = useProvider();
  const [loadingRuc, setLoadingRuc] = useState(false);

  const initialForm = {
    ruc: "",
    razon_social: "",
    telefono: "",
    email: "",
    direccion: "",
    contacto: "",
  };

  const [form, setForm] = useState(initialForm);

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(form);

    setForm(initialForm);
    onClose();
  };

  useEffect(() => {
    if (provider) {
      setForm(provider);
    } else {
      setForm(initialForm);
    }
  }, [provider, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {provider ? "Editar Proveedor" : "Nuevo Proveedor"}
          </h2>

          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              name="ruc"
              placeholder="RUC"
              value={form.ruc}
              onChange={handleChange}
              required
              disabled={provider}
              className="w-full border rounded-lg p-2 dark:bg-slate-800 disabled:bg-slate-200 dark:disabled:bg-slate-700"
            />

            <button
              type="button"
              onClick={handleSearchRuc}
              disabled={loadingRuc || provider}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loadingRuc ? "..." : "Buscar"}
            </button>
          </div>

          <input
            type="text"
            name="razon_social"
            value={form.razon_social}
            onChange={handleChange}
            disabled
            required
            placeholder="Razón Social"
            className="w-full border rounded-lg p-2 dark:bg-slate-800"
          />

          <input
            type="text"
            name="contacto"
            value={form.contacto}
            onChange={handleChange}
            placeholder="Persona de contacto"
            className="w-full border rounded-lg p-2 dark:bg-slate-800"
          />

          <input
            type="text"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            className="w-full border rounded-lg p-2 dark:bg-slate-800"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            className="w-full border rounded-lg p-2 dark:bg-slate-800"
          />

          <textarea
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            disabled
            placeholder="Dirección"
            className="w-full border rounded-lg p-2 dark:bg-slate-800"
          />

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

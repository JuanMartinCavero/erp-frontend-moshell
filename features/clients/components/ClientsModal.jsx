import React, { useState, useEffect } from "react";

const initialForm = {
  nombre: "",
  empresa: "",
  pais: "",
  ciudad: "",
  tipo_identificacion: "",
  identificacion_fiscal: "",
  moneda_preferida: "PEN",
  telefono: "",
  correo: "",
  direccion: "",
  es_internacional: false,
  estado: true,
};

const ClientModal = ({ isOpen, onClose, onSave, clienteEdit }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (clienteEdit) {
      setForm(clienteEdit);
    } else {
      setForm(initialForm);
    }
  }, [clienteEdit, isOpen]);

  // Detectar tipo documento según país
  useEffect(() => {
    const pais = form.pais.toLowerCase();

    if (pais === "perú" || pais === "peru") {
      setForm((prev) => ({
        ...prev,
        tipo_identificacion: prev.tipo_identificacion || "DNI",
        moneda_preferida: prev.moneda_preferida || "PEN",
        es_internacional: false,
      }));
    } else if (form.pais !== "") {
      setForm((prev) => ({
        ...prev,
        tipo_identificacion: "NIT",
        moneda_preferida: prev.moneda_preferida || "USD",
        es_internacional: true,
      }));
    }
  }, [form.pais]);

  const validate = () => {
    const newErrors = {};

    if (!form.nombre.trim()) newErrors.nombre = "Nombre requerido";

    if (
      form.tipo_identificacion === "DNI" &&
      form.identificacion_fiscal.length !== 8
    )
      newErrors.identificacion_fiscal = "DNI debe tener 8 dígitos";

    if (
      form.tipo_identificacion === "RUC" &&
      form.identificacion_fiscal.length !== 11
    )
      newErrors.identificacion_fiscal = "RUC debe tener 11 dígitos";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    await onSave(form);
    onClose();
  };

  if (!isOpen) return null;

  const isPeru =
    form.pais.toLowerCase() === "perú" || form.pais.toLowerCase() === "peru";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
        {/* HEADER */}

        <div className="flex justify-between items-center px-6 py-4 border-b">
          <div>
            <h2 className="text-xl font-semibold">
              {clienteEdit ? "Editar Cliente" : "Nuevo Cliente"}
            </h2>
            <p className="text-sm text-slate-500">
              Información general del cliente
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        {/* BODY */}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* DATOS BASICOS */}

          <div>
            <h3 className="text-sm font-semibold text-slate-500 mb-3">
              Datos del Cliente
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-600">Nombre *</label>

                <input
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Juan Pérez"
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
                />

                {errors.nombre && (
                  <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-slate-600">Empresa</label>

                <input
                  name="empresa"
                  value={form.empresa}
                  onChange={handleChange}
                  placeholder="Textiles SAC"
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            </div>
          </div>

          {/* UBICACION */}

          <div>
            <h3 className="text-sm font-semibold text-slate-500 mb-3">
              Ubicación
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-600">País</label>

                <input
                  name="pais"
                  value={form.pais}
                  onChange={handleChange}
                  placeholder="Ej: Perú, Chile, USA..."
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">Ciudad</label>

                <input
                  name="ciudad"
                  value={form.ciudad}
                  onChange={handleChange}
                  placeholder="Lima"
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            </div>
          </div>

          {/* DOCUMENTO */}

          <div>
            <h3 className="text-sm font-semibold text-slate-500 mb-3">
              Documento Fiscal
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-600">Tipo Documento</label>

                <select
                  name="tipo_identificacion"
                  value={form.tipo_identificacion}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
                >
                  {isPeru ? (
                    <>
                      <option value="DNI">DNI</option>
                      <option value="RUC">RUC</option>
                    </>
                  ) : (
                    <option value="NIT">NIT</option>
                  )}
                </select>
              </div>

              <div>
                <label className="text-sm text-slate-600">Número</label>

                <input
                  name="identificacion_fiscal"
                  value={form.identificacion_fiscal}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, ""); // solo números

                    if (form.tipo_identificacion === "DNI") {
                      value = value.slice(0, 8);
                    }

                    if (form.tipo_identificacion === "RUC") {
                      value = value.slice(0, 11);
                    }

                    if (form.tipo_identificacion === "NIT") {
                      value = value.slice(0, 15); // opcional para extranjeros
                    }

                    setForm({
                      ...form,
                      identificacion_fiscal: value,
                    });
                  }}
                  maxLength={
                    form.tipo_identificacion === "DNI"
                      ? 8
                      : form.tipo_identificacion === "RUC"
                        ? 11
                        : 15
                  }
                  placeholder={
                    form.tipo_identificacion === "DNI"
                      ? "12345678"
                      : form.tipo_identificacion === "RUC"
                        ? "20123456789"
                        : "Número fiscal"
                  }
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
                />

                {errors.identificacion_fiscal && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.identificacion_fiscal}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* CONTACTO */}

          <div>
            <h3 className="text-sm font-semibold text-slate-500 mb-3">
              Contacto
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <input
                name="telefono"
                value={form.telefono}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, ""); // solo números

                  if (form.pais === "Perú") {
                    value = value.slice(0, 9);
                  } else {
                    value = value.slice(0, 15);
                  }

                  setForm({
                    ...form,
                    telefono: value,
                  });
                }}
                maxLength={form.pais === "Perú" ? 9 : 15}
                placeholder={
                  form.pais === "Perú" ? "999123456" : "Número internacional"
                }
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
              />

              <input
                name="correo"
                value={form.correo}
                onChange={handleChange}
                placeholder="Correo"
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            <input
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              placeholder="Dirección"
              className="w-full border rounded-lg px-3 py-2 mt-4 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-500 mb-3">
              Configuración
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-600">
                  Moneda Preferida
                </label>

                <select
                  name="moneda_preferida"
                  value={form.moneda_preferida}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="PEN">Soles (PEN)</option>
                  <option value="USD">Dólares (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                </select>
              </div>
            </div>
          </div>
          {/* FOOTER */}

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-slate-300 hover:bg-slate-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
            >
              {clienteEdit ? "Actualizar Cliente" : "Guardar Cliente"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientModal;

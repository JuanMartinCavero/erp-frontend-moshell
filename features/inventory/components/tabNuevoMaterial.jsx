import React, {useState} from "react";

import { crearMaterial } from "../../../services/materialApi"; 
import { registrarMovimiento } from "../../../services/kardexApi"; 
import { useMaterial } from "../../../hooks/useMaterial";

export function TabNuevoMaterial({ onClose, onRefresh }) {
  const [form, setForm] = useState({
    calidad: "",
    tipo: "",
    color: "",
    unidad: "metros",
    descripcion: "",
    ubicacion: "",
    stock_inicial: "",
    stock_minimo: "",
    valor_unitario: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await crearMaterial({
        ...form,
        stock_inicial: Number(form.stock_inicial),
        stock_minimo: Number(form.stock_minimo),
        valor_unitario: Number(form.valor_unitario),
      });

      alert("Material registrado correctamente");

      onRefresh?.();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error registrando material");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      <input
        name="calidad"
        placeholder="Calidad"
        onChange={handleChange}
        className="input"
      />
      <input
        name="tipo"
        placeholder="Tipo"
        onChange={handleChange}
        className="input"
      />

      <input
        name="color"
        placeholder="Color"
        onChange={handleChange}
        className="input"
      />
      <input
        name="unidad"
        placeholder="Unidad"
        onChange={handleChange}
        className="input"
      />

      <input
        name="descripcion"
        placeholder="Descripción"
        onChange={handleChange}
        className="input"
      />
      <input
        name="ubicacion"
        placeholder="Ubicación"
        onChange={handleChange}
        className="input"
      />

      <input
        name="stock_inicial"
        placeholder="Stock Inicial"
        type="number"
        onChange={handleChange}
        className="input"
      />
      <input
        name="stock_minimo"
        placeholder="Stock Mínimo"
        type="number"
        onChange={handleChange}
        className="input"
      />

      <input
        name="valor_unitario"
        placeholder="Valor Unitario"
        type="number"
        onChange={handleChange}
        className="input"
      />

      <button className="col-span-2 bg-purple-600 text-white p-3 rounded-lg">
        Registrar Material
      </button>
    </form>
  );
}

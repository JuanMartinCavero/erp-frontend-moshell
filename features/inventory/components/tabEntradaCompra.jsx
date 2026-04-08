import React, {useState} from "react";

import { registrarMovimiento } from "../../../services/kardexApi"; 
import { useMaterial } from "../../../hooks/useMaterial";

export function TabEntradaCompra({ onClose, onRefresh }) {
  
  const { material, buscarMaterial } = useMaterial();

  const [codigo, setCodigo] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [valorUnitario, setValorUnitario] = useState("");

  const handleBuscar = async () => {
    if (!codigo) return;

    await buscarMaterial(codigo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!material) {
      alert("Debe buscar un material");
      return;
    }

    try {
      await registrarMovimiento({
        material_id: material.id,
        tipo_movimiento: "entrada",
        cantidad: Number(cantidad),
        valor_unitario: Number(valorUnitario),
      });

      alert("Entrada registrada");

      onRefresh?.();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error registrando entrada");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <input
          placeholder="Código del material"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="input flex-1"
        />

        <button
          type="button"
          onClick={handleBuscar}
          className="bg-gray-200 px-4 rounded"
        >
          Buscar
        </button>
      </div>

      {material && (
        <div className="bg-gray-50 p-3 rounded text-sm">
          <p>
            <b>Material:</b> {material.descripcion}
          </p>
          <p>
            <b>Stock actual:</b> {material.stock_actual}
          </p>
        </div>
      )}

      <input
        type="number"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
        className="input"
      />

      <input
        type="number"
        placeholder="Valor unitario"
        value={valorUnitario}
        onChange={(e) => setValorUnitario(e.target.value)}
        className="input"
      />

      <button className="bg-purple-600 text-white p-3 rounded-lg w-full">
        Registrar Entrada
      </button>
    </form>
  );
}

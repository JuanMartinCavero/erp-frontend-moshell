import { useState } from "react";
import { X } from "lucide-react";

import { crearMaterial } from "../../../services/materialApi"; 
import { registrarMovimiento } from "../../../services/kardexApi"; 
import { useMaterial } from "../../../hooks/useMaterial";

import { TabNuevoMaterial } from "./tabNuevoMaterial";
import { TabEntradaCompra } from "./TabEntradaCompra";

export function RegisterMaterialModal({ open, onClose, onRefresh }) {
//hola
  const [tab, setTab] = useState("nuevo");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[700px] rounded-xl shadow-lg">

        {/* header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg">Registrar Material</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* tabs */}
        <div className="flex border-b">
          <button
            className={`flex-1 p-3 ${tab === "nuegrid grid-cols-2 gap-4vo" ? "bg-gray-100 font-semibold" : ""}`}
            onClick={() => setTab("nuevo")}
          >
            Nuevo Material
          </button>

          <button
            className={`flex-1 p-3 ${tab === "entrada" ? "bg-gray-100 font-semibold" : ""}`}
            onClick={() => setTab("entrada")}
          >
            Entrada por Compra
          </button>
        </div>

        <div className="p-6">

          {tab === "nuevo" && (
            <TabNuevoMaterial onClose={onClose} onRefresh={onRefresh} />
          )}

          {tab === "entrada" && (
            <TabEntradaCompra onClose={onClose} onRefresh={onRefresh} />
          )}

        </div>
      </div>
    </div>
  );
}
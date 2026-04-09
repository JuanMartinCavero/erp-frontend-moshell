import React, { useState, useEffect } from "react";
import { InventoryHeader } from "./components/InventoryHeader";
import { StatsCards } from "./components/InventoryStats";
import { FiltersBar } from "./components/InventoryFilters";
import { InventoryTable } from "./components/InventoryTable";
import { Pagination } from "./components/InventoryPagination";

import { RegisterMaterialModal } from "./components/registerMaterialModal";

import { useMaterial } from "../../hooks/useMaterial";
import { useKardex } from "../../hooks/usekardex";

export function Inventory() {
  const [codigo, setCodigo] = useState("");
  const { material, buscarMaterial } = useMaterial();

  const { kardex, loading, refetch } = useKardex(material?.id);

  const { obtenerMateriales } = useMaterial();
  const [materiales, setMateriales] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleBuscar = async () => {
    if (!codigo) return;
    try {
      await buscarMaterial(codigo);
    } catch (error) {
      // Podrías usar un toast o alerta aquí
      console.error("Material no encontrado");
    }
  };

  // Obtener todos los materiales al montar el componente
  useEffect(() => {
    const fetchMateriales = async () => {
      const data = await obtenerMateriales();
      setMateriales(Array.isArray(data) ? data : []);
    };
    fetchMateriales();
  }, []);

  // Función para refrescar después de registrar un material
  const handleRefresh = async () => {
    const data = await obtenerMateriales();
    setMateriales(Array.isArray(data) ? data : []);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <InventoryHeader onRegister={() => setOpenModal(true)} />

      <div className="flex-1 overflow-y-auto p-8">
        <StatsCards />
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Código del material"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="border px-3 py-2 rounded"
          />

          <button
            onClick={handleBuscar}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Buscar
          </button>
        </div>

        <FiltersBar />

        <InventoryTable data={materiales} />

        <Pagination />
      </div>
      <RegisterMaterialModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onRefresh={handleRefresh}
      />
    </div>
  );
}

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
  // AGREGADO: Estado para controlar qué mostrar
  const [mostrandoKardex, setMostrandoKardex] = useState(false);

  const handleBuscar = async () => {
    if (!codigo) return;
    try {
      await buscarMaterial(codigo);
      setMostrandoKardex(true);
    } catch (error) {
      console.error("Material no encontrado");
      setMostrandoKardex(false);
    }
  };

  // AGREGADO: Limpiar búsqueda
  const handleLimpiar = () => {
    setCodigo("");
    setMostrandoKardex(false);
  };

  useEffect(() => {
    const fetchMateriales = async () => {
      const data = await obtenerMateriales();
      setMateriales(Array.isArray(data) ? data : []);
    };
    fetchMateriales();
  }, []);

  const handleRefresh = async () => {
    const data = await obtenerMateriales();
    setMateriales(Array.isArray(data) ? data : []);
    if (mostrandoKardex && material?.id) {
      await refetch();
    }
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
            className="border px-3 py-2 rounded flex-1"
          />
          <button
            onClick={handleBuscar}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Buscar
          </button>
          {/* AGREGADO: Botón limpiar */}
          <button
            onClick={handleLimpiar}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Limpiar
          </button>
        </div>

        <FiltersBar />

        {/* MODIFICADO: Mostrar Kardex si hay búsqueda, sino mostrar materiales */}
        {mostrandoKardex && material ? (
          <div>
            <div className="mb-4 p-3 bg-purple-50 rounded-lg">
              <h3 className="font-bold">Material: {material.calidad} - {material.color}</h3>
              <p>Código: {material.codigo} | Stock actual: {material.inventario?.stock_actual || 0}</p>
            </div>
            {loading ? (
              <div className="text-center py-8">Cargando Kardex...</div>
            ) : (
              <InventoryTable data={kardex} tipo="kardex" />
            )}
          </div>
        ) : (
          <InventoryTable data={materiales} tipo="materiales" />
        )}

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

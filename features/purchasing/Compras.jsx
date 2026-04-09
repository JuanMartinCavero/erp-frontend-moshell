// MODIFICADO: Con conexión a backend
import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { ComprasKpiCards } from "../../features/pedidos/components/Compraskpicards";
import { OrdenesTable } from "../../features/pedidos/components/ComprasOrdenestable";
import { InsumosCriticos } from "../../features/pedidos/components/ComprasInsumoscriticos";
import { OrdenCompraModal } from "../../components/OrdenCompraModal";
import axiosClient from "../../services/axiosClient";

export function Compras() {
  // AGREGADO: Estado para órdenes y modal
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // AGREGADO: Cargar órdenes al montar
  useEffect(() => {
    cargarOrdenes();
  }, []);

  const cargarOrdenes = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/ordenes-compra");
      setOrdenes(response.data);
    } catch (error) {
      console.error("Error cargando órdenes:", error);
    } finally {
      setLoading(false);
    }
  };

  // AGREGADO: Manejar creación de nueva orden
  const handleOrdenCreada = (nuevaOrden) => {
    cargarOrdenes();
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <main className="px-8 py-8">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Compras de Insumos</h1>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Nueva Orden de Compra
          </button>
        </div>

        <ComprasKpiCards />

        <div className="flex gap-6">
          {/* AGREGADO: Pasar órdenes y loading a la tabla */}
          <OrdenesTable ordenes={ordenes} loading={loading} onRefresh={cargarOrdenes} />
          <InsumosCriticos />
        </div>

      </main>

      {/* AGREGADO: Modal para nueva orden */}
      {showModal && (
        <OrdenCompraModal 
          onClose={() => setShowModal(false)}
          onSuccess={handleOrdenCreada}
        />
      )}
    </div>
  );
}
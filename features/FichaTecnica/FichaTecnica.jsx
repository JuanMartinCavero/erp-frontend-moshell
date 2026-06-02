import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Loader, AlertCircle } from "lucide-react";
import api from "../../services/api";
import { Card, CardContent } from "../../components/ui/Card";

import { useFichaTecnica } from "./hooks/useFichaTecnica";
import FichaHeader from "./components/FichaHeader";
import WorkflowStatus from "./components/WorkflowStatus";
import TechnicalDetailsTab from "./components/TechnicalDetailsTab";
import MaterialsBOMTab from "./components/MaterialsBOMTab";
import PrototypeHistoryTab from "./components/PrototypeHistoryTab";
import SizeSpecsTab from "./components/SizeSpecsTab";
import ReferenceImages from "./components/ReferenceImages";
import ProductionSidebar from "./components/ProductionSidebar";
import ClientSidebar from "./components/ClientSidebar";
import OrderSidebar from "./components/OrderSidebar";

export default function FichaTecnica() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const {
    loading,
    error,
    techSheet,
    cliente,
    pedido,
    materiales,
    workflowStatus,
    cantidadPedido,
    updateSpecs,
    sendToProduction,
    exportPDF,
    loadTechSheet,
  } = useFichaTecnica(id);

  const updateMachine = async (machineId) => {
    try {
      const response = await api.put(`/technical-sheets/${id}/machine`, {
        machine_id: machineId,
      });
      if (response.data.success) {
        window.location.reload();
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  };

  const associatePedido = async (pedidoId) => {
    try {
      if (!pedidoId) {
        return { success: false, error: "pedido_id inválido" };
      }

      const response = await api.put(
        `/technical-sheets/${id}/associate-pedido`,
        { pedido_id: pedidoId },
      );

      if (response.data.success) {
        await loadTechSheet();
        return { success: true };
      }

      return {
        success: false,
        error: response.data?.message || "No se pudo asignar el pedido",
      };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || err.message,
      };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-12 h-12 animate-spin text-[#42526E]" />
        <p className="ml-4">Cargando ficha técnica...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-red-600">
              <AlertCircle className="w-6 h-6" />
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!techSheet) {
    return (
      <div className="p-8 text-center">No se encontró la ficha técnica</div>
    );
  }

  const tabs = [
    "Technical Details",
    "Materials & BOM",
    `Prototypes (${techSheet.samples?.length || 0})`,
    "Size Specs",
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-8">
      <FichaHeader
        techSheet={techSheet}
        cliente={cliente}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onExportPDF={exportPDF}
      />

      <WorkflowStatus workflowStatus={workflowStatus} />

      <div className="flex gap-8">
        <div className="flex-1 space-y-8">
          {/* Tabs */}
          <div className="flex items-center gap-8 border-b border-gray-200 px-2">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`pb-4 text-sm font-semibold transition-colors relative ${
                  activeTab === i
                    ? "text-[#42526E]"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab}
                {activeTab === i && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#42526E]" />
                )}
              </button>
            ))}
          </div>

          {activeTab === 0 && (
            <TechnicalDetailsTab
              techSheet={techSheet}
              isEditing={isEditing}
              onUpdate={updateSpecs}
              onUpdateMachine={updateMachine}
            />
          )}

          {activeTab === 1 && (
            <MaterialsBOMTab materiales={materiales} isEditing={isEditing} />
          )}

          {activeTab === 2 && (
            <PrototypeHistoryTab
              samples={techSheet.samples || []}
              techSheetId={id}
              onAfterAddSample={loadTechSheet}
            />
          )}

          {activeTab === 3 && <SizeSpecsTab sizeSpecs={techSheet.size_specs} />}

          <ReferenceImages images={techSheet.images} />
        </div>

        {/* Sidebar */}
        <div className="w-80 space-y-6">
          <ProductionSidebar
            developmentStatus={techSheet.development_status}
            estimatedCost={techSheet.estimated_cost}
            pedidoQuantity={cantidadPedido}
            onSendToProduction={sendToProduction}
          />
          <ClientSidebar cliente={cliente} />
          <OrderSidebar
            pedido={pedido}
            estimatedQuantity={techSheet.estimated_quantity}
            onUpdatePedido={associatePedido}
            isEditing={isEditing} // ← para mostrar el botón editar solo en modo edición
          />
        </div>
      </div>
    </div>
  );
}

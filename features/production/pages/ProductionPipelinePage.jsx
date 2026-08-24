// src/features/production/pages/ProductionPipelinePage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext } from "@hello-pangea/dnd";
import {
  AlertCircle,
  RefreshCw,
  Layers,
  CheckCircle2,
  ClipboardList,
} from "lucide-react";
import useProductionPipeline from "../hooks/useProductionPipeline";
import PipelineColumn from "../components/PipelineColumn";
// import PipelineFilters from "../components/PipelineFilters";
import PipelineSkeleton from "../components/PipelineSkeleton";

export default function ProductionPipelinePage() {
  const navigate = useNavigate();
  const {
    columns = [],
    stats,
    loading,
    error,
    refreshing,
    filter,
    refresh,
    moveOrder,
    filterByPriority,
  } = useProductionPipeline();

  // Estados para el Modal personalizado de producción
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [quantityInput, setQuantityInput] = useState("0");

  const handleDragEnd = (result) => {
    if (!result?.destination) return;

    const { source, destination } = result;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (!columns || columns.length === 0) return;

    const sourceColumn = columns.find((col) => col?.id === source.droppableId);
    const movedOrder = sourceColumn?.cards?.[source.index];

    if (!movedOrder) return;

    const phaseId = destination.droppableId.replace("col-", "");

    // En lugar de usar prompt(), abrimos nuestro modal estilizado
    setModalData({
      orderId: movedOrder.order_id,
      phaseId,
      sourceDroppableId: source.droppableId,
      destinationDroppableId: destination.droppableId,
      sourceTitle: sourceColumn?.title || "Fase Actual",
      orderCode: movedOrder.code || movedOrder.order_id,
    });
    setQuantityInput("0");
    setIsModalOpen(true);
  };

  const handleConfirmProduction = async () => {
    if (!modalData) return;

    const quantity = parseInt(quantityInput) || 0;
    setIsModalOpen(false);

    await moveOrder(
      modalData.orderId,
      modalData.phaseId,
      modalData.sourceDroppableId,
      modalData.destinationDroppableId,
      quantity,
    );

    setModalData(null);
  };

  const handleCardClick = (orderId) => {
    if (orderId) navigate(`/production/orders/${orderId}`);
  };

  const handleNewOrder = () => {
    navigate("/tech-sheets");
  };

  // --- ESTADO: CARGANDO ---
  if (loading) {
    return (
      <div className="h-full flex flex-col p-8 bg-slate-50/50 min-h-screen">
        <div className="mb-8 flex justify-between items-center animate-pulse">
          <div>
            <div className="h-8 w-56 bg-slate-200 rounded-lg mb-2"></div>
            <div className="h-4 w-40 bg-slate-200 rounded"></div>
          </div>
          <div className="h-10 w-32 bg-slate-200 rounded-lg"></div>
        </div>
        <PipelineSkeleton />
      </div>
    );
  }

  // --- ESTADO: ERROR ---
  if (error) {
    return (
      <div className="h-full flex items-center justify-center p-8 min-h-screen bg-slate-50">
        <div className="bg-white border border-red-100 rounded-2xl p-8 max-w-md text-center shadow-xl shadow-red-50">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            Sucedió un contratiempo
          </h3>
          <p className="text-slate-600 mb-6 text-sm leading-relaxed">{error}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={refresh}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl flex items-center gap-2 shadow-sm transition-all text-sm"
            >
              <RefreshCw
                className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
              />
              Reintentar
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="px-5 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-all text-sm"
            >
              Ir al Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-8 bg-slate-50/40 min-h-screen relative font-sans antialiased overflow-hidden">
      {/* Título de la sección y stats rápidos */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-600" />
            Fases de Producción
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Gestione y mueva las órdenes a través de las fases operativas.
          </p>
        </div>
      </div>

      {/* Panel de Filtros */}
      {/* <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/80 mb-6 flex-shrink-0">

        {/* <PipelineFilters
          stats={stats}
          filter={filter}
          onFilterChange={filterByPriority}
          onRefresh={refresh}
          onNewOrder={handleNewOrder}
          refreshing={refreshing}
        /> */}
      {/*  </div> */}

      {/* --- PIPELINE PRINCIPAL / ESTADO VACÍO --- */}
      {!columns || columns.length === 0 ? (
        <div className="flex-1 min-w-0 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-white p-12">
          <div className="text-center max-w-sm">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ClipboardList className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              No hay órdenes
            </h3>
            <p className="text-sm text-slate-500 mt-1 mb-6">
              No se encontraron órdenes de producción disponibles bajo los
              filtros seleccionados.
            </p>
            <button
              onClick={handleNewOrder}
              className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Crear nueva orden
            </button>
          </div>
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex-1 min-w-0 flex gap-6 overflow-x-auto pb-4 items-start select-none">
            {columns.map((column) => (
              <PipelineColumn
                key={column?.id}
                column={column}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        </DragDropContext>
      )}

      {/* --- MODAL FLOTANTE DE CONFIRMACIÓN (REEMPLAZO DEL PROMPT) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 transition-opacity">
          {/* Sin backdrop-blur para evitar borrosidad/artefactos al mover sidebar */}
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-md w-full p-6 m-4 animate-fade-in">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Registrar Producción
                </h3>
                <p className="text-xs text-slate-500">
                  Orden: {modalData?.orderCode}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                ¿Cuántas unidades se produjeron en la fase{" "}
                <span className="font-semibold text-slate-900">
                  "{modalData?.sourceTitle}"
                </span>
                ?
              </label>
              <input
                type="number"
                min="0"
                value={quantityInput}
                onChange={(e) => setQuantityInput(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg font-semibold transition-all"
                placeholder="0"
                autoFocus
                onKeyDown={(e) =>
                  e.key === "Enter" && handleConfirmProduction()
                }
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setModalData(null);
                }}
                className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmProduction}
                className="px-5 py-2.5 text-sm font-medium bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-sm transition-colors"
              >
                Confirmar y Mover
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

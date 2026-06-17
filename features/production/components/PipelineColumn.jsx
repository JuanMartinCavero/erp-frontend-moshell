// src/features/production/components/PipelineColumn.jsx

import React from "react";
import { MoreHorizontal, Plus } from "lucide-react";
import { Droppable } from "@hello-pangea/dnd";
import PipelineCard from "./PipelineCard";

const PipelineColumn = ({ column, onCardClick, onMenuClick }) => {
  const cards = column.displayedCards || column.cards || [];

  return (
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`w-[340px] flex-shrink-0 flex flex-col bg-slate-100/70 rounded-2xl p-4 border border-slate-200/60 transition-all duration-200 select-none ${
            snapshot.isDraggingOver
              ? "bg-slate-200/60 border-indigo-200 shadow-inner ring-2 ring-indigo-500/5"
              : "shadow-sm"
          }`}
        >
          {/* Cabecera de la columna */}
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2.5">
              <h3 className="font-bold text-slate-800 text-sm tracking-wide uppercase">
                {column.title}
              </h3>
              <span className="bg-white border border-slate-200 text-slate-600 text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                {column.count ?? cards.length}
              </span>
            </div>

            <button
              onClick={() => onMenuClick?.(column)}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
              title="Opciones de columna"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Contenedor de las tarjetas con Scroll Interno Inteligente */}
          <div
            className={`flex-1 space-y-3 overflow-y-auto pr-1 min-h-[150px] max-h-[calc(100vh-290px)] scrollbar-thin transition-spacing duration-150 ${
              cards.length === 0
                ? "flex flex-col justify-center items-center"
                : ""
            }`}
          >
            {cards.map((card, index) => (
              <PipelineCard
                key={`${card.id}-${card.order_id}`}
                card={card}
                index={index} // Recuerda pasar el index si tu PipelineCard usa Draggable por dentro
                onClick={onCardClick}
              />
            ))}

            {/* Estado visual temporal cuando la columna está vacía */}
            {cards.length === 0 && !snapshot.isDraggingOver && (
              <div className="text-center py-8 px-4 border border-dashed border-slate-300/70 rounded-xl w-full bg-slate-50/50">
                <p className="text-xs font-medium text-slate-400">
                  Sin órdenes en esta fase
                </p>
              </div>
            )}

            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default PipelineColumn;

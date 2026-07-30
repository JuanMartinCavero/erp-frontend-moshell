import React from "react";
import { Badge } from "../../../components/ui/Badge";
import { Progress } from "../../../components/ui/Progress";

const priorityStyles = {
  HIGH: "bg-red-50 text-red-600 border-red-200",
  MEDIUM: "bg-yellow-50 text-yellow-700 border-yellow-200",
  LOW: "bg-green-50 text-green-700 border-green-200",
};

const PipelineCard = ({ card, onClick }) => {
  return (
    <div
      onClick={() => onClick(card.order_id, card.tech_sheet_id)}
      className="group bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
    >
      {/* HEADER */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-md w-fit">
            {card.id}
          </span>

          <span
            className={`text-xs font-semibold px-2 py-1 rounded-md border w-fit ${
              priorityStyles[card.priority] || "bg-gray-100 text-gray-600"
            }`}
          >
            {card.priority}
          </span>
        </div>

        {/* Pedido destacado */}
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-wide text-gray-400">
            Pedido
          </span>
          <div className="text-sm font-bold text-gray-800">#{card.pedido}</div>
        </div>
      </div>

      {/* CLIENTE */}
      <h4 className="font-bold text-gray-900 text-base mb-1 line-clamp-1">
        {card.client}
      </h4>

      {/* DESCRIPCIÓN */}
      <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-snug">
        {card.desc}
      </p>

      {/* ALERTA CALIDAD */}
      {card.quality_status === "FAILED" && (
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg bg-red-50 text-red-700 border border-red-100">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Quality Control Failed
        </div>
      )}

      {/* PROGRESO */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500">Progress</span>
        <span className="text-xs font-bold text-gray-700">
          {card.progress}%
        </span>
      </div>

      <Progress
        value={card.progress}
        indicatorColor={card.progressColor}
        className="bg-gray-100 h-2 rounded-full"
      />

      {/* FOOTER INFO (opcional futuro) */}
      <div className="mt-4 flex justify-between text-[11px] text-gray-400">
        <span>ID: {card.order_id}</span>
        {card.quantity && (
          <span>
            {card.produced || 0}/{card.quantity} uds
          </span>
        )}
      </div>
    </div>
  );
};

export default PipelineCard;

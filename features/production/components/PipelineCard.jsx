// src/features/production/components/PipelineCard.jsx

import React from 'react';
import { Badge } from '../../../components/ui/Badge';
import { Progress } from '../../../components/ui/Progress';

const PipelineCard = ({ card, onClick }) => {
    return (
        <div 
            onClick={() => onClick(card.order_id, card.tech_sheet_id)}
            className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
            {/* Header con ID y prioridad */}
            <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                    {card.id}
                </span>
                <Badge
                    variant={
                        card.priority === "HIGH" ? "destructive" : 
                        card.priority === "MEDIUM" ? "secondary" : 
                        "outline"
                    }
                    className={
                        card.priority === "MEDIUM" ? "bg-blue-50 text-blue-700 hover:bg-blue-100" : ""
                    }
                >
                    {card.priority}
                </Badge>
            </div>
            
            {/* Información del cliente y producto */}
            <h4 className="font-bold text-gray-900 text-base mb-1 line-clamp-1">
                {card.client}
            </h4>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {card.desc}
            </p>

            {/* Alertas si existen */}
            {card.alert && (
                <div className={`mb-4 text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-2 ${
                    card.alert.type === 'warning' 
                        ? 'bg-amber-50 text-amber-700' 
                        : 'bg-red-50 text-red-700'
                }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    {card.alert.text}
                </div>
            )}

            {/* Barra de progreso */}
            <div className="flex items-center justify-between text-xs text-gray-500 font-medium mb-2">
                <span>Progress</span>
                <span>{card.progress}%</span>
            </div>
            <Progress 
                value={card.progress} 
                indicatorColor={card.progressColor} 
                className="bg-gray-100 h-1.5" 
            />
        </div>
    );
};

export default PipelineCard;
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
            <div className="flex items-center justify-between mb-4">
                <div>
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                        {card.id}
                    </span>
                    {/* Mostrar cantidad si existe */}
                    {card.quantity && (
                        <span className="ml-2 text-xs text-gray-400">
                            {card.produced || 0}/{card.quantity} uds
                        </span>
                    )}
                </div>
                <Badge variant={
                    card.priority === "HIGH" ? "destructive" : 
                    card.priority === "MEDIUM" ? "secondary" : "outline"
                }>
                    {card.priority}
                </Badge>
            </div>
            
            <h4 className="font-bold text-gray-900 text-base mb-1 line-clamp-1">
                {card.client}
            </h4>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {card.desc}
            </p>

            {/* Mostrar alerta de calidad si aplica */}
            {card.quality_status === 'FAILED' && (
                <div className="mb-4 text-xs font-semibold px-3 py-2 rounded-lg bg-red-50 text-red-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                    Quality Control Failed
                </div>
            )}

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
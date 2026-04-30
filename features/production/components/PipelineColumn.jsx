// src/features/production/components/PipelineColumn.jsx

import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Droppable } from '@hello-pangea/dnd';
import PipelineCard from './PipelineCard';

const PipelineColumn = ({ column, onCardClick, onMenuClick }) => {
    const cards = column.displayedCards || column.cards;
    
    return (
        <Droppable droppableId={column.id}>
            {(provided, snapshot) => (
                <div 
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`w-[360px] flex-shrink-0 flex flex-col transition-colors ${
                        snapshot.isDraggingOver ? 'bg-gray-50 rounded-xl' : ''
                    }`}
                >
                    {/* Cabecera de la columna */}
                    <div className="flex items-center justify-between mb-4 px-1">
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-900 uppercase tracking-tight">
                                {column.title}
                            </h3>
                            <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-md">
                                {column.count}
                            </span>
                        </div>
                        <button 
                            onClick={() => onMenuClick?.(column)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>
                    
                    {/* Tarjetas de la columna */}
                    <div className="flex-1 space-y-4 min-h-[200px]">
                        {cards.map((card, index) => (
                            <PipelineCard 
                                key={`${card.id}-${card.order_id}`}
                                card={card}
                                onClick={onCardClick}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    );
};

export default PipelineColumn;
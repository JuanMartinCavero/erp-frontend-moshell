// src/features/production/pages/ProductionPipelinePage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { DragDropContext } from '@hello-pangea/dnd';

// ✅ Cambia esta línea: import { useProductionPipeline } from '../hooks/useProductionPipeline';
// 👇 Por esta:
import useProductionPipeline from '../hooks/useProductionPipeline';

import PipelineColumn from '../components/PipelineColumn';
import PipelineFilters from '../components/PipelineFilters';
import PipelineSkeleton from '../components/PipelineSkeleton';

export default function ProductionPipelinePage() {
    const navigate = useNavigate();
    const {
        columns,
        stats,
        loading,
        error,
        refreshing,
        filter,
        refresh,
        moveOrder,
        filterByPriority
    } = useProductionPipeline(); // ✅ Esto ya funciona con import default

    const handleDragEnd = async (result) => {
        if (!result.destination) return;
        
        const { source, destination } = result;
        
        if (source.droppableId === destination.droppableId && 
            source.index === destination.index) {
            return;
        }
        
        const sourceColumn = columns.find(col => col.id === source.droppableId);
        const movedOrder = sourceColumn?.cards[source.index];
        
        if (!movedOrder) return;
        
        const phaseId = destination.droppableId.replace('col-', '');
        
        await moveOrder(
            movedOrder.order_id,
            phaseId,
            source.droppableId,
            destination.droppableId
        );
    };

    const handleCardClick = (orderId, techSheetId) => {
        navigate(`/production/orders/${orderId}`);
    };

    const handleNewOrder = () => {
        navigate('/tech-sheets');
    };

    if (loading && !refreshing) {
        return (
            <div className="h-full flex flex-col p-8">
                <div className="mb-6">
                    <div className="h-10 w-64 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <PipelineSkeleton />
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-full flex items-center justify-center p-8">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-red-800 mb-2">Error</h3>
                    <p className="text-red-600 mb-4">{error}</p>
                    <button 
                        onClick={refresh}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col p-8">
            <PipelineFilters 
                stats={stats}
                filter={filter}
                onFilterChange={filterByPriority}
                onRefresh={refresh}
                onNewOrder={handleNewOrder}
                refreshing={refreshing}
            />
            
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="flex-1 flex gap-8 overflow-x-auto pb-4">
                    {columns.map((column) => (
                        <PipelineColumn 
                            key={column.id}
                            column={column}
                            onCardClick={handleCardClick}
                        />
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
}
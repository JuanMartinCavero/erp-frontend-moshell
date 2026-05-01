// src/features/production/pages/ProductionPipelinePage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext } from '@hello-pangea/dnd';
import { AlertCircle, RefreshCw } from 'lucide-react';
import useProductionPipeline from '../hooks/useProductionPipeline';
import PipelineColumn from '../components/PipelineColumn';
import PipelineFilters from '../components/PipelineFilters';
import PipelineSkeleton from '../components/PipelineSkeleton';

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
        filterByPriority
    } = useProductionPipeline();

    const handleDragEnd = async (result) => {
        if (!result?.destination) return;
        
        const { source, destination } = result;
        
        if (source.droppableId === destination.droppableId && 
            source.index === destination.index) {
            return;
        }
        
        if (!columns || columns.length === 0) return;
        
        const sourceColumn = columns.find(col => col?.id === source.droppableId);
        const movedOrder = sourceColumn?.cards?.[source.index];
        
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
        if (orderId) {
            navigate(`/production/orders/${orderId}`);
        }
    };

    const handleNewOrder = () => {
        navigate('/tech-sheets');
    };

    // Estado de carga
    if (loading) {
        return (
            <div className="h-full flex flex-col p-8">
                <div className="mb-6">
                    <div className="h-10 w-64 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <PipelineSkeleton />
            </div>
        );
    }

    // Estado de error
    if (error) {
        return (
            <div className="h-full flex items-center justify-center p-8">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-red-800 mb-2">Error</h3>
                    <p className="text-red-600 mb-4">{error}</p>
                    <div className="flex gap-3 justify-center">
                        <button 
                            onClick={refresh}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" /> Reintentar
                        </button>
                        <button 
                            onClick={() => window.location.href = '/'}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                            Ir al Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Sin datos (pero sin error)
    if (!columns || columns.length === 0) {
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
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                        <p>No hay órdenes de producción disponibles.</p>
                        <button 
                            onClick={handleNewOrder}
                            className="mt-4 px-4 py-2 bg-[#42526E] text-white rounded-lg hover:bg-[#344563]"
                        >
                            Crear nueva orden
                        </button>
                    </div>
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
                            key={column?.id}
                            column={column}
                            onCardClick={handleCardClick}
                        />
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
}
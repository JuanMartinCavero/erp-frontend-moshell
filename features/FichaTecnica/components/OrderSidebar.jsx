import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { ShoppingCart, Check, Edit2 } from 'lucide-react';
import api from '../../../services/api';

export default function OrderSidebar({ pedido, estimatedQuantity, onUpdatePedido, isEditing }) {
  const [showPedidoSelector, setShowPedidoSelector] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [loadingPedidos, setLoadingPedidos] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    if (showPedidoSelector) {
      loadPedidos();
    }
  }, [showPedidoSelector, currentPage]);

  const loadPedidos = async () => {
    setLoadingPedidos(true);
    try {
      const response = await api.get(`/pedidos?page=${currentPage}`);
      setPedidos(response.data.data);
      setLastPage(response.data.last_page || 1);
    } catch (error) {
      console.error('Error cargando pedidos:', error);
    } finally {
      setLoadingPedidos(false);
    }
  };

  const handlePedidoSelect = async (pedidoId) => {
    const result = await onUpdatePedido(pedidoId);
    if (result.success) {
      setShowPedidoSelector(false);
    } else {
      alert('Error al asignar pedido: ' + result.error);
      console.error('Error al asignar pedido:', result.error);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <p className="text-xs font-bold text-gray-400 uppercase">Order Info</p>
        {isEditing && (
          <button 
            onClick={() => setShowPedidoSelector(!showPedidoSelector)}
            className="text-xs font-semibold text-[#42526E] hover:underline flex items-center gap-1"
          >
            <Edit2 className="w-3 h-3" />
            {pedido ? 'Cambiar Pedido' : 'Asignar Pedido'}
          </button>
        )}
      </CardHeader>
      <CardContent>
        {/* Selector de pedidos */}
        {showPedidoSelector && (
          <div className="mb-4 border rounded-lg overflow-hidden bg-gray-50">
            {loadingPedidos ? (
              <div className="p-4 text-center text-sm">Cargando pedidos...</div>
            ) : pedidos.length === 0 ? (
              <div className="p-4 text-center text-sm">No hay pedidos disponibles</div>
            ) : (
              <>
                <div className="max-h-48 overflow-y-auto">
                  {pedidos.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handlePedidoSelect(p.id)}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-100 border-b last:border-b-0"
                    >
                      <div>
                        <p className="font-medium text-sm">{p.numero_pedido}</p>
                        <p className="text-xs text-gray-500">
                          Total: ${p.total} | Estado: {p.estado}
                        </p>
                      </div>
                      {pedido?.id === p.id && (
                        <Check className="w-4 h-4 text-indigo-600" />
                      )}
                    </button>
                  ))}
                </div>
                {lastPage > 1 && (
                  <div className="flex justify-between items-center p-2 border-t">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="text-xs text-indigo-600 disabled:opacity-50"
                    >
                      Anterior
                    </button>
                    <span className="text-xs text-gray-500">Página {currentPage} de {lastPage}</span>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(lastPage, p + 1))}
                      disabled={currentPage === lastPage}
                      className="text-xs text-indigo-600 disabled:opacity-50"
                    >
                      Siguiente
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Mostrar pedido actual */}
        {pedido ? (
          <div className="space-y-2">
            <p className="text-sm"><span className="text-gray-500">Pedido #:</span> {pedido.numero_pedido}</p>
            <p className="text-sm"><span className="text-gray-500">Tipo:</span> {pedido.tipo_pedido || "N/A"}</p>
            <p className="text-sm"><span className="text-gray-500">Total:</span> ${pedido.total}</p>
            <p className="text-sm"><span className="text-gray-500">Estado:</span> {pedido.estado}</p>
            <p className="text-sm"><span className="text-gray-500">Estado Pago:</span> {pedido.estado_pago || "N/A"}</p>
            <p className="text-sm"><span className="text-gray-500">Fecha:</span> {pedido.fecha_pedido}</p>
          </div>
        ) : (
          <div className="text-center py-4">
            <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-50 text-gray-400" />
            <p className="text-gray-500 text-sm">No hay pedido asociado</p>
            {estimatedQuantity && (
              <p className="text-xs text-gray-400 mt-2">Cantidad estimada: {estimatedQuantity} unidades</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
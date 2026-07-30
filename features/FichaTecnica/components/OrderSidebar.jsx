import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { ShoppingCart, Check, Edit2, Search, X, AlertCircle, Loader } from 'lucide-react';
import api from '../../../services/api';

export default function OrderSidebar({ 
  pedido, 
  estimatedQuantity, 
  onUpdatePedido, 
  isEditing,
  techSheetName = '' // 👈 NUEVO: nombre del producto de la ficha técnica
}) {
  const [showPedidoSelector, setShowPedidoSelector] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [filteredPedidos, setFilteredPedidos] = useState([]);
  const [loadingPedidos, setLoadingPedidos] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // Cargar pedidos filtrados por producto cuando se abre el selector
  useEffect(() => {
    if (showPedidoSelector) {
      loadPedidosFiltrados();
    }
  }, [showPedidoSelector]);

  // Filtrar por búsqueda
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPedidos(pedidos);
      return;
    }
    const term = searchTerm.toLowerCase();
    const filtered = pedidos.filter(p => 
      p.numero_pedido?.toLowerCase().includes(term) ||
      (p.cliente_nombre?.toLowerCase().includes(term))
    );
    setFilteredPedidos(filtered);
  }, [searchTerm, pedidos]);

  const loadPedidosFiltrados = async () => {
    setLoadingPedidos(true);
    setError(null);
    try {
      // Obtener todos los pedidos
      const response = await api.get('/pedidos', { 
        params: { limit: 100 }
      });
      
      let allPedidos = response.data.data || [];
      
      // Si hay un nombre de producto, filtrar pedidos que lo contengan
      if (techSheetName) {
        // Obtener detalles de cada pedido para verificar el producto
        const pedidosWithDetails = await Promise.all(
          allPedidos.map(async (p) => {
            try {
              const detailRes = await api.get(`/pedidos/${p.id}`);
              const detalles = detailRes.data?.detalles || [];
              
              // Verificar si algún detalle coincide con el nombre del producto
              const hasProduct = detalles.some(d => 
                d.producto && 
                d.producto.toLowerCase().includes(techSheetName.toLowerCase())
              );
              
              return { 
                ...p, 
                hasProduct,
                cliente_nombre: p.cliente?.nombre || 'Sin cliente',
                productos: detalles.map(d => d.producto).join(', ')
              };
            } catch (err) {
              return { 
                ...p, 
                hasProduct: false,
                cliente_nombre: p.cliente?.nombre || 'Sin cliente',
                productos: ''
              };
            }
          })
        );
        
        // Filtrar solo pedidos que tienen el producto
        const filtered = pedidosWithDetails.filter(p => p.hasProduct);
        setPedidos(filtered);
        setFilteredPedidos(filtered);
        
        if (filtered.length === 0) {
          setError(`No se encontraron pedidos con el producto "${techSheetName}"`);
        }
      } else {
        // Si no hay nombre de producto, mostrar todos
        const pedidosConCliente = allPedidos.map(p => ({
          ...p,
          cliente_nombre: p.cliente?.nombre || 'Sin cliente',
          productos: ''
        }));
        setPedidos(pedidosConCliente);
        setFilteredPedidos(pedidosConCliente);
      }
      
      setLastPage(response.data.last_page || 1);
    } catch (error) {
      console.error('Error cargando pedidos:', error);
      setError('Error al cargar pedidos');
    } finally {
      setLoadingPedidos(false);
    }
  };

  const handlePedidoSelect = async (pedidoId) => {
    setLoadingPedidos(true);
    setError(null);
    try {
      const result = await onUpdatePedido(pedidoId);
      if (result.success) {
        setShowPedidoSelector(false);
        setSearchTerm('');
        setPedidos([]);
        setFilteredPedidos([]);
      } else {
        setError(result.error || 'Error al asignar pedido');
      }
    } catch (err) {
      setError(err.message || 'Error al asignar pedido');
    } finally {
      setLoadingPedidos(false);
    }
  };

  const handleCancel = () => {
    setShowPedidoSelector(false);
    setSearchTerm('');
    setError(null);
    setPedidos([]);
    setFilteredPedidos([]);
  };

  const getStatusBadge = (estado) => {
    const styles = {
      'Reunión previa': 'bg-yellow-100 text-yellow-800',
      'Ingreso de pedido': 'bg-blue-100 text-blue-800',
      'En producción': 'bg-purple-100 text-purple-800',
      'Completado': 'bg-green-100 text-green-800',
      'Cancelado': 'bg-red-100 text-red-800',
    };
    return styles[estado] || 'bg-gray-100 text-gray-800';
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
            {/* Información del producto */}
            {techSheetName && (
              <div className="p-2 bg-blue-50 border-b border-blue-100 text-xs text-blue-700">
                <span className="font-medium">Producto:</span> {techSheetName}
                <span className="text-blue-500 ml-2">* Solo pedidos con este producto</span>
              </div>
            )}

            {/* Buscador */}
            <div className="p-2 border-b bg-white">
              <div className="flex items-center border rounded-lg px-3 py-1.5 bg-white">
                <Search className="w-3.5 h-3.5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Buscar pedido por número o cliente..."
                  className="flex-1 outline-none text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {loadingPedidos && (
                  <Loader className="w-3.5 h-3.5 text-[#42526E] animate-spin ml-2" />
                )}
              </div>
            </div>

            {/* Mensaje de error */}
            {error && (
              <div className="p-2 bg-red-50 border-b border-red-100 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5" />
                {error}
              </div>
            )}

            {/* Lista de pedidos */}
            {loadingPedidos ? (
              <div className="p-4 text-center text-sm text-gray-500">
                <Loader className="w-5 h-5 animate-spin mx-auto mb-2" />
                Cargando pedidos...
              </div>
            ) : filteredPedidos.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                {searchTerm 
                  ? 'No se encontraron pedidos con esa búsqueda' 
                  : techSheetName 
                    ? `No hay pedidos con el producto "${techSheetName}"` 
                    : 'No hay pedidos disponibles'
                }
              </div>
            ) : (
              <>
                <div className="max-h-48 overflow-y-auto">
                  {filteredPedidos.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handlePedidoSelect(p.id)}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-100 border-b last:border-b-0 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">{p.numero_pedido}</p>
                          {pedido?.id === p.id && (
                            <Check className="w-3.5 h-3.5 text-indigo-600" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate">
                          {p.cliente_nombre || 'Sin cliente'}
                        </p>
                        {p.productos && (
                          <p className="text-[10px] text-gray-400 truncate">
                            {p.productos}
                          </p>
                        )}
                      </div>
                      <div className="text-right ml-2 flex-shrink-0">
                        <p className="text-xs font-medium">${p.total || '0.00'}</p>
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${getStatusBadge(p.estado)}`}>
                          {p.estado || 'Sin estado'}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
                {lastPage > 1 && (
                  <div className="flex justify-between items-center p-2 border-t bg-white">
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

            {/* Botón cancelar */}
            <div className="p-2 border-t bg-white">
              <button
                onClick={handleCancel}
                className="w-full py-1.5 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded transition-colors"
              >
                Cancelar
              </button>
            </div>
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
            {estimatedQuantity && (
              <p className="text-sm"><span className="text-gray-500">Cantidad estimada:</span> {estimatedQuantity} unidades</p>
            )}
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
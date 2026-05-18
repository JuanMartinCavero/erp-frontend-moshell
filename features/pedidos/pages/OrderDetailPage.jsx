// src/features/pedidos/pages/OrderDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getPedidoDetalle } from '../../../services/pedidosApi';

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await getPedidoDetalle(id);
        setOrder(response.data);
        setError(null);
      } catch (err) {
        console.error('Error:', err);
        setError(err.response?.data?.message || 'Error al cargar el pedido');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">Cargando pedido #{id}...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => navigate('/admin/orders')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Volver a pedidos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <button 
        onClick={() => navigate('/admin/orders')}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver a pedidos
      </button>

      <h1 className="text-2xl font-bold text-slate-900 mb-6">
        Detalle del Pedido
      </h1>

      {order && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-500">Número de Pedido</p>
              <p className="font-semibold">{order.numero_pedido || order.id}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Estado</p>
              <p className="font-semibold">{order.estado}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Cliente</p>
              <p className="font-semibold">{order.cliente?.nombre || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Total</p>
              <p className="font-semibold">S/ {order.total}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailPage;
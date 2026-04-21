import React from 'react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';

export default function OrderSidebar({ pedido, estimatedQuantity }) {
  return (
    <Card>
      <CardHeader><p className="text-xs font-bold text-gray-400 uppercase">Order Info</p></CardHeader>
      <CardContent>
        {pedido ? (
          <div className="space-y-2">
            <p className="text-sm"><span className="text-gray-500">Pedido #:</span> {pedido.id}</p>
            <p className="text-sm"><span className="text-gray-500">Cantidad:</span> {pedido.cantidad || estimatedQuantity}</p>
            <p className="text-sm"><span className="text-gray-500">Estado:</span> {pedido.estado || "N/A"}</p>
          </div>
        ) : <p className="text-gray-500 text-center py-4">No hay pedido asociado</p>}
      </CardContent>
    </Card>
  );
}
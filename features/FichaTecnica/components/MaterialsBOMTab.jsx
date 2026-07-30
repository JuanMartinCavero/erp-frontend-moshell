import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';

export default function MaterialsBOMTab({ materiales, isEditing }) {
  // Función segura para formatear precio
  const formatPrice = (price) => {
    if (price === null || price === undefined) return '';
    const num = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(num)) return '';
    return `S/ ${num.toFixed(2)}`;
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-bold">Materiales del Pedido</h4>
        </div>
        {materiales && materiales.length > 0 ? (
          materiales.map((m, idx) => (
            <div key={idx} className="flex justify-between p-3 bg-gray-50 rounded-lg mb-2">
              <div>
                <p className="font-medium">{m.nombre || m.producto || 'Sin nombre'}</p>
                <p className="text-xs text-gray-500">
                  {m.talla && `Talla: ${m.talla} | `}
                  {m.color && `Color: ${m.color} | `}
                  Cantidad: {m.cantidad || 0}
                  {m.peso && ` | Peso: ${m.peso} kg`}
                </p>
              </div>
              <div className="text-right">
                {m.precio_unitario && (
                  <p className="text-sm font-semibold">
                    {formatPrice(m.precio_unitario)}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  {m.unidad || 'u'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">
            No hay materiales asociados al pedido
          </p>
        )}
      </CardContent>
    </Card>
  );
}
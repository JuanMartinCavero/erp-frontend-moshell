import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';

export default function SizeSpecsTab({ sizeSpecs, pedido }) {
  // ✅ Obtener tallas únicas de los detalles del pedido
  const getTallasFromPedido = () => {
    if (!pedido?.detalles) return [];
    const tallas = pedido.detalles
      .map(d => d.talla)
      .filter(talla => talla && talla.trim() !== '');
    return [...new Set(tallas)]; // Eliminar duplicados
  };

  const tallas = getTallasFromPedido();

  // Agrupar detalles por talla
  const getDetallesPorTalla = () => {
    if (!pedido?.detalles) return {};
    return pedido.detalles.reduce((acc, detalle) => {
      const talla = detalle.talla || 'Sin talla';
      if (!acc[talla]) acc[talla] = [];
      acc[talla].push(detalle);
      return acc;
    }, {});
  };

  const detallesPorTalla = getDetallesPorTalla();

  return (
    <Card>
      <CardContent className="pt-6">
        <h4 className="font-bold mb-4">Especificaciones de Tallas</h4>
        
        {tallas.length > 0 ? (
          <div className="space-y-6">
            {Object.entries(detallesPorTalla).map(([talla, detalles]) => (
              <div key={talla} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 font-semibold text-sm border-b">
                  Talla: {talla}
                </div>
                <div className="divide-y divide-gray-100">
                  {detalles.map((detalle, idx) => (
                    <div key={idx} className="px-4 py-3 grid grid-cols-4 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500 text-xs">Producto</span>
                        <p className="font-medium">{detalle.producto || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs">Color</span>
                        <p>{detalle.color || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs">Cantidad</span>
                        <p>{detalle.cantidad || 0}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs">Peso (kg)</span>
                        <p>{detalle.peso || 0}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : sizeSpecs ? (
          // Fallback: si no hay tallas en pedido, mostrar sizeSpecs como antes
          <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-auto">
            {typeof sizeSpecs === 'string' 
              ? JSON.stringify(JSON.parse(sizeSpecs), null, 2)
              : JSON.stringify(sizeSpecs, null, 2)}
          </pre>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No hay especificaciones de tallas definidas en el pedido
          </p>
        )}
      </CardContent>
    </Card>
  );
}
// src/features/production/components/ProductionSidebar.jsx
import React from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/Card';

export default function ProductionSidebar({ 
  developmentStatus, 
  estimatedCost, 
  pedidoQuantity,  // ← NUEVO: cantidad del pedido
  onSendToProduction 
}) {
  const handleSend = () => {
    // Mostrar la cantidad real del pedido como valor por defecto
    const defaultQuantity = pedidoQuantity || 100;
    const quantity = prompt("Cantidad a producir:", defaultQuantity);
    if (quantity) onSendToProduction(parseInt(quantity));
  };

  return (
    <Card className="bg-[#42526E] text-white border-none shadow-md">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 text-blue-100 mb-6">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-semibold">Production Status</span>
        </div>
        {developmentStatus === 'IN_PRODUCTION' ? (
          <p className="text-center text-sm">🎉 En producción</p>
        ) : (
          <>
            <button onClick={handleSend} className="w-full bg-white text-[#42526E] py-3 rounded-lg font-bold mb-4 flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> SEND TO PRODUCTION
            </button>
            <p className="text-xs text-blue-200 text-center">Costo estimado: ${estimatedCost?.toLocaleString() || 'N/A'}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
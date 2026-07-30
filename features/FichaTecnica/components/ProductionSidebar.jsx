import React, { useState } from 'react';
import { CheckCircle2, Send, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/Card';

export default function ProductionSidebar({ 
  developmentStatus, 
  estimatedCost, 
  pedidoQuantity,
  onSendToProduction,
  canSendToProduction = false,  // 👈 NUEVO: prop con valor por defecto
  sendReasons = []              // 👈 NUEVO: prop con valor por defecto
}) {
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!canSendToProduction) {
      return; // No debería pasar porque el botón está deshabilitado
    }
    
    const quantity = prompt("Cantidad a producir:", pedidoQuantity || 100);
    if (quantity) {
      setIsSending(true);
      try {
        await onSendToProduction(parseInt(quantity));
      } catch (error) {
        console.error('Error al enviar a producción:', error);
      } finally {
        setIsSending(false);
      }
    }
  };

  // 👇 NUEVO: Función para obtener el mensaje de herramienta
  const getTooltipMessage = () => {
    if (sendReasons.length === 0) return 'Enviar ficha técnica a producción';
    return sendReasons.join('\n');
  };

  return (
    <Card className="bg-[#42526E] text-white border-none shadow-md">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 text-blue-100 mb-6">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-semibold">Estado del envío a Producción</span>
        </div>
        
        {developmentStatus === 'IN_PRODUCTION' ? (
          <p className="text-center text-sm">🎉 En producción</p>
        ) : (
          <>
            <button 
              onClick={handleSend}
              disabled={!canSendToProduction || isSending}
              title={getTooltipMessage()}
              className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors ${
                canSendToProduction && !isSending
                  ? 'bg-white text-[#42526E] hover:bg-gray-100' 
                  : 'bg-gray-400 text-gray-600 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              {isSending ? 'Enviando...' : 'Enviar a Producción'}
            </button>

            {/* 👇 NUEVO: Mostrar razones si no se puede enviar */}
            {!canSendToProduction && sendReasons.length > 0 && (
              <div className="mt-3 p-2 bg-red-500/20 rounded-lg border border-red-400/30">
                <p className="text-xs font-medium text-red-200 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  No se puede enviar a producción:
                </p>
                <ul className="text-xs text-red-200/80 list-disc list-inside mt-1 space-y-0.5">
                  {sendReasons.map((reason, index) => (
                    <li key={index} className="ml-1">{reason}</li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-xs text-blue-200 text-center mt-4">
              Costo estimado: ${estimatedCost?.toLocaleString() || 'N/A'}
            </p>
            {pedidoQuantity && (
              <p className="text-xs text-blue-200 text-center">
                Cantidad pedido: {pedidoQuantity} unidades
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

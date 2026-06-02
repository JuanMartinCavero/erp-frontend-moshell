import React, { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/Card";

export default function ProductionSidebar({
  developmentStatus,
  estimatedCost,
  pedidoQuantity,
  onSendToProduction,
}) {
  console.log("pedidoQuantity:", pedidoQuantity);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSend = () => {
    setShowConfirm(true);
  };

  const confirmSend = () => {
    onSendToProduction(pedidoQuantity);
    setShowConfirm(false);
  };

  return (
    <>
      <Card className="bg-[#42526E] text-white border-none shadow-md">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-blue-100 mb-6">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold">Production Status</span>
          </div>

          {developmentStatus === "IN_PRODUCTION" ? (
            <p className="text-center text-sm">🎉 En producción</p>
          ) : (
            <>
              <button
                onClick={handleSend}
                className="w-full bg-white text-[#42526E] py-3 rounded-lg font-bold mb-4 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                SEND TO PRODUCTION
              </button>

              <p className="text-xs text-blue-200 text-center">
                Costo estimado: ${estimatedCost?.toLocaleString() || "N/A"}
              </p>
            </>
          )}
        </CardContent>
      </Card>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
            <h3 className="text-lg font-bold mb-2 text-gray-900">
              Confirmar envío
            </h3>

            <p className="text-gray-600 mb-4">
              Se enviarán <strong>{pedidoQuantity}</strong> unidades a
              producción.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancelar
              </button>

              <button
                onClick={confirmSend}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

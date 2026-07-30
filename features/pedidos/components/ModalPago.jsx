import { useEffect, useState } from "react";
import usePedidos from "../../../hooks/usePedidos";

export default function PagoModal({ isOpen, onClose, pedido }) {
  const [estadoPago, setEstadoPago] = useState("");
  // Removed local loading to use hook's global loading
  const [showSuccess, setShowSuccess] = useState(false);
  const { hookUpdateEstadoPago } = usePedidos();
  const [successMessage, setSuccessMessage] = useState('');
  useEffect(() => {
    if (pedido) {
      setEstadoPago(pedido.estado_pago);
    }
  }, [pedido]);

  if (!isOpen || !pedido) return null;

  const total = Number(pedido?.total) || 0;
  const pagado = Number(pedido?.adelanto_50) || 0;
  const saldo = Number(pedido?.saldo) || total - pagado;

  const calcularPreview = (estado) => {
    switch (estado) {
      case "Cancelado":
        return { pagado: total, saldo: 0 };

      case "Canceló 50%":
        return {
          pagado: total * 0.5,
          saldo: total * 0.5,
        };

      default:
        return {
          pagado: 0,
          saldo: total,
        };
    }
  };

  const preview = calcularPreview(estadoPago);

  const handleSubmit = async () => {
    try {
      await hookUpdateEstadoPago(pedido.id, estadoPago);
      
      setSuccessMessage('¡Estado actualizado! Se refleja en la tabla.');
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (error) {
      alert('Error al actualizar pago');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">
        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-lg">Actualizar Pago</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* INFO */}
        <div className="text-sm space-y-2 mb-4">
          <div className="flex justify-between">
            <span>Total:</span>
            <b>S/ {total.toFixed(2)}</b>
          </div>

          <div className="flex justify-between">
            <span>Nuevo pagado:</span>
            <b className="text-green-600">S/ {preview.pagado.toFixed(2)}</b>
          </div>

          <div className="flex justify-between">
            <span>Nuevo saldo:</span>
            <b className="text-red-600">S/ {preview.saldo.toFixed(2)}</b>
          </div>
        </div>

        {/* SELECT */}
        <label className="text-sm font-semibold">Estado de pago</label>

        <select
          className="w-full border rounded p-2 mt-1 mb-4"
          value={estadoPago}
          onChange={(e) => setEstadoPago(e.target.value)}
        >
          <option value="Falta cancelar">Falta cancelar</option>
          <option value="Canceló 50%">Canceló 50%</option>
          <option value="Cancelado">Cancelado</option>
        </select>

        {/* BOTONES */}
        <div className="flex gap-2">
          <button className="flex-1 border rounded py-2" onClick={onClose}>
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 text-white rounded py-2"
          >
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
}

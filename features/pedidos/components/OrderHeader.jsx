import { useState } from "react";

export default function OrderHeader({ onOpenModal }) {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight">
            Gestión de Pedidos de Clientes
          </h2>

          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Supervise y gestione las órdenes de fabricación en tiempo real.
          </p>
        </div>

        <button
          onClick={onOpenModal}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
        >
          <span>+ Nuevo Pedido</span>
        </button>
      </div>
    </>
  );
}

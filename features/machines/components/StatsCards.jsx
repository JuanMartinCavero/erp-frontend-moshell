import React, { useEffect } from "react";

import { useMachines } from "../../../hooks/useMachine";

export default function StatsCards() {
  const { stats, fetchStats } = useMachines();

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) return null;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-primary text-sm font-semibold mb-1 uppercase tracking-wider">
            Planificación
          </p>

          <h2 className="text-3xl font-bold">
            Gestión de Producción y Máquinas
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-100 border">
            <span className="text-xs text-slate-500 font-medium">
              Capacidad de Planta
            </span>

            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[88%]"></div>
              </div>

              <span className="text-sm font-bold">88%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border">
          <div className="flex items-center justify-between mb-4">
            <span className="p-2 bg-amber-500/10 text-amber-500 rounded-lg material-symbols-outlined">
              Maquinas relacionadas con Pedidos
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Programación
            </span>
          </div>

          <h3 className="text-2xl font-bold">{stats.maquinasConPedido}</h3>
        </div>

        <div className="bg-white p-5 rounded-2xl border">
          <div className="flex items-center justify-between mb-4">
            <span className="p-2 bg-blue-500/10 text-blue-500 rounded-lg material-symbols-outlined">
              Total de Maquinas
            </span>

            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Tejido
            </span>
          </div>

          <h3 className="text-2xl font-bold">{stats.totalMaquinas}</h3>
        </div>

        <div className="bg-white p-5 rounded-2xl border">
          <div className="flex items-center justify-between mb-4">
            <span className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg material-symbols-outlined">
              check_circle
            </span>

            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Platillado
            </span>
          </div>

          <h3 className="text-2xl font-bold">1,240 Kg</h3>

          <p className="text-xs text-slate-500 mt-1">
            Listos para revisión de calidad
          </p>
        </div>
      </div>
    </>
  );
}

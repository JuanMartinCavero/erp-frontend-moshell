// src/features/production/components/PipelineSkeleton.jsx

import React from "react";

const PipelineSkeleton = () => {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4 select-none">
      {/* Renderizamos 4 columnas simuladas (el promedio en pantallas estándar) */}
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-[340px] flex-shrink-0 flex flex-col bg-slate-100/70 rounded-2xl p-4 border border-slate-200/60"
        >
          {/* Cabecera de la columna Skeleton */}
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2.5">
              {/* Título de la fase de producción */}
              <div className="h-4 w-24 bg-slate-200 rounded-md animate-pulse"></div>
              {/* Contador de tarjetas en cápsula */}
              <div className="h-5 w-7 bg-slate-200 rounded-full animate-pulse"></div>
            </div>
            {/* Botón de opciones de columna */}
            <div className="w-4 h-4 bg-slate-200 rounded-md animate-pulse"></div>
          </div>

          {/* Contenedor de Tarjetas Skeleton */}
          <div className="space-y-3 flex-1">
            {[1, 2, 3].map((j) => (
              <div
                key={j}
                className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs"
              >
                {/* Cabecera de la tarjeta: Código de orden y badge de prioridad */}
                <div className="flex justify-between items-center mb-3.5">
                  {/* Alternamos anchos para simular datos reales no simétricos */}
                  <div
                    className={`h-4 bg-slate-200 rounded-md animate-pulse ${j % 2 === 0 ? "w-20" : "w-28"}`}
                  ></div>
                  <div className="h-5 w-14 bg-slate-200 rounded-full animate-pulse"></div>
                </div>

                {/* Título del Producto / Descripción técnica */}
                <div className="h-4 w-11/12 bg-slate-200 rounded-md animate-pulse mb-2"></div>
                <div className="h-3.5 w-2/3 bg-slate-100 rounded-md animate-pulse mb-4"></div>

                {/* Separador interno decorativo */}
                <div className="border-t border-slate-100 my-3"></div>

                {/* Footer de la tarjeta: Fecha u Operario asignado */}
                <div className="flex justify-between items-center pt-0.5">
                  <div className="h-3 w-16 bg-slate-100 rounded-md animate-pulse"></div>
                  {/* Avatar circular simulado */}
                  <div className="h-6 w-6 bg-slate-200 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PipelineSkeleton;

import React from 'react';
import { FileText, Clock, AlertCircle, TrendingUp } from 'lucide-react';

export default function MetricsCards({ stats }) {
  const cards = [
    {
      title: 'Total Fichas',
      value: stats.total || 0,
      icon: FileText,
      trend: '+12% este mes',
      trendColor: 'text-emerald-500',
      bgIcon: 'text-indigo-500/5',
    },
    {
      title: 'En Desarrollo',
      value: stats.enDesarrollo || 0,
      icon: Clock,
      subtitle: '8 urgentes',
      subtitleColor: 'text-indigo-400',
      bgIcon: 'text-indigo-500/5',
    },
    {
      title: 'Pendiente Aprobación',
      value: stats.pendienteAprobacion || 0,
      icon: AlertCircle,
      subtitle: 'Requiere atención',
      subtitleColor: 'text-red-500',
      bgIcon: 'text-indigo-500/5',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-surface-container p-6 rounded-xl border border-outline-variant/10 shadow-sm shadow-indigo-500/5 relative overflow-hidden"
        >
          <div className="relative z-10">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
              {card.title}
            </p>
            <h3 className="text-4xl font-extrabold font-headline text-on-surface">
              {card.value}
            </h3>
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold">
              {card.trend ? (
                <>
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className={card.trendColor}>{card.trend}</span>
                </>
              ) : (
                <span className={card.subtitleColor}>
                  <Clock className="w-4 h-4 inline mr-1" />
                  {card.subtitle}
                </span>
              )}
            </div>
          </div>
          <card.icon className={`absolute -right-4 -bottom-4 w-24 h-24 ${card.bgIcon}`} />
        </div>
      ))}
    </div>
  );
}
import React from 'react';
import { Filter, Grid, List } from 'lucide-react';

export default function FiltersBar({
  onSeasonFilter,
  onStatusFilter,
  viewMode,
  onViewModeChange,
}) {
  const seasons = ['Todas', 'Invierno 2024', 'Primavera 2024', 'Verano 2023'];
  const statuses = ['Todos', 'Aprobado', 'Borrador', 'En Proceso'];

  return (
    <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/10 flex flex-wrap gap-4 items-center justify-between">
      <div className="flex gap-3 flex-1 min-w-[300px]">
        <div className="flex-1 relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Filtrar por Cliente o Referencia..."
            className="w-full bg-surface-container-low border-none rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary text-on-surface outline-none"
          />
        </div>
        
        <select
          onChange={(e) => onSeasonFilter(e.target.value)}
          className="bg-surface-container-low border-none rounded-lg py-2.5 px-4 text-sm focus:ring-1 focus:ring-primary text-on-surface appearance-none pr-10 cursor-pointer"
        >
          {seasons.map(season => (
            <option key={season} value={season === 'Todas' ? '' : season}>
              Temporada: {season}
            </option>
          ))}
        </select>
        
        <select
          onChange={(e) => onStatusFilter(e.target.value)}
          className="bg-surface-container-low border-none rounded-lg py-2.5 px-4 text-sm focus:ring-1 focus:ring-primary text-on-surface appearance-none pr-10 cursor-pointer"
        >
          {statuses.map(status => (
            <option key={status} value={status === 'Todos' ? '' : status}>
              Estado: {status}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => onViewModeChange('grid')}
          className={`p-2.5 rounded-lg transition-colors ${
            viewMode === 'grid'
              ? 'text-indigo-500 bg-indigo-500/10'
              : 'text-slate-400 hover:bg-surface-container-high'
          }`}
        >
          <Grid className="w-5 h-5" />
        </button>
        <button
          onClick={() => onViewModeChange('list')}
          className={`p-2.5 rounded-lg transition-colors ${
            viewMode === 'list'
              ? 'text-indigo-500 bg-indigo-500/10'
              : 'text-slate-400 hover:bg-surface-container-high'
          }`}
        >
          <List className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit, Copy, Trash2 } from 'lucide-react';

const statusColors = {
  Aprobado: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'En Proceso': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  Borrador: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getBgColor = (name) => {
  const colors = ['bg-slate-700', 'bg-indigo-900', 'bg-emerald-900'];
  const index = name.length % colors.length;
  return colors[index];
};

export default function TableRow({ sheet, onDelete, onDuplicate }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm(`¿Eliminar ficha ${sheet.reference}?`)) {
      onDelete(sheet.id);
    }
  };

  const handleDuplicate = () => {
    onDuplicate(sheet.id);
  };

  return (
    <tr className="hover:bg-primary/5 transition-colors group">
      <td className="px-6 py-4">
        <span className="font-mono text-indigo-400 font-semibold">{sheet.reference}</span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded ${getBgColor(sheet.cliente?.empresa || '')} flex items-center justify-center text-[10px] font-bold text-white`}>
            {getInitials(sheet.cliente?.empresa || 'N/A')}
          </div>
          <span className="text-sm font-medium text-on-surface">
            {sheet.cliente?.empresa || 'Sin cliente'}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-on-surface">{sheet.name}</span>
      </td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${statusColors[sheet.development_status] || 'bg-slate-500/10 text-slate-400'}`}>
          {sheet.development_status === 'APPROVED_BY_CLIENT' ? 'Aprobado' :
           sheet.development_status === 'IN_PRODUCTION' ? 'En Proceso' :
           sheet.development_status === 'DRAFT' ? 'Borrador' : sheet.development_status}
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <span className="text-xs text-slate-500">
          {new Date(sheet.updated_at).toLocaleDateString()}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => navigate(`/FichaTecnica/${sheet.id}`)}
            className="p-2 text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all"
            title="Ver"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate(`/FichaTecnica/editar/${sheet.id}`)}
            className="p-2 text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all"
            title="Editar"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={handleDuplicate}
            className="p-2 text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all"
            title="Duplicar"
          >
            <Copy className="w-5 h-5" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
            title="Eliminar"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}
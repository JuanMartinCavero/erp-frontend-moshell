// src/features/inventory/Inventory.jsx
import React from "react";
import {
  Package,
  FileText,
  Bell,
  Settings,
  Download,
  Calendar,
  TrendingUp,
  AlertTriangle,
  ChevronDown,
} from 'lucide-react';

export function Inventory() {
  const statsCards = [
    {
      icon: Package,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      title: 'Textiles en Stock',
      value: '142,500',
      subtitle: 'unidades',
      change: '+7% vs mes pasado',
      changeColor: 'text-emerald-600'
    },
    {
      icon: FileText,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      title: 'Órdenes Pedidas',
      value: '38,210',
      subtitle: 'órdenes',
      change: '12 órdenes nuevas',
      changeColor: 'text-gray-600'
    },
    {
      icon: TrendingUp,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      title: 'Total Vendido',
      value: '104,290',
      subtitle: 'unidades',
      change: 'Meta 95%',
      changeColor: 'text-emerald-600'
    },
    {
      icon: AlertTriangle,
      iconBg: 'bg-red-50',
      iconColor: 'text-red-600',
      title: 'Pre-Alertas',
      value: '8',
      subtitle: 'lotes',
      change: 'Ver detalles de incidencias',
      changeColor: 'text-red-600'
    },
  ];

  const tableData = [
    {
      date: '24\nOct\n2023',
      docId: 'SKU-2023-0042',
      material: 'Pique Polo Shirt',
      lot: '72\n2334',
      entry: '+1,500',
      entryColor: 'text-emerald-600',
      exit: '0',
      balance: '5,420',
      location: 'Nave A-12',
      status: 'DISPONIBLE',
      statusColor: 'bg-emerald-50 text-emerald-700'
    },
    {
      date: '24\nOct\n2023',
      docId: 'SKU-2023-0041',
      material: 'Denim\nIndigo Stretch',
      lot: 'DR\n2238',
      entry: '0',
      entryColor: 'text-gray-400',
      exit: '-650',
      exitColor: 'text-red-600',
      balance: '100',
      location: 'Sede B - Estante 4',
      status: '',
      statusColor: ''
    },
    {
      date: '23\nOct\n2023',
      docId: 'SKU-POL-0011',
      material: 'Polyester\nFiber',
      lot: 'RS\n1112',
      entry: '0',
      entryColor: 'text-gray-400',
      exit: '-12.5',
      exitColor: 'text-red-600',
      balance: '6,870',
      location: 'Nave B-05',
      status: 'PENDIENTE',
      statusColor: 'bg-amber-50 text-amber-700'
    },
    {
      date: '23\nOct\n2023',
      docId: 'SKU-2023-0037',
      material: 'Hilo\nAlgodón 20/2 Bag',
      lot: 'IGH\n2411',
      entry: '+500',
      entryColor: 'text-emerald-600',
      exit: '0',
      exitColor: '',
      balance: '1,500',
      location: 'Taller\nP. Baja',
      status: 'DISPONIBLE',
      statusColor: 'bg-emerald-50 text-emerald-700'
    },
    {
      date: '22\nOct\n2023',
      docId: 'SKU-DEN-0004',
      material: 'Lona Ópalo\nPremium',
      lot: 'MGH\n4435',
      entry: '0',
      entryColor: 'text-gray-400',
      exit: '-850',
      exitColor: 'text-red-600',
      balance: '2,165',
      location: 'Nave A-03',
      status: 'DISPONIBLE',
      statusColor: 'bg-emerald-50 text-emerald-700'
    },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Kardex de Inventario</h1>
            <p className="text-sm text-gray-500 mt-0.5">Monitoreo en tiempo real de entradas y salidas de textiles.</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              <Calendar className="w-4 h-4" />
              <span>Últimas 30 días</span>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              <Download className="w-4 h-4" />
              <span>Exportar Data</span>
            </button>

            <button className="relative p-2 text-gray-400 hover:text-gray-600">
              <Bell className="w-5 h-5" />
            </button>

            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Settings className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">Administrador Moshell</div>
                <div className="text-xs text-gray-500">Admin</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-400 to-slate-600"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-5 mb-6">
          {statsCards.map((card, index) => (
            <div key={index} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-lg ${card.iconBg}`}>
                  <card.icon className={`w-5 h-5 ${card.iconColor}`} />
                </div>
              </div>
              <div className="text-xs text-gray-600 mb-1">{card.title}</div>
              <div className="flex items-baseline gap-2 mb-1">
                <div className="text-3xl font-semibold text-gray-900">{card.value}</div>
                <div className="text-xs text-gray-500">{card.subtitle}</div>
              </div>
              <div className={`text-xs ${card.changeColor}`}>{card.change}</div>
            </div>
          ))}
        </div>

        {/* Filters Bar */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-3">
            <div className="relative">
              <select className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent cursor-pointer">
                <option>Tipo de Material</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent cursor-pointer">
                <option>Atención</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent cursor-pointer">
                <option>Next Block</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
            Limpiar Filtros
          </button>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">FECHA</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">DOCUMENTO<br />SALIDA</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">MATERIAL</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">LOTE</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ENTRADA</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SALIDA</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SALDO</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">UBICACIÓN</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ESTADO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tableData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900 whitespace-pre-line leading-tight">{row.date}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-purple-600">{row.docId}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900 whitespace-pre-line">{row.material}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-600 whitespace-pre-line leading-tight">{row.lot}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className={`text-sm font-medium ${row.entryColor}`}>{row.entry}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className={`text-sm font-medium ${row.exitColor || 'text-gray-900'}`}>{row.exit}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-semibold text-gray-900">{row.balance}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-700 whitespace-pre-line leading-tight">{row.location}</div>
                    </td>
                    <td className="px-4 py-4">
                      {row.status && (
                        <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-semibold ${row.statusColor}`}>
                          {row.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <div className="text-sm text-gray-600">Mostrando 1 de 24 registros</div>
            <div className="flex gap-1">
              <button className="px-3 py-1.5 bg-purple-600 text-white rounded text-sm font-medium">1</button>
              <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">2</button>
              <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">3</button>
              <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">Siguiente</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
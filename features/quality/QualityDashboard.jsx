import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ClipboardCheck, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Search,
  Filter,
  ChevronRight,
  Eye,
  RefreshCw,
  TrendingUp,
  Clock,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useQualityOrders } from './hooks/useQualityOrders';

// Componente de tarjeta KPI
const KpiCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
    <div className="flex justify-between items-start mb-4">
      <div>
        <div className="text-sm font-medium text-slate-500 mb-1">{title}</div>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
      </div>
      <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
    </div>
    {trend && (
      <div className="flex items-center gap-1 text-sm">
        <TrendingUp className="w-4 h-4 text-emerald-600" />
        <span className="font-medium text-emerald-600">{trend}</span>
        <span className="text-slate-500">vs上月</span>
      </div>
    )}
  </div>
);

// Componente de filtros
const QualityFilters = ({ filters, onFilterChange, onSearch, onRefresh, loading }) => (
  <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
    <div className="flex gap-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by order or client..."
          value={filters.search}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-80 text-sm focus:outline-none focus:ring-2 focus:ring-[#42526E] focus:border-transparent"
        />
      </div>
      
      <select
        value={filters.quality_status}
        onChange={(e) => onFilterChange('quality_status', e.target.value)}
        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#42526E]"
      >
        <option value="">All Status</option>
        <option value="PENDING">Pending</option>
        <option value="PASSED">Passed</option>
        <option value="FAILED">Failed</option>
        <option value="REWORK">Rework</option>
      </select>
      
      <select
        value={filters.priority}
        onChange={(e) => onFilterChange('priority', e.target.value)}
        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#42526E]"
      >
        <option value="">All Priority</option>
        <option value="HIGH">High</option>
        <option value="MEDIUM">Medium</option>
        <option value="LOW">Low</option>
      </select>
    </div>
    
    <button
      onClick={onRefresh}
      disabled={loading}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
    >
      <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
      Refresh
    </button>
  </div>
);

// Componente de tabla de órdenes
const QualityOrdersTable = ({ orders, onInspect, loading }) => {
  const navigate = useNavigate();
  
  const getStatusBadge = (status) => {
    const config = {
      PASSED: { variant: 'success', icon: CheckCircle2, text: 'Passed' },
      FAILED: { variant: 'destructive', icon: XCircle, text: 'Failed' },
      REWORK: { variant: 'warning', icon: AlertCircle, text: 'Rework' },
      PENDING: { variant: 'secondary', icon: Clock, text: 'Pending' }
    };
    const { variant, icon: Icon, text } = config[status] || config.PENDING;
    return (
      <Badge variant={variant} className="flex items-center gap-1 w-fit">
        <Icon className="w-3 h-3" /> {text}
      </Badge>
    );
  };
  
  const getPriorityBadge = (priority) => {
    const config = {
      HIGH: 'bg-red-50 text-red-600',
      MEDIUM: 'bg-slate-100 text-slate-600',
      LOW: 'bg-blue-50 text-blue-600'
    };
    return (
      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${config[priority] || config.MEDIUM}`}>
        {priority}
      </span>
    );
  };
  
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
            <div className="h-6 bg-slate-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }
  
  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <ClipboardCheck className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No orders found in quality control phase</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Client</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Product</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Quality</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Priority</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-slate-900">{order.order_number}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">{order.client_name}</td>
              <td className="px-6 py-4 text-sm text-slate-600">{order.product_name}</td>
              <td className="px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-slate-900">{order.quantity_ordered} units</p>
                  <p className="text-xs text-slate-400">
                    Produced: {order.quantity_produced} | Defective: {order.quantity_defective}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4">{getStatusBadge(order.quality_status)}</td>
              <td className="px-6 py-4">{getPriorityBadge(order.priority)}</td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onInspect(order.id)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-[#42526E] hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Inspect
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Componente principal
export default function QualityDashboard() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: '',
    quality_status: '',
    priority: ''
  });
  
  const {
    orders,
    stats,
    loading,
    pagination,
    refresh,
    filterOrders
  } = useQualityOrders();
  
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    filterOrders(newFilters);
  };
  
  const handleSearch = (search) => {
    handleFilterChange('search', search);
  };
  
  const handleInspect = (orderId) => {
    navigate(`/quality/${orderId}`);
  };
  
  return (
    <div className="p-8 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <span>Quality Control</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-900 font-medium">Dashboard</span>
      </div>
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quality Control Dashboard</h1>
          <p className="text-sm text-gray-500">
            Manage and inspect production orders in quality control phase
          </p>
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <KpiCard 
          title="Total Orders" 
          value={stats.total} 
          icon={ClipboardCheck}
          color="bg-slate-600"
        />
        <KpiCard 
          title="Pending" 
          value={stats.pending} 
          icon={Clock}
          color="bg-amber-500"
        />
        <KpiCard 
          title="Passed" 
          value={stats.passed} 
          icon={ThumbsUp}
          color="bg-emerald-500"
        />
        <KpiCard 
          title="Failed" 
          value={stats.failed} 
          icon={ThumbsDown}
          color="bg-red-500"
        />
        <KpiCard 
          title="Rework" 
          value={stats.rework} 
          icon={AlertTriangle}
          color="bg-orange-500"
        />
      </div>
      
      {/* Filters */}
      <QualityFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onRefresh={refresh}
        loading={loading}
      />
      
      {/* Orders Table */}
      <QualityOrdersTable
        orders={orders}
        onInspect={handleInspect}
        loading={loading}
      />
      
      {/* Pagination */}
      {pagination && pagination.last_page > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => pagination.onPageChange(pagination.current_page - 1)}
            disabled={pagination.current_page === 1}
            className="px-3 py-1 border border-gray-200 rounded-lg text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1 text-sm text-gray-600">
            Page {pagination.current_page} of {pagination.last_page}
          </span>
          <button
            onClick={() => pagination.onPageChange(pagination.current_page + 1)}
            disabled={pagination.current_page === pagination.last_page}
            className="px-3 py-1 border border-gray-200 rounded-lg text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
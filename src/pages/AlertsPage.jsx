// src/pages/AlertsPage.jsx
import React, { useState, useEffect } from "react";
import {
  Bell,
  Filter,
  Search,
  Check,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Package,
  Clock,
  Truck,
  AlertCircle,
  Eye,
  EyeOff,
  Trash2,
  RefreshCw,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const AlertsPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "all", // all, unread, read
    severity: "all", // all, critical, high, medium, low
    type: "all", // all, stock_low, production_delay, order_overdue, quality_pending, payment_pending
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAlerts, setSelectedAlerts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchAlerts();
  }, [filters]);

    //  MODIFICADO 
  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        ...filters,
        search: searchTerm,
      }).toString();
      
      // MODIFICADO: Usar VITE_API_URL desde import.meta.env
      const baseUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${baseUrl}/alerts?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      if (data.success) {
        setAlerts(data.data);
        setTotalCount(data.total || data.data.length);
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
    } finally {
      setLoading(false);
    }
  };

   //  MODIFICADO
  const handleMarkAsRead = async (alertId) => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      await fetch(`${baseUrl}/alerts/${alertId}/read`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
      });
      setAlerts(alerts.map(a => 
        a.id === alertId ? { ...a, read: true } : a
      ));
    } catch (error) {
      console.error("Error marking alert as read:", error);
    }
  };

  // MODIFICADO
  const handleMarkAllAsRead = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      await fetch(`${baseUrl}/alerts/mark-all-read`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
      });
      setAlerts(alerts.map(a => ({ ...a, read: true })));
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  // MODIFICADO
  const handleDeleteAlert = async (alertId) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta alerta?")) return;
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      await fetch(`${baseUrl}/alerts/${alertId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
      });
      setAlerts(alerts.filter(a => a.id !== alertId));
    } catch (error) {
      console.error("Error deleting alert:", error);
    }
  };

  const getSeverityBadge = (severity) => {
    const styles = {
      critical: "bg-red-100 text-red-800 border-red-200",
      high: "bg-orange-100 text-orange-800 border-orange-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      low: "bg-blue-100 text-blue-800 border-blue-200",
    };
    return styles[severity] || styles.low;
  };

  const getTypeIcon = (type) => {
    const icons = {
      stock_low: <Package className="w-4 h-4" />,
      production_delay: <Clock className="w-4 h-4" />,
      order_overdue: <Truck className="w-4 h-4" />,
      quality_pending: <AlertCircle className="w-4 h-4" />,
      payment_pending: <AlertTriangle className="w-4 h-4" />,
    };
    return icons[type] || <Bell className="w-4 h-4" />;
  };

  const getTypeLabel = (type) => {
    const labels = {
      stock_low: "Stock Bajo",
      production_delay: "Retraso Producción",
      order_overdue: "Pedido Vencido",
      quality_pending: "Calidad Pendiente",
      payment_pending: "Pago Pendiente",
    };
    return labels[type] || type;
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestión de Alertas</h1>
          <p className="text-sm text-slate-500 mt-1">
            {totalCount} alertas {filters.status === "unread" ? "no leídas" : "en total"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleMarkAllAsRead}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Check className="w-4 h-4" />
            Marcar todas leídas
          </button>
          <button
            onClick={fetchAlerts}
            className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          {/* Buscador */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar alertas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchAlerts()}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filtro de estado */}
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todas</option>
            <option value="unread">No leídas</option>
            <option value="read">Leídas</option>
          </select>

          {/* Filtro de severidad */}
          <select
            value={filters.severity}
            onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todas las severidades</option>
            <option value="critical">Crítico</option>
            <option value="high">Alto</option>
            <option value="medium">Medio</option>
            <option value="low">Bajo</option>
          </select>

          {/* Filtro de tipo */}
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos los tipos</option>
            <option value="stock_low">Stock Bajo</option>
            <option value="production_delay">Retraso Producción</option>
            <option value="order_overdue">Pedido Vencido</option>
            <option value="quality_pending">Calidad Pendiente</option>
            <option value="payment_pending">Pago Pendiente</option>
          </select>

          <button
            onClick={fetchAlerts}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Aplicar filtros
          </button>
        </div>
      </div>

      {/* Tabla de Alertas */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Alerta
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Severidad
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-slate-500">
                    Cargando alertas...
                  </td>
                </tr>
              ) : alerts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-slate-500">
                    <Bell className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    No se encontraron alertas
                  </td>
                </tr>
              ) : (
                alerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      {alert.read ? (
                        <EyeOff className="w-4 h-4 text-slate-400" />
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                          Nuevo
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className={`p-1.5 rounded-lg ${getSeverityBadge(alert.severity)}`}>
                          {getTypeIcon(alert.type)}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{alert.title}</p>
                          <p className="text-xs text-slate-500">{alert.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-slate-600">
                        {getTypeLabel(alert.type)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityBadge(alert.severity)}`}>
                        {alert.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-slate-600">
                        {format(new Date(alert.created_at), "dd/MM/yyyy HH:mm", { locale: es })}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        {!alert.read && (
                          <button
                            onClick={() => handleMarkAsRead(alert.id)}
                            className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                            title="Marcar como leída"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteAlert(alert.id)}
                          className="p-1 text-red-500 hover:text-red-700 transition-colors"
                          title="Eliminar alerta"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {alerts.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-200 flex justify-between items-center">
            <span className="text-sm text-slate-500">
              Mostrando {alerts.length} de {totalCount} alertas
            </span>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-slate-200 rounded-lg text-sm hover:bg-slate-50 disabled:opacity-50">
                Anterior
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                1
              </button>
              <button className="px-3 py-1 border border-slate-200 rounded-lg text-sm hover:bg-slate-50">
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPage;
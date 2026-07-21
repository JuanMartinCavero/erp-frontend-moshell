// src/components/layout/AlertDropdown.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Bell, 
  Package, 
  Clock, 
  Truck, 
  AlertCircle,
  AlertTriangle,
  Settings,
  ChevronRight,
  CheckCircle
} from "lucide-react";
import { alertApi } from "../../src/services/alertApi";

const AlertDropdown = ({ onViewAll, onClose, onAlertCountUpdate }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const data = await alertApi.getRecentAlerts();
      if (data.success) {
        setAlerts(data.data);
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAlertIcon = (type) => {
    const icons = {
      stock_low: <Package className="w-4 h-4" />,
      production_delay: <Clock className="w-4 h-4" />,
      order_overdue: <Truck className="w-4 h-4" />,
      quality_pending: <AlertCircle className="w-4 h-4" />,
      payment_pending: <AlertTriangle className="w-4 h-4" />,
      machine_saturated: <Settings className="w-4 h-4" />,
    };
    return icons[type] || <Bell className="w-4 h-4" />;
  };

  const getAlertColor = (severity) => {
    const colors = {
      critical: "bg-red-50 text-red-700 border-red-200",
      high: "bg-orange-50 text-orange-700 border-orange-200",
      medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
      low: "bg-blue-50 text-blue-700 border-blue-200",
    };
    return colors[severity] || colors.low;
  };

  const getSeverityDot = (severity) => {
    const colors = {
      critical: "bg-red-500",
      high: "bg-orange-500",
      medium: "bg-yellow-500",
      low: "bg-blue-500",
    };
    return colors[severity] || colors.low;
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Hace un momento";
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
    return `Hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
  };

  const handleAlertClick = async (alert) => {
    try {
      // Marcar como leída
      if (!alert.read) {
        await alertApi.markAsRead(alert.id);
        // Actualizar contador en el header
        if (onAlertCountUpdate) {
          const countData = await alertApi.getUnreadCount();
          if (countData.success) {
            onAlertCountUpdate(countData.count);
          }
        }
      }
    } catch (error) {
      console.error("Error marking alert as read:", error);
    }
    
    onClose();
    if (alert.action_url) {
      navigate(alert.action_url);
    } else {
      navigate("/alerts");
    }
  };

  const handleMarkAsRead = async (alertId, e) => {
    e.stopPropagation();
    try {
      await alertApi.markAsRead(alertId);
      // Actualizar estado local
      setAlerts(alerts.map(a => 
        a.id === alertId ? { ...a, read: true } : a
      ));
      // Actualizar contador en el header
      if (onAlertCountUpdate) {
        const countData = await alertApi.getUnreadCount();
        if (countData.success) {
          onAlertCountUpdate(countData.count);
        }
      }
    } catch (error) {
      console.error("Error marking alert as read:", error);
    }
  };

  if (loading) {
    return (
      <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50">
        <div className="p-4 text-center text-sm text-slate-500">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
          Cargando alertas...
        </div>
      </div>
    );
  }

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50">
      {/* Header del dropdown */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-slate-600" />
          <span className="font-semibold text-slate-900">Alertas</span>
          {alerts.length > 0 && (
            <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5 rounded-full">
              {alerts.length} nuevas
            </span>
          )}
        </div>
        <button
          onClick={onViewAll}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Ver todas
        </button>
      </div>

      {/* Lista de alertas */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {alerts.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-500">No hay alertas nuevas</p>
            <p className="text-xs text-slate-400 mt-1">Todas las alertas están leídas</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => handleAlertClick(alert)}
              className={`px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors ${
                !alert.read ? 'bg-blue-50/30' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Indicador de severidad */}
                <div className="flex-shrink-0 mt-1">
                  <div className={`w-2 h-2 rounded-full ${getSeverityDot(alert.severity)}`} />
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`p-1 rounded-lg ${getAlertColor(alert.severity)}`}>
                      {getAlertIcon(alert.type)}
                    </span>
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {alert.title}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                    {alert.description}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-slate-400">
                      {formatTimeAgo(alert.created_at)}
                    </span>
                    {!alert.read && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        Nuevo
                      </span>
                    )}
                  </div>
                </div>

                {/* Botón de marcar leída */}
                {!alert.read && (
                  <button
                    onClick={(e) => handleMarkAsRead(alert.id, e)}
                    className="flex-shrink-0 p-1 text-slate-400 hover:text-blue-600 transition-colors"
                    title="Marcar como leída"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                )}
                <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {alerts.length > 0 && (
        <div className="px-4 py-2 border-t border-slate-200 bg-slate-50">
          <button
            onClick={onViewAll}
            className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium py-1"
          >
            Ver todas las alertas →
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertDropdown;
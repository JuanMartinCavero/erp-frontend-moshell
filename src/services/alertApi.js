// src/services/alertApi.js
const API_URL = import.meta.env.VITE_API_URL || '/api';

export const alertApi = {
  async getAlerts(params = {}) {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/alerts?${query}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  async getRecentAlerts() {
    const response = await fetch(`${API_URL}/alerts/recent`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  async getUnreadCount() {
    const response = await fetch(`${API_URL}/alerts/unread-count`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  async markAsRead(alertId) {
    const response = await fetch(`${API_URL}/alerts/${alertId}/read`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  async markAllAsRead() {
    const response = await fetch(`${API_URL}/alerts/mark-all-read`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  async deleteAlert(alertId) {
    const response = await fetch(`${API_URL}/alerts/${alertId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  // Helper para obtener el ícono según el tipo de alerta
  getAlertIcon(type) {
    const icons = {
      stock_low: 'Package',
      production_delay: 'Clock',
      order_overdue: 'Truck',
      quality_pending: 'AlertCircle',
      payment_pending: 'AlertTriangle',
    };
    return icons[type] || 'Bell';
  },

  // Helper para obtener el color según la severidad
  getSeverityColor(severity) {
    const colors = {
      critical: 'red',
      high: 'orange',
      medium: 'yellow',
      low: 'blue',
    };
    return colors[severity] || 'gray';
  },

  // Helper para obtener etiqueta legible del tipo
  getTypeLabel(type) {
    const labels = {
      stock_low: 'Stock Bajo',
      production_delay: 'Retraso Producción',
      order_overdue: 'Pedido Vencido',
      quality_pending: 'Calidad Pendiente',
      payment_pending: 'Pago Pendiente',
    };
    return labels[type] || type;
  },
};
// src/components/dashboard/OrdersTable.jsx
import React from 'react';
import { Eye } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const OrdersTable = ({ data = [], loading }) => {
  const navigate = useNavigate();

  const getStatusStyles = (status) => {
    const statusMap = {
      'Pending': 'bg-amber-50 text-amber-600',
      'Approved': 'bg-green-50 text-green-600',
      'Production': 'bg-blue-50 text-blue-600',
      'Quality Check': 'bg-emerald-50 text-emerald-600',
      'Partial Dispatch': 'bg-purple-50 text-purple-600',
      'Completed': 'bg-slate-100 text-slate-600'
    };
    return statusMap[status] || 'bg-slate-50 text-slate-600';
  };

  const getPriorityStyles = (priority) => {
    const priorityMap = {
      'High': 'bg-red-50 text-red-600',
      'Medium': 'bg-slate-100 text-slate-600',
      'Low': 'bg-blue-50 text-blue-600'
    };
    return priorityMap[priority] || 'bg-slate-100 text-slate-600';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col animate-pulse">
        <div className="p-6 border-b border-slate-100">
          <div className="h-6 bg-slate-200 rounded w-1/4"></div>
        </div>
        <div className="p-6 space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-12 bg-slate-100 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const orders = data.length > 0 ? data : [];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <div className="p-6 flex justify-between items-center border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Recent Orders</h2>
        <button 
          onClick={() => navigate('/pedidos')}
          className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          View All Orders
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-slate-400">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                        {order.clientAvatar}
                      </div>
                      <span className="text-sm text-slate-600">{order.client}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyles(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityStyles(order.priority)}`}>
                      {order.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => navigate(`/pedidos/${order.order_id}`)}
                      className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
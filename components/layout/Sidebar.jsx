// src/components/layout/Sidebar.jsx
import React from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Factory,
  ShieldCheck,
  ShieldUser,
  Users,
  CircleUserRound,
  LogOut,
  ShoppingBasket,
  Barcode,
  FileText, // ← Agregado para Ficha Técnica
  ShoppingBag, // ← Agrega este ícono para Compras
  Van,
  Cog,
  CircleDollarSign
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { usePermissions } from "../../hooks/usePermissions";
import logo from "../../src/logo.png";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { hasAnyPermission, hasRoleLevel, loading } = usePermissions();

  // Configuración de qué permisos necesita cada opción del menú
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-[18px] h-[18px]" />,
      visible: true,
    },
    {
      name: "Ficha Técnica", // ← Nueva pestaña
      path: "/FichaTecnica",
      icon: <FileText className="w-[18px] h-[18px]" />,
      requiredPermissions: ["tech-sheet.view", "production.manage"],
      minRoleLevel: 8,
    },
    {
      name: "Inventory",
      path: "/inventory",
      icon: <Package className="w-[18px] h-[18px]" />,
      requiredPermissions: [
        "inventory.adjust",
        "inventory.transfer",
        "inventory.kardex",
      ],
      minRoleLevel: 8,
    },
    // ↓ Compras agregado
    {
      name: "Compras",
      path: "/compras",
      icon: <ShoppingBag className="w-[18px] h-[18px]" />,
      requiredPermissions: ["purchase.manage", "purchase.view"],
      minRoleLevel: 8,
    },
    {
      name: "Production",
      path: "/production",
      icon: <Factory className="w-[18px] h-[18px]" />,
      requiredPermissions: [
        "production.start",
        "production.assign-machines",
        "production.pause",
        "production.dashboard",
      ],
      minRoleLevel: 8,
    },
    {
      name: "Quality Control",
      path: "/quality",
      icon: <ShieldCheck className="w-[18px] h-[18px]" />,
      requiredPermissions: [
        "quality.inspect",
        "quality.approve",
        "quality.reject",
      ],
      minRoleLevel: 8,
    },
    {
      name: "Roles",
      path: "/admin/roles",
      icon: <ShieldUser className="w-[18px] h-[18px]" />,
      requiredPermissions: ["role.manage"],
      minRoleLevel: 18,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <Users className="w-[18px] h-[18px]" />,
      requiredPermissions: ["user.manage"],
      minRoleLevel: 18,
    },
    {
      name: "Clientes",
      path: "/admin/clients",
      icon: <CircleUserRound className="w-[18px] h-[18px]" />,
      requiredPermissions: ["client.manage"],
      minRoleLevel: 12,
    },
    {
      name: "Proveedores",
      path: "/admin/providers",
      icon: <Van className="w-[18px] h-[18px]" />,
      requiredPermissions: ["client.manage"],
      minRoleLevel: 12,
    },
    {
      name: "Pedidos",
      path: "/admin/orders",
      icon: <ShoppingCart className="w-[18px] h-[18px]" />,
      requiredPermissions: ["client.manage"],
      minRoleLevel: 12,
    },
    {
      name: "Etiquetas",
      path: "/barcodes",
      icon: <Barcode className="w-[18px] h-[18px]" />,
      requiredPermissions: ["client.manage"],
      minRoleLevel: 12,
    },
    {
      name: "Producción y Maquinas",
      path: "/machines",
      icon: <Cog className="w-[18px] h-[18px]" />,
      requiredPermissions: ["client.manage"],
      minRoleLevel: 12,
    },
    {
      name: "Finanzas y Pagos",
      path: "/finance",
      icon: <CircleDollarSign className="w-[18px] h-[18px]" />,
      requiredPermissions: ["client.manage"],
      minRoleLevel: 12,
    },
  ];

  // Función para verificar si un item debe mostrarse
  const isMenuItemVisible = (item) => {
    if (item.visible) return true;

    // Verificar por permisos específicos
    if (item.requiredPermissions && item.requiredPermissions.length > 0) {
      if (hasAnyPermission(item.requiredPermissions)) return true;
    }

    // Verificar por nivel de rol
    if (item.minRoleLevel) {
      if (hasRoleLevel(item.minRoleLevel)) return true;
    }

    return false;
  };

  // Filtrar los items visibles
  //const visibleMenuItems = menuItems.filter(item => isMenuItemVisible(item));
  const visibleMenuItems = React.useMemo(() => {
    return menuItems.filter((item) => isMenuItemVisible(item));
  }, [loading, hasAnyPermission, hasRoleLevel]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Si está cargando, mostrar un placeholder
  if (loading) {
    return (
      <aside className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col fixed left-0 top-0">
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-10 bg-slate-200 rounded w-full"></div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col fixed left-0 top-0 overflow-y-auto">
      <div className="p-6 flex items-center gap-3">
        <img
          src={logo}
          alt="Moshell Logo"
          className="w-10 h-10 object-contain"
        />
        <div className="flex flex-col">
          <span className="text-slate-600 font-bold text-lg leading-tight">
            Moshell
          </span>
          <span className="text-slate-500 text-xs">Enterprise ERP</span>
        </div>
      </div>

      <nav className="flex-1 px-4 flex flex-col gap-2">
        {visibleMenuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                isActive
                  ? "bg-slate-600 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-4 mb-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-red-700 bg-red-100 hover:bg-red-200 rounded-xl font-medium text-sm shadow-md transition-colors"
        >
          <LogOut className="w-[18px] h-[18px]" />
          Logout
        </button>
      </div>

      <div className="p-4">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">
            System Status
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-xs text-slate-600">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

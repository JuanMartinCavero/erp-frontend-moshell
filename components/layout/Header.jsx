// src/components/layout/Header.jsx
import React, { useEffect, useState } from "react";
import { Search, Bell, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageWithFallback from "../figma/ImageWithFallback";
import { meRequest } from "../../services/authApi";
import { alertApi } from "../../src/services/alertApi";// ← Importar alertApi
import AlertDropdown from "./AlertDropdown";

const Header = () => {
  const [user, setUser] = useState(null);
  const [alertCount, setAlertCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await meRequest();
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      } catch (error) {
        console.error("Error obteniendo usuario:", error);
      }
    };
    
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      fetchUser();
    }

    // Obtener conteo de alertas no leídas usando alertApi
    fetchAlertCount();
  }, []);

  const fetchAlertCount = async () => {
    try {
      const data = await alertApi.getUnreadCount();
      if (data.success) {
        setAlertCount(data.count);
      }
    } catch (error) {
      console.error("Error fetching alert count:", error);
    }
  };

  const handleAlertClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleViewAllAlerts = () => {
    setShowDropdown(false);
    navigate("/alerts");
  };

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.alert-dropdown-container')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  return (
    <header className="h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-6 flex-1 max-w-2xl">
        <h1 className="text-xl font-bold text-slate-900 shrink-0">
          Executive Overview
        </h1>
        <div className="relative flex-1 max-w-[448px]">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search className="w-[18px] h-[18px]" />
          </div>
          <input
            type="text"
            placeholder="Search analytics, orders, machines..."
            className="w-full bg-slate-100 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        {/* Campanita de Alertas */}
        <div className="relative alert-dropdown-container">
          <button
            onClick={handleAlertClick}
            className="relative w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5" />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white animate-pulse">
                {alertCount > 99 ? "99+" : alertCount}
              </span>
            )}
          </button>

          {/* Dropdown de Alertas */}
          {showDropdown && (
            <AlertDropdown
              onViewAll={handleViewAllAlerts}
              onClose={() => setShowDropdown(false)}
              onAlertCountUpdate={setAlertCount} // ← Para actualizar el contador
            />
          )}
        </div>

        <button className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-50 rounded-lg">
          <Settings className="w-5 h-5" />
        </button>

        <div className="w-px h-8 bg-slate-200 mx-2"></div>

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-slate-900 leading-none mb-1">
              {user ? user.nombre + " " + user.apellido : "Cargando..."}
            </span>
            <span className="text-xs text-slate-500 leading-none">
              {user?.role?.nombre || "Cargo"}
            </span>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
            <ImageWithFallback
              src={
                user?.avatar ||
                "https://images.unsplash.com/photo-1771050889377-b68415885c64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg"
              }
              alt={user?.name || "Usuario"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

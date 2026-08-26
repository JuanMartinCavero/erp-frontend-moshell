// src/components/layout/Header.jsx
import React, { useEffect, useState } from "react";
import { Search, Bell, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageWithFallback from "../figma/ImageWithFallback";
import { meRequest } from "../../services/authApi";
import { alertApi } from "../../src/services/alertApi"; // ← Importar alertApi
import AlertDropdown from "./AlertDropdown";
import UserDropdown from "./userDropdown";

const Header = () => {
  const [user, setUser] = useState(null);
  const [alertCount, setAlertCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const [showUserDropdown, setShowUserDropdown] = useState(false);

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
      if (showDropdown && !event.target.closest(".alert-dropdown-container")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  return (
    <header className="h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-6 flex-1 max-w-2xl">
        <div className="relative flex-1 max-w-[448px]">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></div>
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

        <div
          onClick={() => setShowUserDropdown(!showUserDropdown)}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-slate-900 leading-none mb-1">
              {user ? user.nombre + " " + user.apellido : "Cargando..."}
            </span>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
            <ImageWithFallback
              src={
                user?.avatar ||
                "https://media.istockphoto.com/id/1495088043/es/vector/icono-de-perfil-de-usuario-avatar-o-icono-de-persona-foto-de-perfil-símbolo-de-retrato.jpg?b=1&s=612x612&w=0&k=20&c=p8bIYXvNReAbl7ozkwmKLzfnnVIUZTk87zY-fnq5108="
              }
              alt={user?.name || "Usuario"}
              className="w-full h-full object-cover"
            />

            {showUserDropdown && (
              <UserDropdown
                user={user}
                onClose={() => setShowUserDropdown(false)}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import { Search, Bell, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageWithFallback from "../figma/ImageWithFallback";
import { meRequest } from "../../services/authApi";
import { alertApi } from "../../src/services/alertApi";
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
    if (showUserDropdown) setShowUserDropdown(false);
  };

  const handleUserClick = () => {
    setShowUserDropdown(!showUserDropdown);
    if (showDropdown) setShowDropdown(false);
  };

  const handleViewAllAlerts = () => {
    setShowDropdown(false);
    navigate("/alerts");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest(".alert-dropdown-container")) {
        setShowDropdown(false);
      }
      if (
        showUserDropdown &&
        !event.target.closest(".user-dropdown-container")
      ) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown, showUserDropdown]);

  const nombreCompleto = user
    ? `${user.nombre || ""} ${user.apellido || ""}`.trim() || "Usuario"
    : "Cargando...";

  return (
    <header className="h-[72px] bg-white border-b border-slate-200/80 flex items-center justify-between px-6 md:px-8 sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-6 flex-1 max-w-2xl">
        <div className="relative flex-1 max-w-[448px]"></div>
      </div>

      <div className="flex items-center gap-3 md:gap-4 shrink-0">
        <div className="relative alert-dropdown-container">
          <button
            onClick={handleAlertClick}
            className="relative w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100/80 rounded-xl transition-colors active:scale-95"
            title="Notificaciones"
          >
            <Bell className="w-5 h-5" />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-sm animate-pulse">
                {alertCount > 99 ? "99+" : alertCount}
              </span>
            )}
          </button>

          {showDropdown && (
            <AlertDropdown
              onViewAll={handleViewAllAlerts}
              onClose={() => setShowDropdown(false)}
              onAlertCountUpdate={setAlertCount}
            />
          )}
        </div>

        {/* <button
          onClick={() => navigate("/settings")}
          className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100/80 rounded-xl transition-colors active:scale-95"
          title="Configuración"
        >
          <Settings className="w-5 h-5" />
        </button> */}

        <div className="w-px h-6 bg-slate-200 mx-1"></div>

        <div className="relative user-dropdown-container">
          <div
            onClick={handleUserClick}
            className="flex items-center gap-3 cursor-pointer p-1.5 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-semibold text-slate-800 leading-tight">
                {nombreCompleto}
              </span>
              <span className="text-xs text-slate-400 capitalize">
                {user?.role?.nombre || "Usuario"}
              </span>
            </div>

            <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center shrink-0 shadow-sm">
              {user?.avatar ? (
                <ImageWithFallback
                  src={user.avatar}
                  alt={nombreCompleto}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-slate-400" strokeWidth={1.8} />
              )}
            </div>
          </div>

          {showUserDropdown && (
            <UserDropdown
              user={user}
              onClose={() => setShowUserDropdown(false)}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserDropdown = ({ user, onClose }) => {
  const navigate = useNavigate();

  const handleProfile = () => {
    onClose();
    navigate("/profile");
  };

  return (
    <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50">
      <div className="px-4 py-3 border-b border-slate-100">
        <p className="font-semibold text-slate-900">
          {user?.nombre} {user?.apellido}
        </p>

        <p className="text-sm text-slate-500">
          Rol: {user?.role?.nombre || "Usuario"}
        </p>
      </div>

      <button
        onClick={handleProfile}
        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition"
      >
        <User className="w-4 h-4" />
        Mi perfil
      </button>
    </div>
  );
};

export default UserDropdown;

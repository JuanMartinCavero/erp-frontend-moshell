import React, { useEffect, useState } from "react";
import { Mail, Phone, ShieldCheck, Calendar, User, Pencil } from "lucide-react";
import ImageWithFallback from "../components/figma/ImageWithFallback";
import { meRequest } from "../services/authApi";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await meRequest();
        setUser(data);
      } catch (error) {
        console.error("Error cargando perfil:", error);
      }
    };

    loadUser();
  }, []);

  if (!user) {
    return <div className="p-8 text-slate-500">Cargando perfil...</div>;
  }

  return (
    <div className="p-8 min-h-full bg-slate-50">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Perfil */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-900 to-indigo-300" />

          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 -mt-14">
              <div className="flex items-end gap-5">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-white">
                  <ImageWithFallback
                    src={
                      user.avatar ||
                      "https://images.unsplash.com/photo-1771050889377-b68415885c64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg"
                    }
                    alt="Usuario"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="pb-3">
                  <h1 className="text-3xl font-bold text-slate-900">
                    {user.nombre} {user.apellido}
                  </h1>

                  <div className="flex items-center gap-2 mt-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />

                    <span className="text-sm text-slate-600">
                      {user.role?.nombre || "Usuario"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Información */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="font-semibold text-lg text-slate-900 mb-5">
              Información personal
            </h2>

            <div className="space-y-5">
              <InfoItem
                icon={<User />}
                label="Nombre completo"
                value={`${user.nombre} ${user.apellido}`}
              />

              <InfoItem
                icon={<Calendar />}
                label="Fecha de registro"
                value={
                  user.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : "-"
                }
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="font-semibold text-lg text-slate-900 mb-5">
              Información de cuenta
            </h2>

            <div className="space-y-5">
              <InfoItem
                icon={<Mail />}
                label="Correo electrónico"
                value={user.email}
              />

              <InfoItem
                icon={<ShieldCheck />}
                label="Rol"
                value={user.role?.nombre || "Usuario"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
        {React.cloneElement(icon, {
          className: "w-5 h-5",
        })}
      </div>

      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="font-medium text-slate-900">{value}</p>
      </div>
    </div>
  );
};

export default ProfilePage;

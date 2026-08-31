import React, { useEffect, useState } from "react";
import {
  Mail,
  ShieldCheck,
  Calendar,
  User,
  Edit3,
  Lock,
  CheckCircle2,
  Camera,
} from "lucide-react";

import ImageWithFallback from "../components/figma/ImageWithFallback";
import { meRequest } from "../services/authApi";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await meRequest();
        setUser(data);
      } catch (error) {
        console.error("Error cargando perfil:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Estado de carga mejorado (Skeleton / Spinner refinado)
  if (isLoading || !user) {
    return (
      <div className="min-h-full bg-slate-50/50 p-6 md:p-12 flex items-center justify-center">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-100 p-12 max-w-md w-full text-center">
          <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-base font-semibold text-slate-800">
            Cargando tu perfil
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Por favor espera un momento...
          </p>
        </div>
      </div>
    );
  }

  const nombreCompleto =
    `${user.nombre || ""} ${user.apellido || ""}`.trim() || "Usuario";

  const rol = user.role?.nombre || "Usuario";

  return (
    <div className="min-h-full bg-slate-50/60 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Banner y Cabecera de Perfil */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden transition-all">
          {/* Banner superior con patrón o gradiente atractivo */}
          <div className="h-36 md:h-44 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
          </div>

          {/* Contenido principal del perfil */}
          <div className="px-6 md:px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-16">
              {/* Avatar con botón flotante para cambiar foto */}
              <div className="flex items-end gap-5">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-2xl border-4 border-white bg-slate-100 shadow-xl overflow-hidden flex items-center justify-center shrink-0">
                    {user.avatar ? (
                      <ImageWithFallback
                        src={user.avatar}
                        alt={`Foto de perfil de ${nombreCompleto}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User
                        className="w-16 h-16 text-slate-400"
                        strokeWidth={1.5}
                      />
                    )}
                  </div>
                </div>

                <div className="pb-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                    {nombreCompleto}
                  </h1>

                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100/60 text-blue-700">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        {rol}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cuadrícula de Información */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Información personal */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-7 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100/60 flex items-center justify-center text-blue-600">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold text-base text-slate-900">
                  Información personal
                </h2>
                <p className="text-xs text-slate-400">
                  Datos básicos e identidad en la plataforma
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <InfoItem
                icon={<User />}
                label="Nombre completo"
                value={nombreCompleto}
              />

              <InfoItem
                icon={<Calendar />}
                label="Fecha de registro"
                value={
                  user.created_at
                    ? new Date(user.created_at).toLocaleDateString("es-PE", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : "No disponible"
                }
              />
            </div>
          </div>

          {/* Información de cuenta */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-7 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100">
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100/60 flex items-center justify-center text-indigo-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold text-base text-slate-900">
                  Información de cuenta
                </h2>
                <p className="text-xs text-slate-400">
                  Credenciales de acceso y privilegios
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <InfoItem
                icon={<Mail />}
                label="Correo electrónico"
                value={user.email || "No registrado"}
              />

              <InfoItem
                icon={<ShieldCheck />}
                label="Rol asignado"
                value={rol}
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
    <div className="flex items-start gap-3.5 group">
      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors shrink-0">
        {React.cloneElement(icon, {
          className: "w-5 h-5",
          strokeWidth: 1.8,
        })}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="text-sm font-semibold text-slate-800 break-words">
          {value}
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;

import React from "react";
import { Users, UserCheck, UserX, Globe, MapPin } from "lucide-react";

const ClientsStats = ({
  total,
  activos,
  inactivos,
  internacionales,
  nacionales,
}) => {
  const stats = [
    {
      title: "Total Clientes",
      value: total,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Activos",
      value: activos,
      icon: UserCheck,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Inactivos",
      value: inactivos,
      icon: UserX,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Internacionales",
      value: internacionales,
      icon: Globe,
      color: "bg-violet-100 text-violet-600",
    },
    {
      title: "Nacionales",
      value: nacionales,
      icon: MapPin,
      color: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map(({ title, value, icon: Icon, color }) => (
        <div
          key={title}
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{title}</p>

              <h3 className="mt-3 text-4xl font-bold text-slate-800 dark:text-white">
                {value}
              </h3>
            </div>

            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}
            >
              <Icon size={28} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientsStats;

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

const ClientsFilters = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            Buscar clientes
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Encuentra cliente por nombre, DNI o Internacional
          </p>
        </div>

        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Buscar cliente..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="
              h-12
              w-full
              rounded-xl
              border
              border-slate-300
              bg-slate-50
              pl-11
              pr-4
              text-sm
              text-slate-700
              placeholder:text-slate-400
              outline-none
              transition-all
              duration-200
              focus:border-primary
              focus:bg-white
              focus:ring-4
              focus:ring-primary/10
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-white
            "
          />
        </div>
      </div>
    </div>
  );
};

export default ClientsFilters;

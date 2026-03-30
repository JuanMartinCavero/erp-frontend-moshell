import React from "react";
import { useState, useEffect } from "react";

const ClientsFilters = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="flex gap-4">
      <input
        type="text"
        placeholder="Buscar cliente..."
        className="border px-4 py-2 rounded-lg w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default ClientsFilters;

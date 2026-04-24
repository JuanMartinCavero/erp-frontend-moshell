import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Bell, Search } from "lucide-react";

export default function DashboardHeader({ onSearch }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-transparent backdrop-blur-md flex items-center justify-between px-8 py-4">
      <div className="flex items-center gap-4"></div>
      <div className="flex items-center gap-6">
        <form onSubmit={handleSearch} className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar fichas..."
            className="bg-surface-container-lowest border-none rounded-lg py-2 pl-10 pr-4 text-sm w-64 focus:ring-1 focus:ring-primary transition-all text-on-surface outline-none"
          />
        </form>

        <button
          onClick={() => navigate("/FichaTecnica/nueva")}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-600 transition-all font-semibold text-sm"
        >
          <Plus className="w-4 h-4" />
          New Sheet
        </button>
      </div>
    </header>
  );
}

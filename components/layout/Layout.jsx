import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-8 min-w-0 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

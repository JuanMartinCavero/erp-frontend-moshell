import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/global.css";

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
}


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App.jsx"; 
import "./index.css";

// Desactivar Sentry
window.SENTRY_ONLOAD = () => {};

// Configuracion del router para React Router v7
const routerConfig = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter {...routerConfig}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>



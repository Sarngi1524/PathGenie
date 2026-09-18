
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import "leaflet/dist/leaflet.css";
import { SocketProvider } from "./context/SocketContext";

import AuthProvider from "./context/AuthContext";
import "./styles/global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(

  <AuthProvider>

  <React.StrictMode>
    <SocketProvider>
          <App />
    </SocketProvider>

  <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnHover
    draggable
    theme="light"
  />
</React.StrictMode>

  </AuthProvider>

);
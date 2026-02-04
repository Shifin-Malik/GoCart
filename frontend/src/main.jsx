import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppContext } from "./context/AppContext.jsx";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppContext>
        <App />
        <Toaster />
      </AppContext>
    </BrowserRouter>
  </StrictMode>
);

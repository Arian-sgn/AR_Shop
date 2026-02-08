import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthContext/AuthFunctions.tsx";
import { SearchProvider } from "./search-context/SearchProvider.tsx";
import ThemeProvider from "./theme/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);

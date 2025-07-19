import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserContext from "./context/UserContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PopupProvider } from "./context/PopupContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <PopupProvider>
        <SearchProvider>
          <UserContext>
            <App />
          </UserContext>
        </SearchProvider>
      </PopupProvider>
    </QueryClientProvider>
  </StrictMode>
);

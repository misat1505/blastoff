import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "./components/ui/toaster.tsx";
import ThemeProvider from "./context/ThemeContext.tsx";
import SessionProvider from "./context/SessionContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <App />
          <Toaster />
        </SessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);

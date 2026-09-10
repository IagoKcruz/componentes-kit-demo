import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from "@tanstack/react-query";
import "@iagokcruz/componentes-kit/dist/index.css";
import "./index.css";
import { App } from "./App";
import { ApiError } from "./lib/apiClient";
import { exibirToast, toast } from "./lib/toasty";

function tratarErroGlobal(error: unknown) {
  if (error instanceof ApiError) exibirToast(error.toasty);
  else toast.erro((error as Error).message ?? "Erro inesperado");
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: tratarErroGlobal }),
  mutationCache: new MutationCache({ onError: tratarErroGlobal }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
    },
  },
});

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Elemento root não encontrado no DOM");

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);

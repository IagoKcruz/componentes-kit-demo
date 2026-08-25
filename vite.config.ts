import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // componentes-kit é um pacote linkado localmente (link:../componentes-kit); sem isso o Vite
  // faz cache da versão antiga no pré-bundle e não pega mudanças no dist até um restart manual.
  optimizeDeps: {
    exclude: ["componentes-kit"],
  },
});

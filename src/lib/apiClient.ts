import { createApiClient } from "@iagokcruz/componentes-kit/api";
import { ToastType } from "@iagokcruz/componentes-kit";
import type { ToastyObject } from "../types/toasty";
import { exibirToast } from "./toasty";

export class ApiError extends Error {
  constructor(public readonly toasty: ToastyObject) {
    super(toasty.erro ?? toasty.listaErro?.join("; ") ?? "Erro na requisição");
    this.name = "ApiError";
  }
}

export function salvarToken(token: string): void {
  localStorage.setItem("access_token", token);
}

export function limparToken(): void {
  localStorage.removeItem("access_token");
}

export const apiClient = createApiClient({
  baseUrl: import.meta.env.VITE_API_URL ?? "http://localhost:8000",

  getToken: () => localStorage.getItem("access_token"),

  onUnauthorized: () => {
    limparToken();
    window.dispatchEvent(new CustomEvent("auth:logout"));
  },

  onNetworkError: () => {
    window.dispatchEvent(new CustomEvent("api:network-error"));
  },

  parseError: (body, _status) => {
    const { detail } = body as { detail?: unknown };
    if (Array.isArray(detail)) {
      return new ApiError({
        tipo: ToastType.Erro,
        listaErro: (detail as unknown[]).map((e) =>
      typeof e === "string" ? e : (e as { msg: string }).msg
    ),
      });
    }
    return new ApiError({
      tipo: ToastType.Erro,
      erro: typeof detail === "string" ? detail : "Erro na requisição",
    });
  },

  extractNotification: (data) => {
    if (!("notificacao" in data)) return;
    const n = data.notificacao as { tipo: string; mensagem: string };
    exibirToast({
      tipo: n.tipo === "sucesso" ? ToastType.Sucesso : ToastType.Informacao,
      mensagem: n.mensagem,
    });
    delete data.notificacao;
  },
});

import { ToastType } from "@iagokcruz/componentes-kit";
import type { ToastyObject } from "../types/toasty";
import { exibirToast } from "./toasty";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  constructor(public readonly toasty: ToastyObject) {
    super(toasty.erro ?? toasty.listaErro?.join("; ") ?? "Erro na requisição");
    this.name = "ApiError";
  }
}

function getToken(): string | null {
  return localStorage.getItem("access_token");
}

export function salvarToken(token: string): void {
  localStorage.setItem("access_token", token);
}

export function limparToken(): void {
  localStorage.removeItem("access_token");
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  } catch (e) {
    if (e instanceof ApiError) throw e;
    window.dispatchEvent(new CustomEvent("api:network-error"));
    throw new ApiError({
      tipo: ToastType.Erro,
      erro: "Não foi possível conectar ao servidor. Verifique se a API está no ar.",
    });
  }

  if (!res.ok) {
    if (res.status === 401) {
      limparToken();
      window.dispatchEvent(new CustomEvent("auth:logout"));
    }
    const error = await res.json().catch(() => ({ detail: res.statusText }));
    const { detail } = error;
    if (Array.isArray(detail)) {
      throw new ApiError({
        tipo: ToastType.Erro,
        listaErro: detail.map((e: { msg: string }) => e.msg),
      });
    }
    throw new ApiError({
      tipo: ToastType.Erro,
      erro: typeof detail === "string" ? detail : "Erro na requisição",
    });
  }

  if (res.status === 204) return undefined as T;
  const data = (await res.json()) as Record<string, unknown>;
  if (data && typeof data === "object" && "notificacao" in data) {
    const n = data.notificacao as { tipo: string; mensagem: string };
    exibirToast({
      tipo: n.tipo === "sucesso" ? ToastType.Sucesso : ToastType.Informacao,
      mensagem: n.mensagem,
    });
    delete data.notificacao;
  }
  return data as T;
}

export const apiClient = { request };

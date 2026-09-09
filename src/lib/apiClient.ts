const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

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
  } catch {
    window.dispatchEvent(new CustomEvent("api:network-error"));
    throw new Error("Não foi possível conectar ao servidor. Verifique se a API está no ar.");
  }

  if (!res.ok) {
    if (res.status === 401) {
      limparToken();
      window.dispatchEvent(new CustomEvent("auth:logout"));
    }
    const error = await res.json().catch(() => ({ detail: res.statusText }));
    const { detail } = error;
    const mensagem =
      typeof detail === "string"
        ? detail
        : Array.isArray(detail)
          ? detail.map((e: { msg: string }) => e.msg).join("; ")
          : "Erro na requisição";
    throw new Error(mensagem);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const apiClient = { request };

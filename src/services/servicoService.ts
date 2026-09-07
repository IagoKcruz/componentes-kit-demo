import { apiClient } from "../lib/apiClient";
import type { Servico } from "../types/servico";

interface CriarServicoPayload {
  nome: string;
  descricao: string;
  duracao_minutos: number;
  preco: number;
}

interface AtualizarServicoPayload {
  nome?: string;
  descricao?: string;
  duracao_minutos?: number;
  preco?: number;
}

export const servicoService = {
  listar: () => apiClient.request<Servico[]>("/servicos/"),

  buscarPorId: (id: string) => apiClient.request<Servico>(`/servicos/${id}`),

  criar: (payload: CriarServicoPayload) =>
    apiClient.request<Servico>("/servicos/", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  atualizar: (id: string, payload: AtualizarServicoPayload) =>
    apiClient.request<Servico>(`/servicos/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),

  remover: (id: string) =>
    apiClient.request<void>(`/servicos/${id}`, { method: "DELETE" }),
};

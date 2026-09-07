import { apiClient } from "../lib/apiClient";
import type { ApiUsuario, TipoUsuario } from "../types/usuario";

interface CriarUsuarioPayload {
  nome: string;
  email: string;
  cpf: string;
  senha: string;
  tipos: TipoUsuario[];
}

export const usuarioService = {
  listar: () => apiClient.request<ApiUsuario[]>("/usuarios/"),

  buscarPorId: (id: string) => apiClient.request<ApiUsuario>(`/usuarios/${id}`),

  criar: (payload: CriarUsuarioPayload) =>
    apiClient.request<ApiUsuario>("/usuarios/", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

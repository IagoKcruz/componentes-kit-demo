import { apiClient, salvarToken } from "../lib/apiClient";

interface LoginPayload {
  email: string;
  senha: string;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
}

export const authService = {
  login: async (payload: LoginPayload): Promise<void> => {
    const resposta = await apiClient.request<TokenResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    salvarToken(resposta.access_token);
  },
};

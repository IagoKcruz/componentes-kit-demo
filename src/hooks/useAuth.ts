import { useState } from "react";
import { ToastType, mostrarNotificacao } from "@iagokcruz/componentes-kit";
import { authService } from "../services/authService";
import { limparToken } from "../lib/apiClient";

export function useAuth() {
  const [autenticado, setAutenticado] = useState(() => !!localStorage.getItem("access_token"));
  const [carregando, setCarregando] = useState(false);

  async function login(email: string, senha: string) {
    setCarregando(true);
    try {
      await authService.login({ email, senha });
      setAutenticado(true);
    } catch (err) {
      mostrarNotificacao(ToastType.Erro, (err as Error).message);
    } finally {
      setCarregando(false);
    }
  }

  function logout() {
    limparToken();
    setAutenticado(false);
  }

  return { autenticado, carregando, login, logout };
}

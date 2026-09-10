import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { limparToken } from "../lib/apiClient";

export function useAuth() {
  const [autenticado, setAutenticado] = useState(() => !!localStorage.getItem("access_token"));

  useEffect(() => {
    function handleLogout() {
      setAutenticado(false);
    }
    window.addEventListener("auth:logout", handleLogout);
    return () => window.removeEventListener("auth:logout", handleLogout);
  }, []);

  const loginMutation = useMutation({
    mutationFn: ({ email, senha }: { email: string; senha: string }) =>
      authService.login({ email, senha }),
    onSuccess: () => setAutenticado(true),
  });

  function logout() {
    limparToken();
    setAutenticado(false);
  }

  return {
    autenticado,
    carregando: loginMutation.isPending,
    login: (email: string, senha: string) => loginMutation.mutate({ email, senha }),
    logout,
  };
}

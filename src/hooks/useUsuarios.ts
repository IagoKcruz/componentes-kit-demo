import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../lib/toasty";
import { usuarioService } from "../services/usuarioService";
import { mapApiParaUsuario, type Usuario } from "../types/usuario";

export function useUsuarios() {
  const queryClient = useQueryClient();

  const { data: usuarios = [], isLoading: carregando } = useQuery({
    queryKey: ["usuarios"],
    queryFn: async () => {
      const lista = await usuarioService.listar();
      return lista.map(mapApiParaUsuario);
    },
  });

  function createDraft(): Usuario {
    return {
      id: crypto.randomUUID(),
      nome: "",
      email: "",
      cpf: "",
      senha: "",
      tipo: "usuario",
      ativo: true,
    };
  }

  const criarMutation = useMutation({
    mutationFn: (draft: Usuario) => {
      if (!draft.senha) throw new Error("Senha é obrigatória.");
      return usuarioService.criar({
        nome: draft.nome,
        email: draft.email,
        cpf: draft.cpf,
        senha: draft.senha,
        tipos: [draft.tipo],
      });
    },
    onSuccess: (criado) => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
      toast.sucesso(`"${criado.nome}" criado com sucesso.`);
    },
  });

  return {
    usuarios,
    carregando,
    createDraft,
    createUsuario: (draft: Usuario) => criarMutation.mutate(draft),
  };
}

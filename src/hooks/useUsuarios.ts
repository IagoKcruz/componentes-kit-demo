import { useEffect, useState } from "react";
import { ToastType, mostrarNotificacao } from "@iagokcruz/componentes-kit";
import { usuarioService } from "../services/usuarioService";
import { mapApiParaUsuario, type TipoUsuario, type Usuario } from "../types/usuario";

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    usuarioService
      .listar()
      .then((lista) => setUsuarios(lista.map(mapApiParaUsuario)))
      .catch((err: Error) => mostrarNotificacao(ToastType.Erro, err.message))
      .finally(() => setCarregando(false));
  }, []);

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

  async function createUsuario(draft: Usuario) {
    if (!draft.senha) {
      mostrarNotificacao(ToastType.Erro, "Senha é obrigatória.");
      return;
    }
    try {
      const criado = await usuarioService.criar({
        nome: draft.nome,
        email: draft.email,
        cpf: draft.cpf,
        senha: draft.senha,
        tipos: [draft.tipo],
      });
      setUsuarios((atual) => [...atual.filter((u) => u.id !== draft.id), mapApiParaUsuario(criado)]);
      mostrarNotificacao(ToastType.Sucesso, `"${criado.nome}" criado com sucesso.`);
    } catch (err) {
      mostrarNotificacao(ToastType.Erro, (err as Error).message);
    }
  }

  return { usuarios, carregando, createDraft, createUsuario };
}

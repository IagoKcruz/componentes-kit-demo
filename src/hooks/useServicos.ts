import { useEffect, useState } from "react";
import { ToastType, mostrarNotificacao } from "@iagokcruz/componentes-kit";
import { servicoService } from "../services/servicoService";
import type { Servico } from "../types/servico";

export function useServicos() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    servicoService
      .listar()
      .then(setServicos)
      .catch((err: Error) => mostrarNotificacao(ToastType.Erro, err.message))
      .finally(() => setCarregando(false));
  }, []);

  function createDraft(): Servico {
    return {
      id: crypto.randomUUID(),
      nome: "",
      descricao: "",
      duracaoMinutos: 30,
      preco: 0,
      ativo: true,
    };
  }

  async function createServico(draft: Servico) {
    try {
      const criado = await servicoService.criar({
        nome: draft.nome,
        descricao: draft.descricao,
        duracao_minutos: draft.duracao_minutos,
        preco: draft.preco,
      });
      setServicos((atual) => [...atual.filter((s) => s.id !== draft.id), criado]);
      mostrarNotificacao(ToastType.Sucesso, `"${criado.nome}" criado com sucesso.`);
    } catch (err) {
      mostrarNotificacao(ToastType.Erro, (err as Error).message);
    }
  }

  async function saveServico(editado: Servico) {
    try {
      const atualizado = await servicoService.atualizar(editado.id, {
        nome: editado.nome,
        descricao: editado.descricao,
        duracao_minutos: editado.duracao_minutos,
        preco: editado.preco,
      });
      setServicos((atual) => atual.map((s) => (s.id === atualizado.id ? atualizado : s)));
      mostrarNotificacao(ToastType.Sucesso, `"${atualizado.nome}" atualizado com sucesso.`);
    } catch (err) {
      mostrarNotificacao(ToastType.Erro, (err as Error).message);
    }
  }

  async function removeServico(servico: Servico) {
    try {
      await servicoService.remover(servico.id);
      setServicos((atual) => atual.filter((s) => s.id !== servico.id));
      mostrarNotificacao(ToastType.Informacao, `"${servico.nome}" excluído.`);
    } catch (err) {
      mostrarNotificacao(ToastType.Erro, (err as Error).message);
    }
  }

  return { servicos, carregando, createDraft, createServico, saveServico, removeServico };
}

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../lib/toasty";
import { servicoService } from "../services/servicoService";
import type { Servico } from "../types/servico";

export function useServicos() {
  const queryClient = useQueryClient();

  const { data: servicos = [], isLoading: carregando } = useQuery({
    queryKey: ["servicos"],
    queryFn: () => servicoService.listar(),
  });

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

  const criarMutation = useMutation({
    mutationFn: servicoService.criar,
    onSuccess: (criado) => {
      queryClient.invalidateQueries({ queryKey: ["servicos"] });
      toast.sucesso(`"${criado.nome}" criado com sucesso.`);
    },
  });

  const atualizarMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Parameters<typeof servicoService.atualizar>[1] }) =>
      servicoService.atualizar(id, payload),
    onSuccess: (atualizado) => {
      queryClient.invalidateQueries({ queryKey: ["servicos"] });
      toast.sucesso(`"${atualizado.nome}" atualizado com sucesso.`);
    },
  });

  const removerMutation = useMutation({
    mutationFn: (servico: Servico) => servicoService.remover(servico.id),
    onSuccess: (_, servico) => {
      queryClient.invalidateQueries({ queryKey: ["servicos"] });
      toast.info(`"${servico.nome}" excluído.`);
    },
  });

  return {
    servicos,
    carregando,
    createDraft,
    createServico: (draft: Servico) =>
      criarMutation.mutate({
        nome: draft.nome,
        descricao: draft.descricao,
        duracaoMinutos: draft.duracaoMinutos,
        preco: draft.preco,
      }),
    saveServico: (editado: Servico) =>
      atualizarMutation.mutate({
        id: editado.id,
        payload: {
          nome: editado.nome,
          descricao: editado.descricao,
          duracaoMinutos: editado.duracaoMinutos,
          preco: editado.preco,
        },
      }),
    removeServico: (servico: Servico) => removerMutation.mutate(servico),
  };
}

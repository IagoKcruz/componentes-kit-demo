import { ToastType, mostrarNotificacao } from "@iagokcruz/componentes-kit";
import type { ToastyObject } from "../types/toasty";

export function exibirToast(obj: ToastyObject): void {
  const texto =
    obj.mensagem ??
    obj.listaMensagem?.join(" | ") ??
    obj.erro ??
    (obj.listaErro?.length ? "• " + obj.listaErro.join("\n• ") : undefined) ??
    "Operação realizada";
  mostrarNotificacao(obj.tipo, texto);
}

export const toast = {
  sucesso: (mensagem: string) => exibirToast({ tipo: ToastType.Sucesso, mensagem }),
  erro: (erro: string) => exibirToast({ tipo: ToastType.Erro, erro }),
  info: (mensagem: string) => exibirToast({ tipo: ToastType.Informacao, mensagem }),
};

import type { ToastType } from "@iagokcruz/componentes-kit";

export interface ToastyObject {
  tipo: ToastType;
  mensagem?: string;
  listaMensagem?: string[];
  erro?: string;
  listaErro?: string[];
}

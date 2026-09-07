import type { Coluna } from "@iagokcruz/componentes-kit";
import type { Servico } from "../types/servico";

export const servicoColumns: Coluna<Servico>[] = [
  { chave: "nome", cabecalho: "Nome" },
  { chave: "descricao", cabecalho: "Descrição" },
  { chave: "duracao_minutos", cabecalho: "Duração (min)", editor: { tipo: "numeric", min: 1, step: 1 } },
  { chave: "preco", cabecalho: "Preço (R$)", editor: { tipo: "numeric", min: 0, step: 0.01 } },
];

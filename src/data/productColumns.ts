import type { Coluna } from "@iagokcruz/componentes-kit";
import type { Product } from "../types/product";
import { CATEGORY_OPTIONS, STATUS_OPTIONS } from "./productOptions";

export const productColumns: Coluna<Product>[] = [
  { chave: "codigo", cabecalho: "Código", editor: { tipo: "mascara", mascara: "999-9999" } },
  { chave: "nome", cabecalho: "Nome" },
  { chave: "categoria", cabecalho: "Categoria", editor: { tipo: "combobox", opcoes: CATEGORY_OPTIONS } },
  { chave: "quantidade", cabecalho: "Quantidade", editor: { tipo: "numeric", min: 0, step: 1 } },
  { chave: "preco", cabecalho: "Valor", editor: { tipo: "numeric", min: 0, step: 0.01 } },
  { chave: "status", cabecalho: "Status", editor: { tipo: "combobox", opcoes: STATUS_OPTIONS } },
];

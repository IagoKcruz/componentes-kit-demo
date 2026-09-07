import type { Coluna } from "@iagokcruz/componentes-kit";
import type { Usuario } from "../types/usuario";

const TIPO_OPTIONS = [
  { valor: "admin", rotulo: "Admin" },
  { valor: "usuario", rotulo: "Usuário" },
  { valor: "funcionario", rotulo: "Funcionário" },
];

export const usuarioColumns: Coluna<Usuario>[] = [
  { chave: "nome", cabecalho: "Nome" },
  { chave: "email", cabecalho: "E-mail" },
  { chave: "cpf", cabecalho: "CPF", editor: { tipo: "mascara", mascara: "999.999.999-99" } },
  { chave: "tipo", cabecalho: "Tipo", editor: { tipo: "combobox", opcoes: TIPO_OPTIONS } },
];

export type TipoUsuario = "admin" | "usuario" | "funcionario";

/** Formato usado internamente no front — tipos[] da API é aplanado em tipo (primeiro item). */
export interface Usuario {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  senha?: string;    // presente apenas no draft de criação
  tipo: TipoUsuario;
  ativo: boolean;
}

/** Formato bruto retornado pela API. */
export interface ApiUsuario {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  ativo: boolean;
  tipos: TipoUsuario[];
}

export function mapApiParaUsuario(api: ApiUsuario): Usuario {
  return {
    id: api.id,
    nome: api.nome,
    email: api.email,
    cpf: api.cpf,
    ativo: api.ativo,
    tipo: api.tipos[0] ?? "usuario",
    senha: "",
  };
}

import { DataGrid } from "@iagokcruz/componentes-kit";
import { usuarioColumns } from "../data/usuarioColumns";
import { useUsuarios } from "../hooks/useUsuarios";

export function UsuariosPage() {
  const { usuarios, carregando, createDraft, createUsuario } = useUsuarios();

  if (carregando) {
    return <p className="text-sm text-[var(--ck-cor-texto-suave)]">Carregando usuários...</p>;
  }

  return (
    <DataGrid
      colunas={usuarioColumns}
      dados={usuarios}
      obterIdLinha={(usuario) => usuario.id}
      aoAdicionar={createDraft}
      aoCriar={createUsuario}
    />
  );
}

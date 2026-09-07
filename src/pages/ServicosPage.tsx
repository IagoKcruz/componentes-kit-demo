import { DataGrid } from "@iagokcruz/componentes-kit";
import { servicoColumns } from "../data/servicoColumns";
import { useServicos } from "../hooks/useServicos";

export function ServicosPage() {
  const { servicos, carregando, createDraft, createServico, saveServico, removeServico } = useServicos();

  if (carregando) {
    return <p className="text-sm text-[var(--ck-cor-texto-suave)]">Carregando serviços...</p>;
  }

  return (
    <DataGrid
      colunas={servicoColumns}
      dados={servicos}
      obterIdLinha={(servico) => servico.id}
      aoAdicionar={createDraft}
      aoCriar={createServico}
      aoSalvar={saveServico}
      aoRemover={removeServico}
    />
  );
}

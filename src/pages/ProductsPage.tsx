import { useState } from "react";
import { DataGrid } from "@iagokcruz/componentes-kit";
import type { ModoEdicao } from "@iagokcruz/componentes-kit";
import { ComponentShowcase } from "../components/ComponentShowcase";
import { productColumns } from "../data/productColumns";
import { useProducts } from "../hooks/useProducts";

interface ProductsPageProps {
  rodapeFixo: boolean;
  aoAlterarRodapeFixo: (rodapeFixo: boolean) => void;
}

export function ProductsPage({ rodapeFixo, aoAlterarRodapeFixo }: ProductsPageProps) {
  const [modoEdicao, setModoEdicao] = useState<ModoEdicao>("popup");
  const { products, createDraft, createProduct, removeProduct, saveProduct, duplicateProduct } = useProducts();

  return (
    <>
      <ComponentShowcase />

      <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-[var(--ck-cor-texto-suave)]">
        <label className="flex items-center gap-2">
          Modo de edição:
          <select
            className="rounded border border-[var(--ck-cor-borda)] bg-[var(--ck-cor-fundo)] px-2 py-1 text-sm"
            value={modoEdicao}
            onChange={(event) => setModoEdicao(event.target.value as ModoEdicao)}
          >
            <option value="popup">Popup</option>
            <option value="inline">Inline</option>
          </select>
        </label>

        <label className="flex items-center gap-2">
          Rodapé fixo:
          <select
            className="rounded border border-[var(--ck-cor-borda)] bg-[var(--ck-cor-fundo)] px-2 py-1 text-sm"
            value={rodapeFixo ? "sim" : "nao"}
            onChange={(event) => aoAlterarRodapeFixo(event.target.value === "sim")}
          >
            <option value="nao">Não</option>
            <option value="sim">Sim</option>
          </select>
        </label>
      </div>

      <DataGrid
        colunas={productColumns}
        dados={products}
        obterIdLinha={(product) => product.id}
        aoAdicionar={createDraft}
        aoCriar={createProduct}
        aoRemover={removeProduct}
        aoSalvar={saveProduct}
        modoEdicao={modoEdicao}
        acoesLinha={(product) => [
          { id: "duplicar", rotulo: "Duplicar", aoClicar: () => duplicateProduct(product) },
        ]}
      />
    </>
  );
}

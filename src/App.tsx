import { useState } from "react";
import {
  DataGrid,
  Footer,
  Layout,
  Menu,
  SettingsComponent,
  ThemeProvider,
  type Column,
  type EditMode,
} from "@iagokcruz/componentes-kit";
import { fakeApiCall } from "./fakeApi";

function iconProps() {
  return {
    xmlns: "http://www.w3.org/2000/svg" as const,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-5 w-5 shrink-0",
    "aria-hidden": true,
  };
}

function Pagina1Icon() {
  return (
    <svg {...iconProps()}>
      <path d="m21 8-9-5-9 5 9 5 9-5Z" />
      <path d="M3 8v8l9 5 9-5V8M12 13v8" />
    </svg>
  );
}

function Pagina2Icon() {
  return (
    <svg {...iconProps()}>
      <path d="M9 11h6M9 15h6M9 7h6" />
      <rect x="5" y="3" width="14" height="18" rx="2" />
    </svg>
  );
}

function Pagina3Icon() {
  return (
    <svg {...iconProps()}>
      <path d="M3 3v18h18" />
      <path d="M18 17V9M13 17v-5M8 17v-3" />
    </svg>
  );
}

interface Produto {
  id: number;
  nome: string;
  categoria: string;
  quantidade: number;
  preco: number;
  status: string;
}

const produtosIniciais: Produto[] = [
  { id: 1, nome: "Arroz", categoria: "Grãos", quantidade: 10, preco: 24.9, status: "Disponível" },
  { id: 2, nome: "Feijão", categoria: "Grãos", quantidade: 5, preco: 8.5, status: "Disponível" },
  { id: 3, nome: "Óleo de soja", categoria: "Mercearia", quantidade: 2, preco: 12.3, status: "Em falta" },
  { id: 4, nome: "Açúcar", categoria: "Mercearia", quantidade: 18, preco: 6.2, status: "Disponível" },
  { id: 5, nome: "Café", categoria: "Bebidas", quantidade: 7, preco: 15.9, status: "Disponível" },
  { id: 6, nome: "Leite", categoria: "Laticínios", quantidade: 0, preco: 4.8, status: "Em falta" },
];

const columns: Column<Produto>[] = [
  { key: "nome", header: "Produto" },
  { key: "categoria", header: "Categoria" },
  { key: "quantidade", header: "Quantidade" },
  { key: "preco", header: "Preço (R$)" },
  { key: "status", header: "Status" },
];

type PageId = "pagina-1" | "pagina-2" | "pagina-3";

const PAGE_LABELS: Record<PageId, string> = {
  "pagina-1": "Página 1",
  "pagina-2": "Página 2",
  "pagina-3": "Página 3",
};

export function App() {
  const [page, setPage] = useState<PageId>("pagina-1");
  const [produtos, setProdutos] = useState<Produto[]>(produtosIniciais);
  const [editMode, setEditMode] = useState<EditMode>("popup");
  const [footerFixed, setFooterFixed] = useState(false);

  const menuItems = [
    { id: "pagina-1", label: "Página 1", href: "#", icon: <Pagina1Icon />, onClick: () => setPage("pagina-1") },
    { id: "pagina-2", label: "Página 2", href: "#", icon: <Pagina2Icon />, onClick: () => setPage("pagina-2") },
    { id: "pagina-3", label: "Página 3", href: "#", icon: <Pagina3Icon />, onClick: () => setPage("pagina-3") },
  ];

  function handleAdd(): Produto {
    const nextId = produtos.length > 0 ? Math.max(...produtos.map((p) => p.id)) + 1 : 1;
    return { id: nextId, nome: "", categoria: "", quantidade: 0, preco: 0, status: "Disponível" };
  }

  // Simula uma chamada de API (com latência) antes de aplicar a mudança de verdade.
  async function handleCreate(novoProduto: Produto) {
    await fakeApiCall(novoProduto);
    setProdutos((atual) => [...atual, novoProduto]);
  }

  async function handleRemove(produto: Produto) {
    await fakeApiCall(produto);
    setProdutos((atual) => atual.filter((item) => item.id !== produto.id));
  }

  async function handleSave(produtoEditado: Produto) {
    await fakeApiCall(produtoEditado);
    setProdutos((atual) => atual.map((item) => (item.id === produtoEditado.id ? produtoEditado : item)));
  }

  function handleDuplicar(produto: Produto) {
    const nextId = Math.max(...produtos.map((p) => p.id)) + 1;
    setProdutos((atual) => [...atual, { ...produto, id: nextId, nome: `${produto.nome} (cópia)` }]);
  }

  return (
    <ThemeProvider>
      <Layout
        menu={<Menu items={menuItems} />}
        footer={
          <Footer fixed={footerFixed}>
            <span>componentes-kit — demo</span>
          </Footer>
        }
        footerFixed={footerFixed}
      >
        <div className="p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold sm:text-2xl">{PAGE_LABELS[page]}</h1>
            <SettingsComponent />
          </div>

          {page === "pagina-1" && (
            <>
              <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-[var(--ck-color-text-muted)]">
                <label className="flex items-center gap-2">
                  Modo de edição:
                  <select
                    className="rounded border border-[var(--ck-color-border)] bg-[var(--ck-color-bg)] px-2 py-1 text-sm"
                    value={editMode}
                    onChange={(event) => setEditMode(event.target.value as EditMode)}
                  >
                    <option value="popup">Popup</option>
                    <option value="inline">Inline</option>
                  </select>
                </label>

                <label className="flex items-center gap-2">
                  Rodapé fixo:
                  <select
                    className="rounded border border-[var(--ck-color-border)] bg-[var(--ck-color-bg)] px-2 py-1 text-sm"
                    value={footerFixed ? "sim" : "nao"}
                    onChange={(event) => setFooterFixed(event.target.value === "sim")}
                  >
                    <option value="nao">Não</option>
                    <option value="sim">Sim</option>
                  </select>
                </label>
              </div>

              <DataGrid
                columns={columns}
                data={produtos}
                getRowId={(produto) => produto.id}
                onAdd={handleAdd}
                onCreate={handleCreate}
                onRemove={handleRemove}
                onSave={handleSave}
                editMode={editMode}
                rowActions={(produto) => [
                  { id: "duplicar", label: "Duplicar", onClick: () => handleDuplicar(produto) },
                ]}
              />
            </>
          )}

          {page === "pagina-2" && (
            <p className="text-sm text-[var(--ck-color-text-muted)]">
              Conteúdo de exemplo da Página 2 — troque isso pelo conteúdo real do seu projeto. O
              menu, o rodapé, as configurações e o layout ao redor continuam os mesmos em
              qualquer página.
            </p>
          )}

          {page === "pagina-3" && (
            <p className="text-sm text-[var(--ck-color-text-muted)]">
              Conteúdo de exemplo da Página 3 — troque isso pelo conteúdo real do seu projeto. O
              menu, o rodapé, as configurações e o layout ao redor continuam os mesmos em
              qualquer página.
            </p>
          )}
        </div>
      </Layout>
    </ThemeProvider>
  );
}

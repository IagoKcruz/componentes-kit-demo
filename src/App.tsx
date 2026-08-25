import { useRef, useState } from "react";
import {
  DataGrid,
  SettingsComponent,
  ThemeProvider,
  type Column,
  type DataGridHandle,
  type EditMode,
  type ThemeMode,
} from "componentes-kit";
import { fakeApiCall } from "./fakeApi";
import { themeOptions } from "./themes";

interface Produto {
  id: number;
  nome: string;
  quantidade: number;
}

const produtosIniciais: Produto[] = [
  { id: 1, nome: "Arroz", quantidade: 10 },
  { id: 2, nome: "Feijão", quantidade: 5 },
  { id: 3, nome: "Óleo", quantidade: 2 },
];

const columns: Column<Produto>[] = [
  { key: "nome", header: "Produto", width: 240 },
  { key: "quantidade", header: "Quantidade", width: 140 },
];

export function App() {
  const [produtos, setProdutos] = useState<Produto[]>(produtosIniciais);
  const [editMode, setEditMode] = useState<EditMode>("popup");
  const [themeId, setThemeId] = useState("default");
  const [mode, setMode] = useState<ThemeMode | "system">("system");
  const [editingSnapshot, setEditingSnapshot] = useState<Produto | null>(null);

  const gridRef = useRef<DataGridHandle<Produto>>(null);
  const selectedTheme = themeOptions.find((theme) => theme.id === themeId);

  function handleAdd(): Produto {
    const nextId = produtos.length > 0 ? Math.max(...produtos.map((p) => p.id)) + 1 : 1;
    return { id: nextId, nome: "", quantidade: 0 };
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
    <ThemeProvider mode={mode === "system" ? undefined : mode} overrides={selectedTheme?.overrides}>
      <main className="mx-auto mt-10 max-w-2xl px-4 pb-16 text-[var(--ck-color-text)]">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Estoque</h1>
          <SettingsComponent />
        </div>

        <label className="mb-3 flex items-center gap-2 text-sm text-[var(--ck-color-text-muted)]">
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

        <DataGrid
          ref={gridRef}
          columns={columns}
          data={produtos}
          getRowId={(produto) => produto.id}
          onAdd={handleAdd}
          onCreate={handleCreate}
          onRemove={handleRemove}
          onSave={handleSave}
          editMode={editMode}
          height={280}
          width={500}
          rowActions={(produto) => [
            { id: "duplicar", label: "Duplicar", onClick: () => handleDuplicar(produto) },
          ]}
        />

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            className="rounded border border-[var(--ck-color-border)] px-3 py-1.5 text-sm"
            onClick={() => setEditingSnapshot(gridRef.current?.getEditingRow() ?? null)}
          >
            Ver linha em edição (via ref)
          </button>
          <span className="text-sm text-[var(--ck-color-text-muted)]">
            {editingSnapshot ? JSON.stringify(editingSnapshot) : "nenhuma edição em andamento"}
          </span>
        </div>

        <footer className="mt-10 flex flex-wrap items-center gap-4 border-t border-[var(--ck-color-border)] pt-4 text-sm text-[var(--ck-color-text-muted)]">
          <label className="flex items-center gap-2">
            Tema:
            <select
              className="rounded border border-[var(--ck-color-border)] bg-[var(--ck-color-bg)] px-2 py-1"
              value={themeId}
              onChange={(event) => setThemeId(event.target.value)}
            >
              {themeOptions.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2">
            Modo:
            <select
              className="rounded border border-[var(--ck-color-border)] bg-[var(--ck-color-bg)] px-2 py-1"
              value={mode}
              onChange={(event) => setMode(event.target.value as ThemeMode | "system")}
            >
              <option value="system">Sistema</option>
              <option value="light">Claro</option>
              <option value="dark">Escuro</option>
            </select>
          </label>
        </footer>
      </main>
    </ThemeProvider>
  );
}

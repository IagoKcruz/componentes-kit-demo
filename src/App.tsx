import { useState } from "react";
import { DataGrid, type Column, type EditMode } from "componentes-kit";

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

  function handleAdd(): Produto {
    const nextId = produtos.length > 0 ? Math.max(...produtos.map((p) => p.id)) + 1 : 1;
    return { id: nextId, nome: "", quantidade: 0 };
  }

  function handleCreate(novoProduto: Produto) {
    setProdutos((atual) => [...atual, novoProduto]);
  }

  function handleRemove(produto: Produto) {
    setProdutos((atual) => atual.filter((item) => item.id !== produto.id));
  }

  function handleSave(produtoEditado: Produto) {
    setProdutos((atual) => atual.map((item) => (item.id === produtoEditado.id ? produtoEditado : item)));
  }

  function handleDuplicar(produto: Produto) {
    const nextId = Math.max(...produtos.map((p) => p.id)) + 1;
    setProdutos((atual) => [...atual, { ...produto, id: nextId, nome: `${produto.nome} (cópia)` }]);
  }

  return (
    <main className="mx-auto mt-10 max-w-2xl px-4">
      <h1 className="mb-4 text-xl font-semibold text-slate-900">Estoque</h1>

      <label className="mb-3 flex items-center gap-2 text-sm text-slate-600">
        Modo de edição:
        <select
          className="rounded border border-slate-300 px-2 py-1 text-sm"
          value={editMode}
          onChange={(event) => setEditMode(event.target.value as EditMode)}
        >
          <option value="popup">Popup</option>
          <option value="inline">Inline</option>
        </select>
      </label>

      <DataGrid
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
    </main>
  );
}

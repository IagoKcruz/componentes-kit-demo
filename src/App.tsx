import { useState } from "react";
import type { ReactNode } from "react";
import {
  ComboBox,
  DataGrid,
  Footer,
  Layout,
  MaskedInput,
  Menu,
  NumericInput,
  SettingsComponent,
  TextBox,
  ToastContainer,
  ToastType,
  ThemeProvider,
  mostrarNotificacao,
  type Coluna,
  type ModoEdicao,
} from "@iagokcruz/componentes-kit";
import { fakeApiCall } from "./fakeApi";

function propsIcone() {
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

function IconePagina1() {
  return (
    <svg {...propsIcone()}>
      <path d="m21 8-9-5-9 5 9 5 9-5Z" />
      <path d="M3 8v8l9 5 9-5V8M12 13v8" />
    </svg>
  );
}

function IconePagina2() {
  return (
    <svg {...propsIcone()}>
      <path d="M9 11h6M9 15h6M9 7h6" />
      <rect x="5" y="3" width="14" height="18" rx="2" />
    </svg>
  );
}

function IconePagina3() {
  return (
    <svg {...propsIcone()}>
      <path d="M3 3v18h18" />
      <path d="M18 17V9M13 17v-5M8 17v-3" />
    </svg>
  );
}

interface Produto {
  id: number;
  codigo: string;
  nome: string;
  categoria: string;
  quantidade: number;
  preco: number;
  status: string;
}

// Dados só pra demonstrar os componentes — de propósito sem nenhum tema (não é uma loja, um
// estoque real, nem nada — só "Objeto 1", "Opção 1" etc., pra não distrair do que importa aqui.
const OPCOES_CATEGORIA = [
  { valor: "Opção 1", rotulo: "Opção 1" },
  { valor: "Opção 2", rotulo: "Opção 2" },
  { valor: "Opção 3", rotulo: "Opção 3" },
  { valor: "Opção 4", rotulo: "Opção 4" },
];

const OPCOES_STATUS = [
  { valor: "Opção 1", rotulo: "Opção 1" },
  { valor: "Opção 2", rotulo: "Opção 2" },
];

const produtosIniciais: Produto[] = [
  { id: 1, codigo: "100-0001", nome: "Objeto 1", categoria: "Opção 1", quantidade: 10, preco: 24.9, status: "Opção 1" },
  { id: 2, codigo: "100-0002", nome: "Objeto 2", categoria: "Opção 1", quantidade: 5, preco: 8.5, status: "Opção 1" },
  { id: 3, codigo: "200-0001", nome: "Objeto 3", categoria: "Opção 2", quantidade: 2, preco: 12.3, status: "Opção 2" },
  { id: 4, codigo: "200-0002", nome: "Objeto 4", categoria: "Opção 2", quantidade: 18, preco: 6.2, status: "Opção 1" },
  { id: 5, codigo: "300-0001", nome: "Objeto 5", categoria: "Opção 3", quantidade: 7, preco: 15.9, status: "Opção 1" },
  { id: 6, codigo: "400-0001", nome: "Objeto 6", categoria: "Opção 4", quantidade: 0, preco: 4.8, status: "Opção 2" },
];

const colunas: Coluna<Produto>[] = [
  { chave: "codigo", cabecalho: "Código", editor: { tipo: "mascara", mascara: "999-9999" } },
  { chave: "nome", cabecalho: "Nome" },
  { chave: "categoria", cabecalho: "Categoria", editor: { tipo: "combobox", opcoes: OPCOES_CATEGORIA } },
  { chave: "quantidade", cabecalho: "Quantidade", editor: { tipo: "numeric", min: 0, step: 1 } },
  { chave: "preco", cabecalho: "Valor", editor: { tipo: "numeric", min: 0, step: 0.01 } },
  { chave: "status", cabecalho: "Status", editor: { tipo: "combobox", opcoes: OPCOES_STATUS } },
];

type IdPagina = "pagina-1" | "pagina-2" | "pagina-3";

const ROTULOS_PAGINA: Record<IdPagina, string> = {
  "pagina-1": "Página 1",
  "pagina-2": "Página 2",
  "pagina-3": "Página 3",
};

/** Nome do componente + o componente em si, lado a lado — só pra mostrar cada um funcionando. */
function ComponentesShowcase() {
  const [texto, setTexto] = useState("");
  const [numero, setNumero] = useState(42);
  const [mascara, setMascara] = useState("");
  const [combo, setCombo] = useState(OPCOES_CATEGORIA[0]!.valor);

  const linhas: { nome: string; elemento: ReactNode }[] = [
    { nome: "TextBox", elemento: <TextBox valor={texto} aoAlterar={setTexto} dica="Digite algo" /> },
    { nome: "NumericInput", elemento: <NumericInput valor={numero} aoAlterar={setNumero} minimo={0} /> },
    { nome: "MaskedInput (CPF)", elemento: <MaskedInput valor={mascara} aoAlterar={setMascara} mascara="999.999.999-99" dica="000.000.000-00" /> },
    { nome: "ComboBox", elemento: <ComboBox valor={combo} aoAlterar={setCombo} opcoes={OPCOES_CATEGORIA} /> },
  ];

  return (
    <div className="mb-6 overflow-hidden rounded-[var(--ck-raio)] border border-[var(--ck-cor-borda)]">
      {linhas.map((linha, index) => (
        <div
          key={linha.nome}
          className={`flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:gap-4 ${
            index > 0 ? "border-t border-[var(--ck-cor-borda)]" : ""
          }`}
        >
          <span className="w-40 shrink-0 text-sm font-medium text-[var(--ck-cor-texto)]">{linha.nome}</span>
          <div className="w-full sm:max-w-xs">{linha.elemento}</div>
        </div>
      ))}
    </div>
  );
}

export function App() {
  const [pagina, setPagina] = useState<IdPagina>("pagina-1");
  const [produtos, setProdutos] = useState<Produto[]>(produtosIniciais);
  const [modoEdicao, setModoEdicao] = useState<ModoEdicao>("popup");
  const [rodapeFixo, setRodapeFixo] = useState(false);

  const itensMenu = [
    { id: "pagina-1", rotulo: "Página 1", href: "#", icone: <IconePagina1 />, aoClicar: () => setPagina("pagina-1") },
    { id: "pagina-2", rotulo: "Página 2", href: "#", icone: <IconePagina2 />, aoClicar: () => setPagina("pagina-2") },
    { id: "pagina-3", rotulo: "Página 3", href: "#", icone: <IconePagina3 />, aoClicar: () => setPagina("pagina-3") },
  ];

  function criarRascunho(): Produto {
    const proximoId = produtos.length > 0 ? Math.max(...produtos.map((p) => p.id)) + 1 : 1;
    return { id: proximoId, codigo: "", nome: "", categoria: "", quantidade: 0, preco: 0, status: "Opção 1" };
  }

  // Simula uma chamada de API (com latência) antes de aplicar a mudança de verdade.
  async function criarProduto(novoProduto: Produto) {
    await fakeApiCall(novoProduto);
    setProdutos((atual) => [...atual, novoProduto]);
    mostrarNotificacao(ToastType.Sucesso, `"${novoProduto.nome}" criado com sucesso.`);
  }

  async function removerProduto(produto: Produto) {
    await fakeApiCall(produto);
    setProdutos((atual) => atual.filter((item) => item.id !== produto.id));
    mostrarNotificacao(ToastType.Informacao, `"${produto.nome}" excluído.`);
  }

  async function salvarProduto(produtoEditado: Produto) {
    await fakeApiCall(produtoEditado);
    setProdutos((atual) => atual.map((item) => (item.id === produtoEditado.id ? produtoEditado : item)));
    mostrarNotificacao(ToastType.Sucesso, `"${produtoEditado.nome}" atualizado com sucesso.`);
  }

  function duplicarProduto(produto: Produto) {
    const proximoId = Math.max(...produtos.map((p) => p.id)) + 1;
    setProdutos((atual) => [...atual, { ...produto, id: proximoId, nome: `${produto.nome} (cópia)` }]);
    mostrarNotificacao(ToastType.Informacao, `"${produto.nome}" duplicado.`);
  }

  return (
    <ThemeProvider>
      <Layout
        menu={<Menu itens={itensMenu} />}
        rodape={
          <Footer fixo={rodapeFixo}>
            <span>componentes-kit — demo</span>
          </Footer>
        }
        rodapeFixo={rodapeFixo}
      >
        <div className="p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold sm:text-2xl">{ROTULOS_PAGINA[pagina]}</h1>
            <SettingsComponent />
          </div>

          {pagina === "pagina-1" && (
            <>
              <ComponentesShowcase />

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
                    onChange={(event) => setRodapeFixo(event.target.value === "sim")}
                  >
                    <option value="nao">Não</option>
                    <option value="sim">Sim</option>
                  </select>
                </label>
              </div>

              <DataGrid
                colunas={colunas}
                dados={produtos}
                obterIdLinha={(produto) => produto.id}
                aoAdicionar={criarRascunho}
                aoCriar={criarProduto}
                aoRemover={removerProduto}
                aoSalvar={salvarProduto}
                modoEdicao={modoEdicao}
                acoesLinha={(produto) => [
                  { id: "duplicar", rotulo: "Duplicar", aoClicar: () => duplicarProduto(produto) },
                ]}
              />
            </>
          )}

          {pagina === "pagina-2" && (
            <p className="text-sm text-[var(--ck-cor-texto-suave)]">
              Conteúdo de exemplo da Página 2 — troque isso pelo conteúdo real do seu projeto. O
              menu, o rodapé, as configurações e o layout ao redor continuam os mesmos em
              qualquer página.
            </p>
          )}

          {pagina === "pagina-3" && (
            <p className="text-sm text-[var(--ck-cor-texto-suave)]">
              Conteúdo de exemplo da Página 3 — troque isso pelo conteúdo real do seu projeto. O
              menu, o rodapé, as configurações e o layout ao redor continuam os mesmos em
              qualquer página.
            </p>
          )}
        </div>
      </Layout>

      <ToastContainer />
    </ThemeProvider>
  );
}

# componentes-kit-demo — Guia completo (README 2.0)

Este projeto é uma vitrine viva do [`@iagokcruz/componentes-kit`](https://www.npmjs.com/package/@iagokcruz/componentes-kit)
— cada tela mostra um pedaço da biblioteca funcionando de verdade, com dados fictícios (sem tema
de negócio nenhum, de propósito: "Objeto 1", "Opção 1"...). Para a documentação detalhada de cada
componente (props, exemplos, tabelas de referência), veja o
[README2.0.md do componentes-kit](https://github.com/IagoKcruz/componentes-kit/blob/master/README2.0.md).

🔗 **Demo no ar:** [componentes-kit-demo.vercel.app](https://componentes-kit-demo.vercel.app/)

## Índice

1. [Como rodar localmente](#como-rodar-localmente)
2. [Estrutura do projeto](#estrutura-do-projeto)
3. [Tour pela tela](#tour-pela-tela)
4. [Como o `DataGrid` está configurado aqui](#como-o-datagrid-está-configurado-aqui)
5. [Como testar contra uma versão local do componentes-kit](#como-testar-contra-uma-versão-local-do-componentes-kit)
6. [Deploy](#deploy)

---

## Como rodar localmente

```bash
git clone https://github.com/IagoKcruz/componentes-kit-demo.git
cd componentes-kit-demo
pnpm install
pnpm run dev
```

Abre em `http://localhost:5173` com hot-reload. `pnpm run build` gera a versão de produção em
`dist/` (é exatamente isso que a Vercel builda a cada push em `master`).

## Estrutura do projeto

```
src/
  main.tsx      — ponto de entrada: importa o CSS do kit e monta <App />
  App.tsx       — a tela inteira do demo (única página real, com navegação client-side)
  fakeApi.ts    — simula uma chamada de API (latência de ~700ms) sem precisar de backend
  index.css     — CSS próprio do demo (mínimo, quase tudo vem do componentes-kit)
```

Não tem roteador (react-router ou similar) de propósito — a "navegação" entre Página 1/2/3 é só
um `useState` trocando o que é renderizado, pra manter o exemplo simples. Um projeto real
plugaria o `href`/`aoClicar` de cada `MenuItem` num roteador de verdade.

## Tour pela tela

| O que você vê | Componente do kit | Onde olhar no `App.tsx` |
| --- | --- | --- |
| Menu lateral colapsável (Página 1/2/3) | `Menu` dentro de `Layout` | `itensMenu` |
| Rodapé, com botão "Rodapé fixo" pra alternar | `Footer` | prop `rodapeFixo` |
| Botão de engrenagem no canto | `SettingsComponent` | `<SettingsComponent />` |
| Catálogo (TextBox/NumericInput/MaskedInput/ComboBox) | os 4 campos de formulário | `ComponentesShowcase` |
| Tabela de produtos com Incluir/Editar/Excluir/Duplicar | `DataGrid` | `colunas` + os handlers `criar*`/`salvar*`/`remover*` |
| Notificação no canto inferior direito ao criar/editar/excluir | `ToastContainer` + `mostrarNotificacao` | final do `App.tsx` + dentro de cada handler |
| Tema claro/escuro/sistema + paletas de cor | `SettingsComponent` (aba Geral) | nada a fazer — vem de graça |

A popup de **Configurações** (engrenagem) e o `ThemeProvider` envolvendo tudo são o que dão o
tema à demo inteira — troque a paleta lá e repare que absolutamente todo componente na tela
(inclusive os campos do catálogo e a grid) muda junto, porque todos leem as mesmas variáveis CSS.

## Como o `DataGrid` está configurado aqui

O exemplo da Página 1 mostra os 4 tipos de editor declarativo (`editor.tipo`) numa grid só,
propositalmente, pra servir de referência rápida:

```tsx
const colunas: Coluna<Produto>[] = [
  { chave: "codigo", cabecalho: "Código", editor: { tipo: "mascara", mascara: "999-9999" } },
  { chave: "nome", cabecalho: "Nome" }, // sem `editor` = usa TextBox (padrão)
  { chave: "categoria", cabecalho: "Categoria", editor: { tipo: "combobox", opcoes: OPCOES_CATEGORIA } },
  { chave: "quantidade", cabecalho: "Quantidade", editor: { tipo: "numeric", min: 0, step: 1 } },
  { chave: "preco", cabecalho: "Valor", editor: { tipo: "numeric", min: 0, step: 0.01 } },
  { chave: "status", cabecalho: "Status", editor: { tipo: "combobox", opcoes: OPCOES_STATUS } },
];
```

`aoAdicionar`/`aoCriar`/`aoSalvar`/`aoRemover` todos passam por `fakeApiCall(...)` antes de
mexer no estado — é assim que a demo simula "salvando..."/"excluindo..." com latência de rede
real, sem precisar de um backend de verdade. Troque essas 4 funções pelas suas chamadas de API
de verdade e o resto do comportamento (loading, confirmação de exclusão, toasts) continua igual.

## Como testar contra uma versão local do componentes-kit

Se você está desenvolvendo os dois repositórios ao mesmo tempo (`componentes-kit` e
`componentes-kit-demo` lado a lado na mesma pasta pai):

```bash
# dentro de componentes-kit-demo/package.json, troque temporariamente:
"@iagokcruz/componentes-kit": "link:../componentes-kit"
```

```bash
pnpm install
pnpm run dev
```

**Antes de commitar**, reverta a dependência pra versão publicada no npm (`^X.Y.Z`) e rode
`pnpm install` de novo — o `link:` é só uma ferramenta de desenvolvimento local, nunca deve ir
pro repositório.

## Deploy

Estático, sem variáveis de ambiente — `pnpm build` gera `dist/`. A Vercel está configurada pra
buildar e publicar automaticamente a cada push em `master` (branch de produção). `Dev` é onde o
trabalho acontece; `master` só recebe merge quando um release é decidido.

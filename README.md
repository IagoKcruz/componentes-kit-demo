# componentes-kit-demo

Projeto de exemplo que consome o pacote [`@iagokcruz/componentes-kit`](https://www.npmjs.com/package/@iagokcruz/componentes-kit) (publicado no npm) — serve pra ver os componentes funcionando de verdade numa tela antes de usá-los em outro projeto.

## Como rodar

```bash
pnpm install
pnpm run dev
```

Abre em `http://localhost:5173`.

## O que a tela mostra

`src/App.tsx` monta uma tela de "Estoque" usando o `Layout` (com `Menu` lateral colapsável e
`Footer`) e o `DataGrid`:
- **Menu**: navegação lateral (Estoque/Pedidos/Clientes/Relatórios), colapsa pra uma barrinha
  com o botão de abrir.
- **Configurações** (ícone de engrenagem): aparência (claro/escuro/sistema) e customização de
  cores ao vivo.
- **Incluir**: abre o formulário vazio (popup ou inline, conforme o seletor "Modo de edição" no
  topo) e só cria o produto ao confirmar.
- **Editar** / **Excluir** / **Duplicar**: ações por linha na grid.
- **Rodapé fixo**: alterna entre o rodapé sempre visível (com scroll só no conteúdo) e o rodapé
  normal (rola junto com a página).

## Deploy

O projeto está pronto pra deploy estático (Vercel, Netlify etc.) — não usa nenhuma variável de
ambiente nem link local, é só instalar e buildar (`pnpm build`, saída em `dist/`).

## Branches

- `master`: o que está publicado/no ar.
- `Dev`: onde as mudanças acontecem. `master` só é atualizada quando um novo release é decidido.

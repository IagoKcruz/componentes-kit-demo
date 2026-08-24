# componentes-kit-demo

Projeto de exemplo, separado, que consome o pacote [`componentes-kit`](../componentes-kit) localmente — serve pra ver o `DataGrid` funcionando de verdade numa tela antes de usá-lo em outro projeto.

## Como rodar

Precisa que `componentes-kit` esteja buildado (o `dist/` dele é o que este projeto consome via `file:../componentes-kit`):

```bash
cd ../componentes-kit
pnpm install
pnpm run build

cd ../componentes-kit-demo
pnpm install
pnpm run dev
```

Abre em `http://localhost:5173`.

## O que a tela mostra

`src/App.tsx` é uma tela de "Estoque" usando `DataGrid`:
- **Incluir**: abre o formulário vazio (popup ou inline, conforme o seletor "Modo de edição" no topo) e só cria o produto ao confirmar.
- **Editar**: abre o registro existente pra edição.
- **Excluir**: remove o produto direto.
- **Duplicar**: ação customizada por linha, criada só pra essa tela.

Sempre que mexer no `componentes-kit`, rode `pnpm run build` lá de novo — o Vite deste projeto detecta a mudança via hot reload (às vezes é preciso `pnpm run dev -- --force` se o cache de dependências do Vite ficar desatualizado).

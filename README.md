# componentes-kit — demo

Aplicação de demonstração do design system [`@iagokcruz/componentes-kit`](https://github.com/IagoKcruz/componentes-kit). Exibe componentes reais em contexto de uso e serve como ambiente de validação visual e funcional do kit.

**Deploy:** https://componentes-kit-demo.vercel.app

## O que tem aqui

- Páginas públicas de exemplo com `DataGrid`, `Menu`, `Layout`, `Footer`, `ThemeProvider` e `ToastContainer`
- Páginas autenticadas de **Serviços** e **Usuários** com CRUD completo integrado à API
- Suporte a tema claro/escuro via `SettingsComponent`
- Banner de alerta quando a API está fora do ar

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Estilos | Tailwind CSS |
| Testes | Vitest + Testing Library |
| Deploy | Vercel |

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `VITE_API_URL` | URL base da API (ex: `https://componentes-kit-demo-api.onrender.com`) |

Crie um `.env` local a partir do `.env.example`:

```bash
cp .env.example .env
```

## Rodando localmente

```bash
pnpm install
pnpm dev
```

Os testes:

```bash
pnpm test
```

## Estrutura relevante

```
src/
├── components/   # Ícones e componentes locais
├── data/         # Definição de colunas do DataGrid
├── hooks/        # useAuth, useApiStatus, useServicos, useUsuarios
├── pages/        # Páginas da aplicação
├── services/     # Clientes HTTP (authService, servicoService, usuarioService)
├── lib/          # apiClient (fetch + tratamento de erros)
└── types/        # Tipos TypeScript compartilhados
```

## API

Este demo consome a [componentes-kit-demo-api](https://github.com/IagoKcruz/componentes-kit-demo-api). Para rodar localmente sem Render, suba a API localmente e aponte `VITE_API_URL=http://localhost:8000`.

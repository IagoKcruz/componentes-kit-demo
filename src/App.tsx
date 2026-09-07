import { useState, useEffect } from "react";
import { Footer, Layout, Menu, SettingsComponent, ThemeProvider, ToastContainer } from "@iagokcruz/componentes-kit";
import { Page1Icon, Page2Icon, Page3Icon, ServicosIcon, SairIcon, UsuariosIcon, EntrarIcon } from "./components/icons";
import { PAGE_LABELS } from "./navigation";
import type { PageId } from "./navigation";
import { useAuth } from "./hooks/useAuth";
import { LoginPage } from "./pages/LoginPage";
import { ProductsPage } from "./pages/ProductsPage";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { ServicosPage } from "./pages/ServicosPage";
import { UsuariosPage } from "./pages/UsuariosPage";

export function App() {
  const { autenticado, carregando: carregandoAuth, login, logout } = useAuth();
  const [page, setPage] = useState<PageId>("pagina-1");
  const [fixedFooter, setFixedFooter] = useState(false);

  useEffect(() => {
    if (autenticado && page === "login") {
      setPage("pagina-1");
    }
    if (!autenticado && (page === "servicos" || page === "usuarios")) {
      setPage("pagina-1");
    }
  }, [autenticado]);

  function handleLogout() {
    logout();
    setPage("pagina-1");
  }

  const paginasPublicas = [
    { id: "pagina-1", rotulo: "Página 1", href: "#", icone: <Page1Icon />, aoClicar: () => setPage("pagina-1") },
    { id: "pagina-2", rotulo: "Página 2", href: "#", icone: <Page2Icon />, aoClicar: () => setPage("pagina-2") },
    { id: "pagina-3", rotulo: "Página 3", href: "#", icone: <Page3Icon />, aoClicar: () => setPage("pagina-3") },
  ];

  const paginasPrivadas = autenticado
    ? [
        { id: "servicos", rotulo: "Serviços", href: "#", icone: <ServicosIcon />, aoClicar: () => setPage("servicos") },
        { id: "usuarios", rotulo: "Usuários", href: "#", icone: <UsuariosIcon />, aoClicar: () => setPage("usuarios") },
      ]
    : [];

  const menuItems = [...paginasPublicas, ...paginasPrivadas];

  return (
    <ThemeProvider>
      <Layout
        menu={<Menu itens={menuItems} />}
        rodape={
          <Footer fixo={fixedFooter}>
            <span>componentes-kit — demo</span>
          </Footer>
        }
        rodapeFixo={fixedFooter}
      >
        <div className="p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold sm:text-2xl">{PAGE_LABELS[page]}</h1>
            <div className="flex items-center gap-2">
              {autenticado ? (
                <button
                  onClick={handleLogout}
                  title="Sair"
                  className="flex items-center gap-1.5 rounded border border-[var(--ck-cor-borda)] px-2 py-1.5 text-sm text-[var(--ck-cor-texto-suave)] transition-colors hover:text-[var(--ck-cor-texto)]"
                >
                  <SairIcon />
                  Sair
                </button>
              ) : (
                <button
                  onClick={() => setPage("login")}
                  title="Entrar"
                  className="flex items-center gap-1.5 rounded border border-[var(--ck-cor-borda)] px-2 py-1.5 text-sm text-[var(--ck-cor-texto-suave)] transition-colors hover:text-[var(--ck-cor-texto)]"
                >
                  <EntrarIcon />
                  Entrar
                </button>
              )}
              <SettingsComponent />
            </div>
          </div>

          {page === "login"    && <LoginPage aoLogar={login} carregando={carregandoAuth} />}
          {page === "pagina-1" && <ProductsPage rodapeFixo={fixedFooter} aoAlterarRodapeFixo={setFixedFooter} />}
          {page === "pagina-2" && <PlaceholderPage rotulo="Página 2" />}
          {page === "pagina-3" && <PlaceholderPage rotulo="Página 3" />}
          {page === "servicos" && <ServicosPage />}
          {page === "usuarios" && <UsuariosPage />}
        </div>
      </Layout>

      <ToastContainer />
    </ThemeProvider>
  );
}

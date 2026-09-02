import { useState } from "react";
import { Footer, Layout, Menu, SettingsComponent, ThemeProvider, ToastContainer } from "@iagokcruz/componentes-kit";
import { Page1Icon, Page2Icon, Page3Icon } from "./components/icons";
import { PAGE_LABELS } from "./navigation";
import type { PageId } from "./navigation";
import { ProductsPage } from "./pages/ProductsPage";
import { PlaceholderPage } from "./pages/PlaceholderPage";

export function App() {
  const [page, setPage] = useState<PageId>("pagina-1");
  const [fixedFooter, setFixedFooter] = useState(false);

  const menuItems = [
    { id: "pagina-1", rotulo: "Página 1", href: "#", icone: <Page1Icon />, aoClicar: () => setPage("pagina-1") },
    { id: "pagina-2", rotulo: "Página 2", href: "#", icone: <Page2Icon />, aoClicar: () => setPage("pagina-2") },
    { id: "pagina-3", rotulo: "Página 3", href: "#", icone: <Page3Icon />, aoClicar: () => setPage("pagina-3") },
  ];

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
            <SettingsComponent />
          </div>

          {page === "pagina-1" && <ProductsPage rodapeFixo={fixedFooter} aoAlterarRodapeFixo={setFixedFooter} />}
          {page === "pagina-2" && <PlaceholderPage rotulo="Página 2" />}
          {page === "pagina-3" && <PlaceholderPage rotulo="Página 3" />}
        </div>
      </Layout>

      <ToastContainer />
    </ThemeProvider>
  );
}

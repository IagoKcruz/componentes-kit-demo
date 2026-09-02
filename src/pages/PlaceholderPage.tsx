interface PlaceholderPageProps {
  rotulo: string;
}

/** Conteúdo de exemplo pras páginas que ainda não têm nada de verdade — troque isso pelo
 * conteúdo real do seu projeto. O menu, o rodapé, as configurações e o layout ao redor
 * continuam os mesmos em qualquer página. */
export function PlaceholderPage({ rotulo }: PlaceholderPageProps) {
  return (
    <p className="text-sm text-[var(--ck-cor-texto-suave)]">
      Conteúdo de exemplo da {rotulo} — troque isso pelo conteúdo real do seu projeto. O menu, o
      rodapé, as configurações e o layout ao redor continuam os mesmos em qualquer página.
    </p>
  );
}

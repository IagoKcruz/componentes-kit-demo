import { useState } from "react";
import type { ReactNode } from "react";
import { ComboBox, MaskedInput, NumericInput, TextBox } from "@iagokcruz/componentes-kit";
import { CATEGORY_OPTIONS } from "../data/productOptions";

/** Nome do componente + o componente em si, lado a lado — só pra mostrar cada um funcionando. */
export function ComponentShowcase() {
  const [text, setText] = useState("");
  const [number, setNumber] = useState(42);
  const [masked, setMasked] = useState("");
  const [combo, setCombo] = useState(CATEGORY_OPTIONS[0]!.valor);

  const rows: { name: string; element: ReactNode }[] = [
    { name: "TextBox", element: <TextBox valor={text} aoAlterar={setText} dica="Digite algo" /> },
    { name: "NumericInput", element: <NumericInput valor={number} aoAlterar={setNumber} minimo={0} /> },
    { name: "MaskedInput (CPF)", element: <MaskedInput valor={masked} aoAlterar={setMasked} mascara="999.999.999-99" dica="000.000.000-00" /> },
    { name: "ComboBox", element: <ComboBox valor={combo} aoAlterar={setCombo} opcoes={CATEGORY_OPTIONS} /> },
  ];

  return (
    <div className="mb-6 overflow-hidden rounded-[var(--ck-raio)] border border-[var(--ck-cor-borda)]">
      {rows.map((row, index) => (
        <div
          key={row.name}
          className={`flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:gap-4 ${
            index > 0 ? "border-t border-[var(--ck-cor-borda)]" : ""
          }`}
        >
          <span className="w-40 shrink-0 text-sm font-medium text-[var(--ck-cor-texto)]">{row.name}</span>
          <div className="w-full sm:max-w-xs">{row.element}</div>
        </div>
      ))}
    </div>
  );
}

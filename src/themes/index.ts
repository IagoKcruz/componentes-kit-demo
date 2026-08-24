import type { ThemeOverrides } from "componentes-kit";
import { metalico } from "./metalico";
import { estrutural } from "./estrutural";

export interface ThemeOption {
  id: string;
  label: string;
  /** `undefined` = tema default do componentes-kit (nenhum override). */
  overrides: ThemeOverrides | undefined;
}

export const themeOptions: ThemeOption[] = [
  { id: "default", label: "Padrão", overrides: undefined },
  { id: "metalico", label: "Metálico", overrides: metalico },
  { id: "estrutural", label: "Estrutural", overrides: estrutural },
];

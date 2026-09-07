import { useState, type FormEvent } from "react";

interface Props {
  aoLogar: (email: string, senha: string) => Promise<void>;
  carregando: boolean;
}

export function LoginPage({ aoLogar, carregando }: Props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await aoLogar(email, senha);
  }

  return (
    <div className="flex justify-center pt-12">
      <div className="w-full max-w-sm rounded-lg border border-[var(--ck-cor-borda)] bg-[var(--ck-cor-fundo)] p-8 shadow-sm">
        <h1 className="mb-1 text-xl font-semibold">Entrar</h1>
        <p className="mb-6 text-sm text-[var(--ck-cor-texto-suave)]">componentes-kit — demo</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            E-mail
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded border border-[var(--ck-cor-borda)] bg-[var(--ck-cor-fundo)] px-3 py-2 text-sm font-normal outline-none transition-colors focus:border-[var(--ck-cor-primaria,#3b82f6)]"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Senha
            <input
              type="password"
              required
              autoComplete="current-password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="rounded border border-[var(--ck-cor-borda)] bg-[var(--ck-cor-fundo)] px-3 py-2 text-sm font-normal outline-none transition-colors focus:border-[var(--ck-cor-primaria,#3b82f6)]"
            />
          </label>

          <button
            type="submit"
            disabled={carregando}
            className="mt-2 rounded bg-[var(--ck-cor-primaria,#3b82f6)] px-4 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-60"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";
import logo from "@/assets/fensivo-logo-official-light.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Iniciar sesión — Fensivo 360" },
      {
        name: "description",
        content: "Accede a la consola de Fensivo 360. Pantalla de demostración sin autenticación real.",
      },
      { property: "og:title", content: "Iniciar sesión — Fensivo 360" },
      { property: "og:description", content: "Consola de seguridad continua." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

function Page() {
  const [note, setNote] = useState(false);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setNote(true);
  };

  return (
    <section className="grid min-h-screen lg:grid-cols-[1fr_1.05fr]">
      {/* Panel de acceso */}
      <div className="flex items-center justify-center px-5 py-24 md:px-12">
        <div className="w-full max-w-sm">
          <img src={logo} alt="Fensivo" className="h-7 w-auto" />

          <h1 className="mt-10 font-display text-3xl font-bold tracking-tight">Inicia sesión</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Usa tu correo corporativo para acceder a Fensivo 360.
          </p>

          <form onSubmit={onSubmit} className="mt-9 space-y-4">
            <label className="block text-sm">
              <span className="font-medium text-muted-foreground">Correo corporativo</span>
              <input
                required
                type="email"
                autoComplete="email"
                className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary/70"
                placeholder="nombre@empresa.com"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-muted-foreground">Contraseña</span>
              <input
                required
                type="password"
                autoComplete="current-password"
                className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary/70"
                placeholder="••••••••"
              />
            </label>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Continuar <ArrowRight className="size-4" />
            </button>
          </form>

          <div className="my-7 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> o <span className="h-px flex-1 bg-border" />
          </div>

          <button
            type="button"
            onClick={() => setNote(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold transition-colors hover:border-primary/60"
          >
            <ShieldCheck className="size-4 text-cyan" /> Continuar con SSO
          </button>

          {note ? (
            <p className="mt-5 flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2.5 text-xs text-muted-foreground">
              <Lock className="size-3.5 shrink-0 text-cyan" /> Autenticación deshabilitada en la demo. Abre la consola
              pública.
            </p>
          ) : null}

          <p className="mt-8 text-sm text-muted-foreground">
            ¿Aún no eres cliente?{" "}
            <Link to="/demo" className="font-semibold text-cyan hover:underline">
              Agenda un demo
            </Link>
          </p>
        </div>
      </div>

      {/* Panel visual */}
      <div className="relative hidden overflow-hidden border-l border-border bg-gradient-to-br from-primary/15 via-surface to-background lg:block">
        <div className="absolute inset-0 grid-field opacity-50" />
        <div className="relative flex h-full flex-col justify-center px-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">Fensivo 360</p>
          <p className="mt-6 max-w-md font-display text-4xl font-extrabold leading-[1.1]">
            El riesgo humano, medido y bajo control.
          </p>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            Credenciales expuestas, phishing y entrenamiento contextual en una sola consola.
          </p>
          <ul className="mt-10 grid gap-3 text-sm">
            {["Monitoreo dark web 24/7", "Human Risk Score por persona", "Reportes ejecutivos mensuales"].map((f) => (
              <li key={f} className="flex items-center gap-3">
                <ShieldCheck className="size-4 text-success" /> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

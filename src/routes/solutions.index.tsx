import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, Section } from "@/components/site/primitives";
import { industries, roles, useCases } from "@/lib/site-data";

export const Route = createFileRoute("/solutions/")({
  head: () => ({
    meta: [
      { title: "Soluciones Fensivo — Por caso de uso, industria y rol" },
      {
        name: "description",
        content:
          "Explora las soluciones de Fensivo por caso de uso, industria y rol: vulnerabilidades, amenazas, superficie de ataque, cloud y riesgo.",
      },
      { property: "og:title", content: "Soluciones Fensivo" },
      { property: "og:description", content: "Una plataforma. Visibilidad completa de seguridad." },
    ],
  }),
  component: Page,
});

const groups = [
  { title: "By use case", items: useCases },
  { title: "By industry", items: industries },
  { title: "By role", items: roles },
];

function Page() {
  return (
    <>
      <PageHero
        kicker="Solutions"
        title={<>Una plataforma. Visibilidad completa de seguridad.</>}
        intro="Cada equipo entra a Fensivo por una puerta distinta y llega al mismo modelo de riesgo."
      />
      <Section className="border-t-0">
        <div className="grid gap-10 lg:grid-cols-3">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 100}>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">{g.title}</p>
              <div className="mt-5 space-y-2">
                {g.items.map((it) => (
                  <Link
                    key={it.params!["slug"]!}
                    to="/solutions/$slug"
                    params={{ slug: it.params!["slug"]! }}
                    className="group flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 text-sm transition-colors hover:border-primary/60"
                  >
                    {it.label}
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

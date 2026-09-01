import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { LogoMarquee } from "@/components/site/logo-marquee";
import { Reveal, Section } from "@/components/site/primitives";
import { customers } from "@/lib/site-data";

export const Route = createFileRoute("/customers/")({
  head: () => ({
    meta: [
      { title: "Clientes Fensivo — Retos reales, resultados claros" },
      {
        name: "description",
        content:
          "Casos de estudio de demostración: cómo organizaciones ficticias redujeron riesgo, ruido de alertas y tiempo de auditoría con Fensivo 360.",
      },
      { property: "og:title", content: "Customer stories — Fensivo" },
      { property: "og:description", content: "Real security challenges. Clear outcomes." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        kicker="Customer stories"
        title={<>Real security challenges. Clear outcomes.</>}
        intro="Historias de clientes ficticios creadas para esta demostración de producto."
      />
      <Section className="border-t-0">
        <div className="grid gap-5 md:grid-cols-3">
          {customers.map((c, i) => (
            <Reveal key={c.slug} delay={i * 90}>
              <Link
                to="/customers/$slug"
                params={{ slug: c.slug }}
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-cyan/50"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {c.industry}
                </span>
                <p className="mt-3 font-display text-xl font-bold">{c.name}</p>
                <p className="mt-4 flex-1 text-sm text-muted-foreground">{c.challenge}</p>
                <p className="mt-5 font-display text-3xl font-extrabold text-gradient">{c.result}</p>
                <p className="text-xs text-muted-foreground">{c.resultLabel}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan">
                  Leer caso <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-16">
          <LogoMarquee label="Trusted across modern digital organizations." />
        </div>
      </Section>
    </>
  );
}

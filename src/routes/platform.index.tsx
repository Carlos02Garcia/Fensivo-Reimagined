import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { useI18n } from "@/lib/i18n";
import { Reveal, Section } from "@/components/site/primitives";
import { ArchitectureDiagram } from "@/components/site/architecture";
import { capabilities } from "@/lib/site-data";

export const Route = createFileRoute("/platform/")({
  head: () => ({
    meta: [
      { title: "Plataforma Fensivo — Seguridad continua unificada" },
      {
        name: "description",
        content:
          "Conoce la arquitectura de la plataforma Fensivo: descubrimiento de activos, riesgo, detección y analítica en un solo modelo de datos.",
      },
      { property: "og:title", content: "Plataforma Fensivo — Seguridad continua unificada" },
      { property: "og:description", content: "Un modelo de datos único para todo tu programa de seguridad." },
    ],
  }),
  component: PlatformPage,
});

function PlatformPage() {
  const { t: tr } = useI18n();
  return (
    <>
      <PageHero
        kicker="Platform"
        title={<>Una plataforma, un modelo de riesgo, cero puntos ciegos.</>}
        intro="Fensivo reúne descubrimiento, evaluación, detección y reporte sobre un mismo grafo de activos, para que cada equipo trabaje con la misma versión de la verdad."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/platform/fensivo-360"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Explorar Fensivo 360 <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/demo"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold hover:border-primary/60"
          >
            {tr("nav.requestDemo")}
          </Link>
        </div>
      </PageHero>

      <Section className="border-t-0">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <Reveal key={c.slug} delay={i * 70}>
              <Link
                to="/solutions/$slug"
                params={{ slug: c.slug }}
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-primary/60"
              >
                <p className="font-display text-lg font-semibold">{c.name}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan">
                  Ver capacidad <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Arquitectura de la plataforma</h2>
            <p className="mt-5 text-muted-foreground">
              Conectores agentless, ingesta normalizada y correlación continua. Fensivo actúa como la capa de
              inteligencia entre tus fuentes de datos y las decisiones de seguridad.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ArchitectureDiagram />
          </Reveal>
        </div>
      </Section>
    </>
  );
}

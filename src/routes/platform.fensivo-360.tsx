import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { CountUp, Reveal, Section } from "@/components/site/primitives";
import { ProductTour } from "@/components/site/product-tour";
import { ShotsGallery, type ShotKey } from "@/components/site/shots-gallery";
import { Fensivo360Showcase } from "@/components/site/product-ui";
import { PricingPlans } from "@/components/site/pricing-plans";
import { capabilities } from "@/lib/site-data";


export const Route = createFileRoute("/platform/fensivo-360")({
  head: () => ({
    meta: [
      { title: "Fensivo 360 — Visibilidad, riesgo e inteligencia unificados" },
      {
        name: "description",
        content:
          "Fensivo 360 descubre activos, prioriza vulnerabilidades explotables, detecta amenazas y entrega evidencia continua para el negocio.",
      },
      { property: "og:title", content: "Fensivo 360 — Plataforma de seguridad continua" },
      { property: "og:description", content: "Descubrir, comprender y reducir el riesgo digital desde un solo lugar." },
    ],
  }),
  component: Page,
});

function Page() {
  const [shot, setShot] = useState<ShotKey>("risk");
  return (

    <>
      <PageHero
        kicker="Fensivo 360"
        title={
          <>
            Unified cybersecurity visibility, <span className="text-gradient">risk intelligence</span> y monitoreo de
            amenazas.
          </>
        }
        intro="Una plataforma unificada para descubrir, comprender y reducir el riesgo digital."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/demo"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Launch Product Tour <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold hover:border-primary/60"
          >
            Ver planes
          </Link>
        </div>
      </PageHero>

      <Section className="border-t-0">
        <Reveal>
          <ShotsGallery active={shot} onSelect={setShot} />
        </Reveal>
        <Reveal delay={120} className="mt-8">
          <Fensivo360Showcase tab={shot} onTabChange={setShot} />
        </Reveal>
      </Section>

      <Section>
        <ProductTour />
      </Section>

      <Section id="pricing">
        <Reveal>
          <PricingPlans />
        </Reveal>
      </Section>


      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: 96, prefix: "", suffix: "%", label: "Cobertura de activos tras el despliegue inicial" },
            { v: 12, prefix: "", suffix: " min", label: "Del hallazgo al ticket asignado" },
            { v: 40, prefix: "+", suffix: "", label: "Conectores nativos" },
            { v: 99.9, prefix: "", suffix: "%", decimals: 1, label: "Disponibilidad del servicio" },
          ].map((m, i) => (
            <Reveal key={m.label} delay={i * 80}>
              <div className="rounded-2xl border border-border bg-surface p-7">
                <p className="font-display text-3xl font-extrabold text-gradient">
                  <CountUp value={m.v} prefix={m.prefix} suffix={m.suffix} decimals={m.decimals ?? 0} />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="font-display text-3xl font-bold md:text-4xl">Capacidades incluidas</h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
          {capabilities.map((c) => (
            <Link
              key={c.slug}
              to="/solutions/$slug"
              params={{ slug: c.slug }}
              className="group bg-background p-7 transition-colors hover:bg-surface"
            >
              <p className="font-display text-lg font-semibold">{c.name}</p>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan">
                Detalle <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

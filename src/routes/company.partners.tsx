import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, Section } from "@/components/site/primitives";
import { Wordmark } from "@/components/site/primitives";
import { logos } from "@/lib/site-data";

export const Route = createFileRoute("/company/partners")({
  head: () => ({
    meta: [
      { title: "Partners — Fensivo" },
      {
        name: "description",
        content: "Programa de partners de Fensivo: MSSP, integradores y alianzas tecnológicas con datos de demostración.",
      },
      { property: "og:title", content: "Partners — Fensivo" },
      { property: "og:description", content: "Crece con la plataforma de seguridad continua." },
    ],
  }),
  component: Page,
});

const tiers = [
  ["MSSP", "Opera Fensivo 360 como servicio gestionado multi-tenant con reportes por cliente."],
  ["Integradores", "Despliega, personaliza y conecta Fensivo al stack existente del cliente."],
  ["Tecnología", "Integra tu producto con la API abierta y el grafo de activos de Fensivo."],
];

function Page() {
  return (
    <>
      <PageHero
        kicker="Partners"
        title={<>Crece con la plataforma de seguridad continua.</>}
        intro="Tres formas de trabajar con Fensivo. Todos los nombres mostrados son ficticios."
      />
      <Section className="border-t-0">
        <div className="grid gap-5 md:grid-cols-3">
          {tiers.map(([t, d], i) => (
            <Reveal key={t} delay={i * 80}>
              <div className="h-full rounded-2xl border border-border bg-surface p-7">
                <p className="font-display text-lg font-semibold">{t}</p>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {logos.map((l) => (
            <div key={l} className="grid place-items-center rounded-xl border border-border bg-surface px-4 py-6">
              <Wordmark name={l} />
            </div>
          ))}
        </div>
        <Link
          to="/contact"
          className="mt-12 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          Hablar con el equipo de partners <ArrowRight className="size-4" />
        </Link>
      </Section>
    </>
  );
}

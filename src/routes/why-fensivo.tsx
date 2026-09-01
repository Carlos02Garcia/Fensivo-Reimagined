import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { LogoMarquee } from "@/components/site/logo-marquee";
import { Testimonials } from "@/components/site/testimonials";
import { Reveal, Section } from "@/components/site/primitives";
import { customers } from "@/lib/site-data";

export const Route = createFileRoute("/why-fensivo")({
  head: () => ({
    meta: [
      { title: "Why Fensivo — Confianza, tecnología y resultados medibles" },
      {
        name: "description",
        content:
          "Por qué los equipos de seguridad eligen Fensivo: evidencia continua, integraciones abiertas, resultados medibles y prácticas de seguridad propias.",
      },
      { property: "og:title", content: "Why Fensivo" },
      { property: "og:description", content: "Why security teams choose Fensivo." },
    ],
  }),
  component: Page,
});

const pillars = [
  ["Security & Trust", "Cifrado en tránsito y reposo, SSO/SAML, RBAC granular y registro de auditoría completo."],
  ["Technology", "Grafo de activos propio, correlación en streaming y priorización basada en explotabilidad."],
  ["Integrations", "Cloud, EDR, ticketing, identidad y CI/CD mediante conectores nativos y API abierta."],
  ["Results", "Menos ruido, menos tiempo de remediación y evidencia lista para auditoría."],
];

function Page() {
  return (
    <>
      <PageHero
        kicker="Why Fensivo"
        title={<>Why security teams choose Fensivo.</>}
        intro="No por tener más alertas, sino por convertirlas en menos decisiones y mejores."
      />
      <Section className="border-t-0">
        <div className="grid gap-5 md:grid-cols-2">
          {pillars.map(([t, d], i) => (
            <Reveal key={t} delay={i * 80}>
              <div className="h-full rounded-2xl border border-border bg-surface p-7">
                <p className="font-display text-lg font-semibold">{t}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="font-display text-3xl font-bold md:text-4xl">Customer stories</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {customers.map((c) => (
            <Link
              key={c.slug}
              to="/customers/$slug"
              params={{ slug: c.slug }}
              className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-cyan/50"
            >
              <p className="font-display text-lg font-bold">{c.name}</p>
              <p className="mt-2 text-sm text-muted-foreground">{c.challenge}</p>
              <p className="mt-5 font-display text-2xl font-extrabold text-gradient">{c.result}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan">
                Leer caso <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <Testimonials />
        <div className="mt-14">
          <LogoMarquee label="Trusted across modern digital organizations." />
        </div>
      </Section>
    </>
  );
}

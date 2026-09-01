import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, Section } from "@/components/site/primitives";

export const Route = createFileRoute("/company/")({
  head: () => ({
    meta: [
      { title: "Compañía — Fensivo" },
      {
        name: "description",
        content: "Conoce a Fensivo: misión, liderazgo, carreras, partners y cómo contactarnos.",
      },
      { property: "og:title", content: "Compañía — Fensivo" },
      { property: "og:description", content: "Building a safer digital world." },
    ],
  }),
  component: Page,
});

const links = [
  { to: "/company/about" as const, title: "About Fensivo", desc: "Quiénes somos y cómo trabajamos." },
  { to: "/company/partners" as const, title: "Partners", desc: "Integradores, MSSP y alianzas tecnológicas." },
  { to: "/contact" as const, title: "Contact", desc: "Habla con nuestro equipo comercial o de soporte." },
];

function Page() {
  return (
    <>
      <PageHero
        kicker="Company"
        title={<>Building a <span className="text-gradient">safer digital world.</span></>}
        intro="Fensivo es un proyecto de demostración que reimagina cómo debería sentirse una plataforma de seguridad enterprise."
      />
      <Section className="border-t-0">
        <div className="grid gap-5 md:grid-cols-2">
          {links.map((l, i) => (
            <Reveal key={l.to} delay={i * 80}>
              <Link
                to={l.to}
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-7 transition-all hover:-translate-y-1 hover:border-primary/60"
              >
                <p className="font-display text-lg font-semibold">{l.title}</p>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{l.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan">
                  Ver <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, Section } from "@/components/site/primitives";
import socImg from "@/assets/soc-team.jpg";

export const Route = createFileRoute("/company/about")({
  head: () => ({
    meta: [
      { title: "About Fensivo — Misión y liderazgo" },
      {
        name: "description",
        content: "La misión de Fensivo, su forma de trabajar y el equipo de liderazgo ficticio de esta demostración.",
      },
      { property: "og:title", content: "About Fensivo" },
      { property: "og:description", content: "Misión, principios y liderazgo." },
    ],
  }),
  component: Page,
});

const leadership = [
  ["Laura Cifuentes", "Chief Executive Officer"],
  ["Mateo Aguirre", "Chief Technology Officer"],
  ["Paula Ríos", "Chief Information Security Officer"],
  ["Julián Ortega", "VP of Product"],
];

function Page() {
  return (
    <>
      <PageHero
        kicker="About"
        title={<>Seguridad medible, no seguridad declarada.</>}
        intro="Creemos que un programa de seguridad solo es real cuando puede demostrarse en cualquier momento, con datos."
      />
      <Section className="border-t-0">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="font-display text-2xl font-bold md:text-3xl">Misión</h2>
            <p className="mt-4 text-muted-foreground">
              Darle a cada equipo de seguridad una vista única y honesta de su riesgo digital, y las herramientas para
              reducirlo sin multiplicar herramientas ni personas.
            </p>
            <div className="mt-8 space-y-4">
              {[
                ["Claridad antes que volumen", "Menos alertas, mejores decisiones."],
                ["Evidencia continua", "Todo hallazgo tiene contexto, dueño y trazabilidad."],
                ["Diseño para el operador", "La interfaz debe reducir carga cognitiva, no añadirla."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl border border-border bg-surface p-5">
                  <p className="font-semibold">{t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <img
              src={socImg}
              alt="Equipo de seguridad trabajando en un centro de operaciones"
              loading="lazy"
              width={1600}
              height={1008}
              className="rounded-2xl border border-border object-cover"
            />
          </Reveal>
        </div>
      </Section>

      <Section>
        <h2 className="font-display text-2xl font-bold md:text-3xl">Liderazgo</h2>
        <p className="mt-2 text-sm text-muted-foreground">Perfiles ficticios creados para esta demostración.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map(([name = "", role], i) => (
            <Reveal key={name} delay={i * 70}>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-cyan/20 font-display font-bold text-cyan">
                  {name.split(" ").map((p) => p[0]).join("")}
                </span>
                <p className="mt-4 font-semibold">{name}</p>
                <p className="text-xs text-muted-foreground">{role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { useI18n } from "@/lib/i18n";
import { Reveal, Section } from "@/components/site/primitives";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Precios — Fensivo 360" },
      {
        name: "description",
        content: "Planes de demostración de Fensivo 360: Essentials, Enterprise y Sovereign, con precios ilustrativos.",
      },
      { property: "og:title", content: "Precios — Fensivo 360" },
      { property: "og:description", content: "Planes por cobertura de activos y profundidad de detección." },
    ],
  }),
  component: Page,
});

const plans = [
  {
    name: "Essentials",
    price: "USD 1.200",
    unit: "/ mes",
    desc: "Para equipos que necesitan visibilidad y priorización desde el primer día.",
    features: ["Hasta 500 activos", "Descubrimiento continuo", "Gestión de vulnerabilidades", "Reportes estándar"],
  },
  {
    name: "Enterprise",
    price: "USD 4.500",
    unit: "/ mes",
    desc: "Para programas de seguridad con múltiples unidades de negocio y auditorías frecuentes.",
    featured: true,
    features: [
      "Hasta 5.000 activos",
      "Detección de amenazas 24/7",
      "Modelo de riesgo unificado",
      "SSO/SAML y RBAC",
      "Evidencia continua para auditoría",
    ],
  },
  {
    name: "Sovereign",
    price: "A medida",
    unit: "",
    desc: "Despliegues regulados, requisitos de residencia de datos y equipos SOC dedicados.",
    features: ["Activos ilimitados", "Residencia de datos", "Integraciones a medida", "Arquitecto de seguridad asignado"],
  },
];

function Page() {
  const { t: tr } = useI18n();
  return (
    <>
      <PageHero
        kicker="Pricing"
        title={<>Precios simples por cobertura, no por sorpresa.</>}
        intro="Cifras ilustrativas para esta demostración de producto."
      />
      <Section className="border-t-0">
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 90}>
              <div
                className={`flex h-full flex-col rounded-2xl border p-7 ${
                  p.featured ? "border-primary/60 bg-raised glow-primary" : "border-border bg-surface"
                }`}
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">{p.name}</p>
                <p className="mt-4 font-display text-3xl font-extrabold">
                  {p.price}
                  <span className="text-sm font-medium text-muted-foreground">{p.unit}</span>
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-muted-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-success" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/demo"
                  className={`mt-7 rounded-lg px-5 py-3 text-center text-sm font-semibold ${
                    p.featured
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "border border-border hover:border-primary/60"
                  }`}
                >
                  {tr("nav.requestDemo")}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

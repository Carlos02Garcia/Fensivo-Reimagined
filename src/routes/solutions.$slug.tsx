import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { useI18n } from "@/lib/i18n";
import { Reveal, Section } from "@/components/site/primitives";
import { ProductTour } from "@/components/site/product-tour";
import { solutionCopy } from "@/lib/site-data";

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const copy = solutionCopy[params.slug];
    if (!copy) throw notFound();
    return { copy };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Solución no encontrada — Fensivo" }, { name: "robots", content: "noindex" }] };
    }
    const { title, intro } = loaderData.copy;
    return {
      meta: [
        { title: `${title} — Fensivo` },
        { name: "description", content: intro },
        { property: "og:title", content: `${title} — Fensivo` },
        { property: "og:description", content: intro },
      ],
    };
  },
  component: Page,
});

function Page() {
  const { t: tr } = useI18n();
  const { copy } = Route.useLoaderData();

  return (
    <>
      <PageHero kicker={copy.kicker} title={copy.title} intro={copy.intro}>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/demo"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            {tr("nav.requestDemo")} <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/platform/fensivo-360"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold hover:border-primary/60"
          >
            Explorar Fensivo 360
          </Link>
        </div>
      </PageHero>

      <Section className="border-t-0">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl font-bold md:text-3xl">Qué obtienes</h2>
            <ul className="mt-6 space-y-3">
              {copy.bullets.map((b) => (
                <li key={b} className="flex gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" />
                  <span className="text-muted-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-border bg-surface p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">Cómo funciona</p>
              <ol className="mt-5 space-y-5">
                {[
                  ["Conectar", "Integra cloud, identidad, endpoints y ticketing en minutos."],
                  ["Correlacionar", "Fensivo normaliza y deduplica señales en un grafo único de activos."],
                  ["Priorizar", "El riesgo se calcula con explotabilidad, exposición y criticidad de negocio."],
                  ["Demostrar", "Cada mejora queda registrada como evidencia continua y auditable."],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                    <div>
                      <p className="font-semibold">{t}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <h2 className="font-display text-2xl font-bold md:text-3xl">Verlo dentro de Fensivo 360</h2>
        <div className="mt-8">
          <ProductTour />
        </div>
      </Section>
    </>
  );
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, Section } from "@/components/site/primitives";
import { resourceCategories, resources } from "@/lib/site-data";

export const Route = createFileRoute("/resources/$category")({
  loader: ({ params }) => {
    const category = resourceCategories.find((c) => c.slug === params.category);
    if (!category) throw notFound();
    return { category, items: resources.filter((r) => r.category === category.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Categoría no encontrada — Fensivo" }, { name: "robots", content: "noindex" }] };
    }
    const label = loaderData.category.label;
    return {
      meta: [
        { title: `${label} — Recursos Fensivo` },
        { name: "description", content: `Contenido de ${label} sobre seguridad continua, riesgo y detección de amenazas.` },
        { property: "og:title", content: `${label} — Recursos Fensivo` },
        { property: "og:description", content: `Contenido de ${label} para equipos de seguridad.` },
      ],
    };
  },
  component: Page,
});

function Page() {
  const { category, items } = Route.useLoaderData();

  return (
    <>
      <PageHero kicker="Resources" title={category.label} intro={`${items.length} recurso(s) en esta categoría.`} />
      <Section className="border-t-0">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((r, i) => (
            <Reveal key={r.slug} delay={i * 60}>
              <Link
                to="/resources/article/$slug"
                params={{ slug: r.slug }}
                className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-primary/60"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">{r.topic}</span>
                <p className="mt-3 font-display text-lg font-semibold leading-snug">{r.title}</p>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{r.excerpt}</p>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {r.read}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
        <Link to="/resources" className="mt-10 inline-block text-sm font-semibold text-cyan hover:underline">
          Ver todos los recursos
        </Link>
      </Section>
    </>
  );
}

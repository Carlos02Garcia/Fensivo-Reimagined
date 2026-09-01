import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/primitives";
import { resources } from "@/lib/site-data";

export const Route = createFileRoute("/resources/article/$slug")({
  loader: ({ params }) => {
    const article = resources.find((r) => r.slug === params.slug);
    if (!article) throw notFound();
    return { article, related: resources.filter((r) => r.slug !== params.slug).slice(0, 3) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Recurso no encontrado — Fensivo" }, { name: "robots", content: "noindex" }] };
    }
    const a = loaderData.article;
    return {
      meta: [
        { title: `${a.title} — Fensivo` },
        { name: "description", content: a.excerpt },
        { property: "og:title", content: `${a.title} — Fensivo` },
        { property: "og:description", content: a.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: Page,
});

function Page() {
  const { article, related } = Route.useLoaderData();

  return (
    <>
      <PageHero kicker={`${article.category} · ${article.read}`} title={article.title} intro={article.excerpt} />
      <Section className="border-t-0">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <article className="max-w-2xl space-y-6 text-muted-foreground">
            <p className="text-lg leading-relaxed text-foreground">
              Los programas de seguridad maduros ya no se miden por la cantidad de hallazgos detectados, sino por la
              velocidad con la que convierten señales en decisiones defendibles.
            </p>
            <h2 className="font-display text-xl font-bold text-foreground">El problema del inventario</h2>
            <p className="leading-relaxed">
              La superficie digital cambia cada semana: nuevos servicios, integraciones de terceros, entornos efímeros.
              Cualquier control que dependa de un inventario estático queda desactualizado antes de aplicarse.
            </p>
            <h2 className="font-display text-xl font-bold text-foreground">De la detección a la evidencia</h2>
            <p className="leading-relaxed">
              La verificación continua permite demostrar el estado de un control en cualquier momento, no solo durante
              la ventana de auditoría. Ese cambio de enfoque reduce el trabajo manual y mejora la conversación con el
              negocio.
            </p>
            <h2 className="font-display text-xl font-bold text-foreground">Qué hacer esta semana</h2>
            <ul className="list-disc space-y-2 pl-5 leading-relaxed">
              <li>Definir el criterio de criticidad de activos junto a las áreas de negocio.</li>
              <li>Priorizar hallazgos por explotabilidad observada, no solo por severidad teórica.</li>
              <li>Automatizar la evidencia de los cinco controles que más se revisan en auditoría.</li>
            </ul>
            <p className="rounded-xl border border-border bg-surface p-5 text-sm">
              Contenido de demostración escrito para este portafolio; no constituye asesoría de seguridad.
            </p>
          </article>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <p className="font-display font-semibold">Ver Fensivo 360</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Explora la plataforma con datos de ejemplo, sin instalar nada.
              </p>
              <Link
                to="/demo"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan hover:underline"
              >
                Abrir demo <ArrowRight className="size-4" />
              </Link>
            </div>
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/resources/article/$slug"
                params={{ slug: r.slug }}
                className="block rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-primary/60"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan">{r.topic}</span>
                <p className="mt-2 text-sm font-semibold leading-snug">{r.title}</p>
              </Link>
            ))}
          </aside>
        </div>
      </Section>
    </>
  );
}

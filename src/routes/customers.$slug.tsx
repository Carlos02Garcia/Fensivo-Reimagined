import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { useI18n } from "@/lib/i18n";
import { Reveal, Section } from "@/components/site/primitives";
import { customers } from "@/lib/site-data";

export const Route = createFileRoute("/customers/$slug")({
  loader: ({ params }) => {
    const customer = customers.find((c) => c.slug === params.slug);
    if (!customer) throw notFound();
    return { customer };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Caso no encontrado — Fensivo" }, { name: "robots", content: "noindex" }] };
    }
    const c = loaderData.customer;
    return {
      meta: [
        { title: `${c.name} — Caso de estudio Fensivo` },
        { name: "description", content: `${c.challenge} ${c.solution}` },
        { property: "og:title", content: `${c.name} — Caso de estudio Fensivo` },
        { property: "og:description", content: c.solution },
      ],
    };
  },
  component: Page,
});

function Page() {
  const { t: tr } = useI18n();
  const { customer: c } = Route.useLoaderData();

  return (
    <>
      <PageHero kicker={c.industry} title={c.name} intro={c.challenge}>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {c.stats.map((s) => (
            <div key={s.v} className="rounded-2xl border border-border bg-surface p-5">
              <p className="font-display text-2xl font-bold text-cyan">{s.k}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.v}</p>
            </div>
          ))}
        </div>
      </PageHero>

      <Section className="border-t-0">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="space-y-8">
              {[
                ["Challenge", c.challenge],
                ["Solution", c.solution],
                ["Result", `${c.result} ${c.resultLabel}`],
              ].map(([t, d]) => (
                <div key={t}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">{t}</p>
                  <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{d}</p>
                </div>
              ))}
              <div className="rounded-2xl border border-border bg-surface p-7">
                <p className="font-display text-xl leading-relaxed">“{c.quote}”</p>
                <p className="mt-5 text-sm font-semibold">{c.person}</p>
                <p className="text-xs text-muted-foreground">
                  {c.role} · {c.name}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="sticky top-24 rounded-2xl border border-border bg-surface p-7">
              <p className="font-display text-lg font-semibold">¿Un reto similar?</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Agenda una sesión y mapeamos tu superficie de ataque en 30 minutos.
              </p>
              <Link
                to="/demo"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                {tr("nav.requestDemo")} <ArrowRight className="size-4" />
              </Link>
              <p className="mt-6 text-xs text-muted-foreground">
                Cliente y métricas ficticios, creados para esta demostración.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Otros casos</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {customers
            .filter((x) => x.slug !== c.slug)
            .map((x) => (
              <Link
                key={x.slug}
                to="/customers/$slug"
                params={{ slug: x.slug }}
                className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-cyan/50"
              >
                <p className="font-display text-lg font-bold">{x.name}</p>
                <p className="mt-2 text-sm text-muted-foreground">{x.challenge}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan">
                  Leer caso <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
        </div>
      </Section>
    </>
  );
}

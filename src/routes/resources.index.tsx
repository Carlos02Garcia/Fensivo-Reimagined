import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, Section } from "@/components/site/primitives";
import { resourceCategories, resourceTopics, resources } from "@/lib/site-data";

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: "Recursos de ciberseguridad — Fensivo" },
      {
        name: "description",
        content:
          "Investigación, guías, casos de estudio y webinars sobre gestión de vulnerabilidades, superficie de ataque, detección de amenazas y riesgo.",
      },
      { property: "og:title", content: "Recursos de ciberseguridad — Fensivo" },
      { property: "og:description", content: "Contenido práctico para equipos de seguridad modernos." },
    ],
  }),
  component: Page,
});

function Page() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [topic, setTopic] = useState("all");

  const featured = resources.find((r) => r.featured)!;
  const list = useMemo(
    () =>
      resources.filter((r) => {
        const matchQ =
          !q ||
          r.title.toLowerCase().includes(q.toLowerCase()) ||
          r.excerpt.toLowerCase().includes(q.toLowerCase());
        return matchQ && (cat === "all" || r.category === cat) && (topic === "all" || r.topic === topic);
      }),
    [q, cat, topic],
  );

  return (
    <>
      <PageHero
        kicker="Resources"
        title={<>Inteligencia de seguridad, en formato utilizable.</>}
        intro="Research, guías, casos y sesiones en vivo creadas con datos sintéticos para esta demostración."
      />

      <Section className="border-t-0">
        <Reveal>
          <Link
            to="/resources/article/$slug"
            params={{ slug: featured.slug }}
            className="group grid overflow-hidden rounded-3xl border border-border bg-surface md:grid-cols-[1.3fr_1fr]"
          >
            <div className="p-8 md:p-12">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">Featured</span>
              <h2 className="mt-4 font-display text-2xl font-bold md:text-4xl">{featured.title}</h2>
              <p className="mt-4 max-w-xl text-muted-foreground">{featured.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan">
                Read article <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
            <div className="relative min-h-40 grid-field border-t border-border md:border-l md:border-t-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-transparent" />
            </div>
          </Link>
        </Reveal>

        <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar recursos"
              aria-label="Buscar recursos"
              className="w-full rounded-lg border border-border bg-surface py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary/60"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {[{ slug: "all", label: "Todos" }, ...resourceCategories].map((c) => (
              <button
                key={c.slug}
                onClick={() => setCat(c.slug)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  cat === c.slug
                    ? "border-primary bg-primary/15 text-foreground"
                    : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {["all", ...resourceTopics].map((t) => (
            <button
              key={t}
              onClick={() => setTopic(t)}
              className={`rounded-md border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                topic === t
                  ? "border-cyan/60 bg-cyan/10 text-cyan"
                  : "border-border/70 text-muted-foreground hover:border-cyan/40"
              }`}
            >
              {t === "all" ? "todos los temas" : t}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((r, i) => (
            <Reveal key={r.slug} delay={i * 50}>
              <Link
                to="/resources/article/$slug"
                params={{ slug: r.slug }}
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-primary/60"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">{r.topic}</span>
                <p className="mt-3 font-display text-lg font-semibold leading-snug">{r.title}</p>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{r.excerpt}</p>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {r.category} · {r.read}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
        {list.length === 0 ? (
          <p className="mt-10 text-sm text-muted-foreground">No hay recursos que coincidan con esos filtros.</p>
        ) : null}
      </Section>
    </>
  );
}

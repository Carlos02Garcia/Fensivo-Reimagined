import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Linkedin } from "lucide-react";
import logo from "@/assets/fensivo-logo-official-light.png";
import { useI18n } from "@/lib/i18n";

type Col = { title: string; links: { label: string; to: string; params?: Record<string, string> }[] };

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { t } = useI18n();

  const columns: Col[] = [
    {
      title: t("footer.platform"),
      links: [
        { label: "Fensivo 360", to: "/platform/fensivo-360" },
        { label: t("footer.platformOverview"), to: "/platform" },
        { label: t("footer.productTour"), to: "/demo" },
        { label: t("nav.pricing"), to: "/pricing" },
      ],
    },
    {
      title: t("footer.solutions"),
      links: [
        { label: "Monitoreo de credenciales", to: "/solutions/$slug", params: { slug: "credential-monitoring" } },
        { label: "Simulación de phishing", to: "/solutions/$slug", params: { slug: "phishing-simulation" } },
        { label: "Capacitación contextual", to: "/solutions/$slug", params: { slug: "security-awareness" } },
        { label: "Risk score individual", to: "/solutions/$slug", params: { slug: "human-risk-score" } },
        { label: t("footer.allSolutions"), to: "/solutions" },
      ],
    },
    {
      title: t("footer.resources"),
      links: [
        { label: t("nav.blog"), to: "/resources/$category", params: { category: "blog" } },
        { label: t("nav.research"), to: "/resources/$category", params: { category: "research" } },
        { label: t("nav.guides"), to: "/resources/$category", params: { category: "guides" } },
        { label: t("nav.caseStudies"), to: "/resources/$category", params: { category: "case-studies" } },
        { label: t("nav.webinars"), to: "/resources/$category", params: { category: "webinars" } },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { label: t("nav.about"), to: "/company/about" },
        { label: t("nav.partners"), to: "/company/partners" },
        { label: t("nav.customerStories"), to: "/customers" },
        { label: t("nav.whyFensivo"), to: "/why-fensivo" },
      ],
    },
    {
      title: t("footer.contact"),
      links: [
        { label: t("footer.requestDemo"), to: "/demo" },
        { label: t("nav.contact"), to: "/contact" },
        { label: t("nav.login"), to: "/login" },
      ],
    },
  ];


  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2.6fr]">
          <div>
            <Link
              to="/"
              aria-label="Fensivo"
              className="flex shrink-0 items-center px-2 py-2 transition-transform hover:scale-[1.02]"
            >
              <img src={logo} alt="Fensivo" className="h-6 w-auto md:h-7" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{t("footer.tagline")}</p>

            <div className="mt-6">
              <p className="text-sm font-semibold">{t("footer.newsletter")}</p>
              <form
                className="mt-3 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setSent(true);
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer.workEmail")}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
                />
                <button className="shrink-0 rounded-md bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                  {t("footer.subscribe")}
                </button>
              </form>
              {sent ? (
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-success">
                  <Check className="size-3.5" /> {t("footer.subscribed")}
                </p>
              ) : null}
            </div>

            <div className="mt-6 flex gap-2">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
              >
                <Linkedin className="size-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="grid size-9 place-items-center rounded-md border border-border font-display text-sm font-bold text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
              >
                X
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{col.title}</p>
                <ul className="mt-3 space-y-2">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        params={l.params as never}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border/70 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {t("footer.rights")}</p>
          <p className="font-mono uppercase tracking-[0.16em]">{t("footer.strap")}</p>
        </div>
      </div>
    </footer>
  );
}

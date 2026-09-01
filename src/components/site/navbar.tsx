import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  Menu,
  PlayCircle,
  Shield,
  X,
} from "lucide-react";
import logo from "@/assets/fensivo-logo-official-light.png";
import { capabilities, industries, roles, useCases } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/site/language-switcher";

type MenuKey = "platform" | "solutions" | "resources";

const menus: { key: MenuKey; labelKey: string }[] = [
  { key: "platform", labelKey: "nav.product" },
  { key: "solutions", labelKey: "nav.solutions" },
  { key: "resources", labelKey: "nav.resources" },
];


function MenuLink({
  to,
  params,
  label,
  desc,
  onClick,
}: {
  to: string;
  params?: Record<string, string> | undefined;
  label: string;
  desc?: string | undefined;
  onClick?: (() => void) | undefined;
}) {
  return (
    <Link
      to={to}
      params={params as never}
      onClick={onClick}
      className="group block rounded-lg px-3 py-2 transition-colors hover:bg-raised"
    >
      <span className="flex items-center justify-between gap-3 text-sm font-medium text-foreground">
        {label}
        <ArrowRight className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-70" />
      </span>
      {desc ? <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{desc}</span> : null}
    </Link>
  );
}

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{children}</p>
  );
}

function MiniDashboard() {
  const { t } = useI18n();
  return (
    <div className="rounded-xl border border-border bg-background/70 p-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{t("nav.riskScore")}</p>
        <span className="font-mono text-[10px] text-success">-12 pts</span>
      </div>
      <p className="mt-1 font-display text-3xl font-bold text-foreground">42</p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
        <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-primary to-cyan" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[
          ["164", t("nav.findings")],
          ["2.830", t("nav.assets")],
          ["4", t("nav.threats")],
        ].map(([v, l]) => (
          <div key={l} className="rounded-lg border border-border/70 bg-surface py-2">
            <p className="font-display text-sm font-semibold">{v}</p>
            <p className="text-[10px] text-muted-foreground">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlatformMenu({ close }: { close: () => void }) {
  const { t } = useI18n();
  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr_0.95fr]">
      <div className="rounded-xl border border-primary/25 bg-gradient-to-br from-primary/12 via-surface to-surface p-5">
        <div className="flex items-center gap-2 text-cyan">
          <Shield className="size-4" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{t("nav.flagship")}</span>
        </div>
        <h3 className="mt-3 font-display text-xl font-bold">Fensivo 360</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("nav.flagshipDesc")}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to="/platform/fensivo-360"
            onClick={close}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t("nav.explore360")} <ArrowRight className="size-3.5" />
          </Link>
          <Link
            to="/demo"
            onClick={close}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-semibold transition-colors hover:border-primary/60"
          >
            <PlayCircle className="size-3.5" /> {t("nav.launchTour")}
          </Link>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">{t("nav.watch360")}</p>
      </div>

      <div>
        <ColumnTitle>{t("nav.capabilities")}</ColumnTitle>
        <div className="grid">
          {capabilities.map((c) => (
            <MenuLink key={c.slug} to="/solutions/$slug" params={{ slug: c.slug }} label={c.name} onClick={close} />
          ))}
          <MenuLink to="/platform" label={t("nav.reports")} onClick={close} />
        </div>
      </div>

      <MiniDashboard />
    </div>
  );
}

function SolutionsMenu({ close }: { close: () => void }) {
  const { t } = useI18n();
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr_1.05fr]">
      <div>
        <ColumnTitle>{t("nav.byUseCase")}</ColumnTitle>
        {useCases.map((l) => (
          <MenuLink key={l.label} to={l.to} params={l.params} label={l.label} onClick={close} />
        ))}
      </div>
      <div>
        <ColumnTitle>{t("nav.byIndustry")}</ColumnTitle>
        {industries.map((l) => (
          <MenuLink key={l.label} to={l.to} params={l.params} label={l.label} onClick={close} />
        ))}
      </div>
      <div>
        <ColumnTitle>{t("nav.byRole")}</ColumnTitle>
        {roles.map((l) => (
          <MenuLink key={l.label} to={l.to} params={l.params} label={l.label} onClick={close} />
        ))}
      </div>
      <div className="rounded-xl border border-border bg-gradient-to-br from-surface to-background p-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">Fensivo 360</span>
        <h3 className="mt-3 font-display text-lg font-bold">{t("nav.onePlatform")}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{t("nav.onePlatformDesc")}</p>
        <Link
          to="/platform"
          onClick={close}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan hover:underline"
        >
          {t("nav.explorePlatform")} <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}


function ResourcesMenu({ close }: { close: () => void }) {
  const { t } = useI18n();
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1.15fr]">
      <div>
        <ColumnTitle>{t("nav.learn")}</ColumnTitle>
        <MenuLink to="/resources/$category" params={{ category: "blog" }} label={t("nav.blog")} onClick={close} />
        <MenuLink to="/resources/$category" params={{ category: "research" }} label={t("nav.research")} onClick={close} />
        <MenuLink to="/resources/$category" params={{ category: "guides" }} label={t("nav.guides")} onClick={close} />
        <MenuLink
          to="/resources/$category"
          params={{ category: "case-studies" }}
          label={t("nav.caseStudies")}
          onClick={close}
        />
      </div>
      <div>
        <ColumnTitle>{t("nav.mediaDocs")}</ColumnTitle>
        <MenuLink to="/resources/$category" params={{ category: "webinars" }} label={t("nav.webinars")} onClick={close} />
        <MenuLink to="/resources" label={t("nav.videos")} onClick={close} />
        <MenuLink to="/resources" label={t("nav.productDocs")} onClick={close} />
        <MenuLink to="/resources" label={t("nav.apiDocs")} onClick={close} />
        <MenuLink to="/demo" label={t("nav.demo360")} onClick={close} />
      </div>
      <div className="rounded-xl border border-cyan/25 bg-gradient-to-br from-cyan/10 via-surface to-surface p-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">{t("nav.featured")}</span>
        <h3 className="mt-3 font-display text-lg font-bold">{t("nav.featuredTitle")}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{t("nav.featuredDesc")}</p>
        <Link
          to="/resources/$category"
          params={{ category: "research" }}
          onClick={close}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan hover:underline"
        >
          {t("nav.readArticle")} <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}


const panels: Record<MenuKey, (p: { close: () => void }) => React.ReactElement> = {
  platform: PlatformMenu,
  solutions: SolutionsMenu,
  resources: ResourcesMenu,
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mobile, setMobile] = useState(false);
  const [acc, setAcc] = useState<MenuKey | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);

  const Panel = open ? panels[open] : null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open ? "border-b border-border/60 backdrop-blur-xl" : "border-b border-border/20 backdrop-blur-md",
      )}
      style={{
        background:
          scrolled || open
            ? "linear-gradient(to right, color-mix(in oklab, var(--color-primary) 14%, transparent), color-mix(in oklab, var(--color-background) 72%, transparent) 38%, color-mix(in oklab, var(--color-signal) 12%, transparent) 78%, color-mix(in oklab, var(--color-cyan) 12%, transparent))"
            : "radial-gradient(ellipse 120% 100% at 50% 0%, color-mix(in oklab, var(--color-primary) 16%, transparent) 0%, transparent 55%), linear-gradient(to bottom, color-mix(in oklab, var(--color-background) 78%, transparent) 0%, color-mix(in oklab, var(--color-primary) 8%, transparent) 32%, color-mix(in oklab, var(--color-signal) 6%, transparent) 66%, color-mix(in oklab, var(--color-cyan) 7%, transparent) 100%)",
      }}
      onMouseLeave={() => setOpen(null)}
    >
      <div className="mx-auto flex h-[4.5rem] w-full max-w-7xl items-center justify-between gap-3 px-5 md:px-8">
        <Link
          to="/"
          aria-label="Fensivo"
          className="flex shrink-0 items-center px-2 py-2 transition-transform hover:scale-[1.02]"
        >
          <img src={logo} alt="Fensivo" className="h-6 w-auto md:h-7" />
        </Link>


        <nav className="hidden items-center gap-0.5 lg:flex">
          {menus.map((m) => (
            <button
              key={m.key}
              onMouseEnter={() => setOpen(m.key)}
              onClick={() => setOpen((o) => (o === m.key ? null : m.key))}
              className={cn(
                "flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                open === m.key ? "bg-raised text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t(m.labelKey)}
              <ChevronDown className={cn("size-3.5 transition-transform", open === m.key && "rotate-180")} />
            </button>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <LanguageSwitcher />
          <Link
            to="/login"
            className="whitespace-nowrap px-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("nav.login")}
          </Link>
          <Link
            to="/demo"
            className="whitespace-nowrap rounded-full bg-primary px-5 py-2.5 text-sm font-semibold leading-none text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
          >
            {t("nav.requestDemo")}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <Link
            to="/demo"
            className="hidden whitespace-nowrap rounded-full bg-primary px-4 py-2 text-sm font-semibold leading-none text-primary-foreground sm:inline-flex"
          >
            {t("nav.requestDemo")}
          </Link>
          <button
            aria-label={t("nav.openNav")}
            onClick={() => setMobile((v) => !v)}
            className="grid size-9 place-items-center rounded-md border border-border"
          >
            {mobile ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {Panel ? (
        <div
          className="hidden border-t border-border/60 backdrop-blur-xl lg:block"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in oklab, var(--color-background) 82%, transparent), color-mix(in oklab, var(--color-primary) 8%, transparent))",
          }}
        >
          <div className="mx-auto w-full max-w-7xl px-5 py-7 md:px-8">
            <div className="rise-in">
              <Panel close={() => setOpen(null)} />
            </div>
          </div>
        </div>
      ) : null}

      {mobile ? (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background px-5 py-4 lg:hidden">
          {menus.map((m) => {
            const P = panels[m.key];
            return (
              <div key={m.key} className="border-b border-border/60">
                <button
                  onClick={() => setAcc((a) => (a === m.key ? null : m.key))}
                  className="flex w-full items-center justify-between py-3 text-sm font-semibold"
                >
                  {t(m.labelKey)}
                  <ChevronDown className={cn("size-4 transition-transform", acc === m.key && "rotate-180")} />
                </button>
                {acc === m.key ? (
                  <div className="pb-4">
                    <P close={() => setMobile(false)} />
                  </div>
                ) : null}
              </div>
            );
          })}
          <Link to="/pricing" className="block border-b border-border/60 py-3 text-sm font-semibold">
            {t("nav.pricing")}
          </Link>
          <div className="mt-4 flex flex-col gap-2">
            <Link to="/login" className="rounded-md border border-border px-4 py-2.5 text-center text-sm font-semibold">
              {t("nav.login")}
            </Link>
            <Link
              to="/demo"
              className="rounded-md bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
            >
              {t("nav.requestDemo")}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

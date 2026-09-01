import { Check, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

/** Copys mínimos multi-idioma (fallback español). */
const dict = {
  es: {
    kicker: "Precios",
    title: "Precios transparentes, sin sorpresas",
    sub: "Fensivo cobra por empleado al mes. Mínimo 25 empleados para que el puntaje de riesgo sea estadísticamente válido.",
    perEmp: "/empleado/mes",
    annual: "Pago anual anticipado: 20% de descuento",
    plan360: "Fensivo 360",
    plan360Sub: "Plataforma completa de riesgo humano",
    shot: "Simulacro One-Shot",
    shotSub: "Campaña única, sin suscripción",
    from: "desde",
    cta: "Agenda un demo",
    ctaSales: "Hablar con ventas",
    custom: "A la medida",
    tiers: "Tarifa por volumen",
    t1: "25 – 100 empleados",
    t2: "101 – 250 empleados",
    t3: "251 – 499 empleados",
    t4: "500+ empleados",
    f360: [
      "Monitoreo dark web 24/7 (680+ fuentes)",
      "Hasta 3 simulacros por empleado al mes",
      "Microlearning contextual inmediato",
      "Dashboard CISO y risk scores por persona",
      "Reportes ejecutivos mensuales",
    ],
    fshot: [
      "1 campaña de phishing personalizada",
      "Duración de 2 a 3 semanas",
      "Reporte único con snapshot de riesgo",
      "Crédito del 50% hacia Fensivo 360 anual (90 días)",
    ],
    note: "Operativo en 1 día · Soporte español e inglés",
  },
  en: {
    kicker: "Pricing",
    title: "Transparent pricing, no surprises",
    sub: "Fensivo is billed per employee per month. Minimum 25 employees so the risk score stays statistically valid.",
    perEmp: "/employee/month",
    annual: "Prepaid annual billing: 20% off",
    plan360: "Fensivo 360",
    plan360Sub: "Full human risk platform",
    shot: "One-Shot simulation",
    shotSub: "Single campaign, no subscription",
    from: "from",
    cta: "Book a demo",
    ctaSales: "Talk to sales",
    custom: "Custom",
    tiers: "Volume pricing",
    t1: "25 – 100 employees",
    t2: "101 – 250 employees",
    t3: "251 – 499 employees",
    t4: "500+ employees",
    f360: [
      "24/7 dark web monitoring (680+ sources)",
      "Up to 3 simulations per employee per month",
      "Immediate contextual microlearning",
      "CISO dashboard and per-person risk scores",
      "Monthly executive reports",
    ],
    fshot: [
      "1 tailored phishing campaign",
      "2 to 3 weeks duration",
      "Single report with risk snapshot",
      "50% credit toward annual Fensivo 360 (90 days)",
    ],
    note: "Live in 1 day · Spanish and English support",
  },
};

export function PricingPlans() {
  const { lang } = useI18n();
  const c = (dict as Record<string, typeof dict.es>)[lang as string] ?? dict.es;

  const tiers = [
    [c.t1, "$4.90"],
    [c.t2, "$4.20"],
    [c.t3, "$3.90"],
    [c.t4, c.custom],
  ];

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">{c.kicker}</p>
      <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.1] md:text-5xl">{c.title}</h2>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{c.sub}</p>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl border border-primary/50 bg-gradient-to-b from-primary/10 via-surface to-background p-8 md:p-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <p className="font-display text-2xl font-bold">{c.plan360}</p>
              <p className="mt-1 text-sm text-muted-foreground">{c.plan360Sub}</p>
            </div>
            <p className="font-display text-4xl font-extrabold text-gradient">
              <span className="mr-1 align-middle font-sans text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {c.from}
              </span>
              $4.90
              <span className="ml-1 text-sm font-medium text-muted-foreground">{c.perEmp}</span>
            </p>
          </div>

          <ul className="mt-7 grid gap-3">
            {c.f360.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-success" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-border bg-background/60 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{c.tiers}</p>
            <ul className="mt-3 grid gap-2">
              {tiers.map(([k, v], i) => (
                <li
                  key={k}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm",
                    i === 0 ? "bg-primary/10 font-semibold" : "text-muted-foreground",
                  )}
                >
                  <span>{k}</span>
                  <span className="font-display font-bold tabular-nums text-foreground">{v}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-success">{c.annual}</p>
          </div>

          <Link
            to="/demo"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {c.cta} <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-8 md:p-10">
          <p className="font-display text-2xl font-bold">{c.shot}</p>
          <p className="mt-1 text-sm text-muted-foreground">{c.shotSub}</p>
          <p className="mt-6 font-display text-4xl font-extrabold">
            <span className="mr-1 align-middle font-sans text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {c.from}
            </span>
            $750
          </p>
          <ul className="mt-7 grid gap-3">
            {c.fshot.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-cyan" />
                {f}
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-primary/60"
          >
            {c.ctaSales}
          </Link>
          <p className="mt-6 text-xs text-muted-foreground">{c.note}</p>
        </div>
      </div>
    </div>
  );
}

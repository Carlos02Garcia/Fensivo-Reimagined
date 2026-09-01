import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  Boxes,
  Gauge,
  LayoutDashboard,
  Plug,
  Settings,
  ShieldAlert,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SeverityTag, Section } from "@/components/site/primitives";
import { ContactForm } from "@/components/site/contact-form";
import { tourAssets, tourThreats, tourVulnerabilities, trendData } from "@/lib/site-data";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Demo interactiva de Fensivo 360" },
      {
        name: "description",
        content:
          "Recorre la consola de Fensivo 360 con datos sintéticos: dashboard, activos, vulnerabilidades, amenazas, riesgo y reportes.",
      },
      { property: "og:title", content: "Demo interactiva de Fensivo 360" },
      { property: "og:description", content: "Explora la consola de seguridad continua con datos de ejemplo." },
    ],
  }),
  component: Page,
});

const navItems = [
  { id: "dashboard", key: "demo.dashboard", Icon: LayoutDashboard },
  { id: "assets", key: "tour.assets", Icon: Boxes },
  { id: "vulnerabilities", key: "tour.vulnerabilities", Icon: ShieldAlert },
  { id: "threats", key: "tour.threats", Icon: Activity },
  { id: "risk", key: "demo.risk", Icon: Gauge },
  { id: "reports", key: "tour.reports", Icon: BarChart3 },
  { id: "integrations", key: "demo.integrations", Icon: Plug },
  { id: "settings", key: "demo.settings", Icon: Settings },
] as const;

type SectionId = (typeof navItems)[number]["id"];

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-border bg-background/60 p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function TrendChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={trendData} margin={{ left: -20, right: 8, top: 8 }}>
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.5} />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 12,
              fontSize: 12,
            }}
          />
          <Area type="monotone" dataKey="riesgo" stroke="var(--color-primary)" fill="url(#g)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function Panel({ section }: { section: SectionId }) {
  const { t: tr } = useI18n();

  if (section === "assets") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {tourAssets.map((a) => (
          <div key={a.group} className="rounded-xl border border-border bg-background/60 p-5">
            <p className="font-display text-lg font-semibold">{a.group}</p>
            <p className="mt-1 text-xs text-muted-foreground">{a.note}</p>
            <p className="mt-4 font-display text-3xl font-bold text-cyan">{a.count}</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
              <div className="h-full rounded-full bg-primary" style={{ width: `${a.coverage}%` }} />
            </div>
            <p className="mt-1.5 text-[11px] text-muted-foreground">
              {a.coverage}% {tr("tour.coverage")}
            </p>
          </div>
        ))}
      </div>
    );
  }

  if (section === "vulnerabilities") {
    return (
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-background/60 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <tr>
              {["ID", tr("tour.severity"), tr("tour.asset"), "CVE", tr("tour.risk"), tr("tour.status")].map((h) => (
                <th key={h} className="px-4 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tourVulnerabilities.map((v) => (
              <tr key={v.id} className="border-t border-border/70 hover:bg-background/50">
                <td className="px-4 py-3 font-mono text-xs">{v.id}</td>
                <td className="px-4 py-3"><SeverityTag level={v.severity} /></td>
                <td className="px-4 py-3 font-mono text-xs">{v.asset}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{v.cve}</td>
                <td className="px-4 py-3 font-semibold">{v.risk}</td>
                <td className="px-4 py-3 text-muted-foreground">{v.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (section === "threats") {
    return (
      <div className="space-y-3">
        {tourThreats.map((t) => (
          <div
            key={t.id}
            className="flex flex-col gap-2 rounded-xl border border-border bg-background/60 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <div className="flex items-center gap-3">
                <SeverityTag level={t.severity} />
                <p className="font-semibold">{t.threat}</p>
              </div>
              <p className="mt-1.5 font-mono text-[11px] text-muted-foreground">
                {t.source} · {t.time}
              </p>
            </div>
            <span className="self-start rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground">
              {t.action}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (section === "risk") {
    return (
      <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <div className="rounded-xl border border-border bg-background/60 p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{tr("tour.riskScore")}</p>
          <p className="mt-3 font-display text-6xl font-extrabold text-gradient">42</p>
          <p className="mt-2 text-sm text-muted-foreground">{tr("demo.riskBig")}</p>
        </div>
        <div className="rounded-xl border border-border bg-background/60 p-6">
          <TrendChart />
        </div>
      </div>
    );
  }

  if (section === "reports") {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-border bg-background/60 p-6">
          <p className="font-display font-semibold">{tr("demo.postureTitle")}</p>
          <TrendChart />
        </div>
        <div className="rounded-xl border border-border bg-background/60 p-6 text-sm text-muted-foreground">
          <p className="font-display text-base font-semibold text-foreground">{tr("demo.execTitle")}</p>
          <p className="mt-3">{tr("demo.execBody")}</p>
        </div>
      </div>
    );
  }

  if (section === "integrations") {
    const connected = tr("demo.connected");
    const pending = tr("demo.pending");
    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ["Cloud provider", connected],
          ["EDR", connected],
          ["Identidad / SSO", connected],
          ["Ticketing", connected],
          ["CI/CD", pending],
          ["SIEM", pending],
        ].map(([n, s]) => (
          <div key={n} className="flex items-center justify-between rounded-xl border border-border bg-background/60 p-5">
            <p className="text-sm font-medium">{n}</p>
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.14em] ${
                s === connected ? "text-success" : "text-warning"
              }`}
            >
              {s}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (section === "settings") {
    return (
      <div className="space-y-3">
        {[
          ["SSO / SAML", tr("demo.s1")],
          [tr("demo.s2"), tr("demo.s2d")],
          [tr("demo.s3"), "24 meses"],
          [tr("demo.s4"), tr("demo.s4d")],
        ].map(([n, d]) => (
          <div key={n} className="rounded-xl border border-border bg-background/60 p-5">
            <p className="text-sm font-medium">{n}</p>
            <p className="mt-1 text-xs text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label={tr("tour.riskScore")} value="42" hint={tr("demo.riskHintMonth")} />
        <Stat label={tr("demo.alerts")} value="18" hint={tr("demo.alertsHint")} />
        <Stat label={tr("demo.vulns")} value="164" hint={tr("demo.critHint")} />
        <Stat label={tr("tour.protectedAssets")} value="2.830" hint={tr("tour.coverageHint")} />
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-xl border border-border bg-background/60 p-6">
          <p className="font-display font-semibold">{tr("demo.trend")}</p>
          <TrendChart />
        </div>
        <div className="rounded-xl border border-border bg-background/60 p-6">
          <p className="font-display font-semibold">{tr("tour.activity")}</p>
          <ul className="mt-4 space-y-4 text-sm">
            {tourThreats.map((t) => (
              <li key={t.id} className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cyan" />
                <div>
                  <p className="leading-snug">{t.threat}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {t.time} · {t.action}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Page() {
  const { t: tr } = useI18n();
  const [section, setSection] = useState<SectionId>("dashboard");
  const active = navItems.find((n) => n.id === section)!;

  return (
    <>
      <Section className="border-t-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">Fensivo 360 · {tr("demo.tag")}</p>
        <h1 className="mt-4 font-display text-3xl font-extrabold md:text-4xl">{tr("demo.h1")}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{tr("demo.sub")}</p>

        <div className="mt-10 grid gap-4 lg:grid-cols-[220px_1fr]">
          <nav className="flex gap-2 overflow-x-auto rounded-2xl border border-border bg-surface p-2 lg:flex-col lg:overflow-visible">
            {navItems.map((n) => (
              <button
                key={n.id}
                onClick={() => setSection(n.id)}
                className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  section === n.id ? "bg-primary/15 text-foreground" : "text-muted-foreground hover:bg-raised"
                }`}
              >
                <n.Icon className="size-4" />
                {tr(n.key)}
              </button>
            ))}
          </nav>

          <div className="rounded-2xl border border-border bg-surface p-5 md:p-7">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-display text-lg font-semibold">{tr(active.key)}</p>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-success">● {tr("demo.live")}</span>
            </div>
            <Panel section={section} />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <h2 className="font-display text-2xl font-bold md:text-3xl">{tr("demo.cta")}</h2>
            <p className="mt-3 text-muted-foreground">{tr("demo.ctaBody")}</p>
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}

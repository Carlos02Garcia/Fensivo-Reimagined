import { useState } from "react";
import { Activity, ArrowRight, Cloud, Server, Laptop, Boxes, ShieldCheck, X } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { tourAssets, tourThreats, tourVulnerabilities, trendData } from "@/lib/site-data";
import { SeverityTag } from "./primitives";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

type Finding = {
  title: string;
  severity: string;
  asset: string;
  risk: number;
  status: string;
  recommendation: string;
  meta: { label: string; value: string }[];
};

const tabs = ["Overview", "Vulnerabilities", "Threats", "Assets", "Reports"] as const;
type Tab = (typeof tabs)[number];

function Stat({ label, value, hint, accent }: { label: string; value: string; hint?: string; accent?: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className={cn("mt-2 font-display text-2xl font-bold", accent)}>{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function TrendChart({ height = 200 }: { height?: number }) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={trendData} margin={{ top: 8, right: 8, bottom: 0, left: -22 }}>
          <defs>
            <linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.55} />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 6" vertical={false} />
          <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
          <Tooltip
            contentStyle={{
              background: "var(--color-popover)",
              border: "1px solid var(--color-border)",
              borderRadius: 10,
              fontSize: 12,
            }}
          />
          <Area type="monotone" dataKey="riesgo" stroke="var(--color-primary)" strokeWidth={2} fill="url(#riskFill)" />
          <Area type="monotone" dataKey="hallazgos" stroke="var(--color-cyan)" strokeWidth={1.5} fill="transparent" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

const assetIcons = [Cloud, Server, Laptop, Boxes];

const tabKeys: Record<Tab, string> = {
  Overview: "tour.overview",
  Vulnerabilities: "tour.vulnerabilities",
  Threats: "tour.threats",
  Assets: "tour.assets",
  Reports: "tour.reports",
};

export function ProductTour({ compact = false }: { compact?: boolean }) {
  const { t: tr } = useI18n();
  const [tab, setTab] = useState<Tab>("Overview");
  const [finding, setFinding] = useState<Finding | null>(null);

  const activity: [string, string][] = [
    [tr("tour.a1"), tr("tour.at1")],
    [tr("tour.a2"), tr("tour.at2")],
    [tr("tour.a3"), tr("tour.at3")],
    [tr("tour.a4"), tr("tour.at4")],
  ];

  const reportRows: [string, string][] = [
    [tr("tour.row1"), "42 (-32)"],
    [tr("tour.row2"), "164 (-156)"],
    [tr("tour.row3"), "96%"],
    [tr("tour.row4"), "94%"],
  ];

  return (
    <div className="relative">
      <div className="mb-5 flex flex-wrap gap-1 rounded-xl border border-border bg-surface/70 p-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-all",
              tab === t
                ? "bg-primary text-primary-foreground shadow-[0_10px_30px_-16px_var(--color-primary)]"
                : "text-muted-foreground hover:bg-raised hover:text-foreground",
            )}
          >
            {tr(tabKeys[t])}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-surface to-background p-4 md:p-6">
        <div className="mb-4 flex items-center justify-between gap-3 border-b border-border/70 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-cyan" />
            <span className="font-display text-sm font-semibold">Fensivo 360 · {tr(tabKeys[tab])}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-success">
            <span className="dot-pulse size-1.5 rounded-full bg-success" /> {tr("tour.live")}
          </span>
        </div>

        <div key={tab} className="rise-in">
          {tab === "Overview" ? (
            <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
              <div className="grid gap-4 sm:grid-cols-2">
                <Stat label={tr("tour.riskScore")} value="42 / 100" hint={tr("tour.riskHint90")} accent="text-cyan" />
                <Stat label={tr("tour.health")} value="94%" hint={tr("tour.healthHint")} accent="text-success" />
                <Stat label={tr("tour.openFindings")} value="164" hint={tr("tour.findingsHint")} accent="text-warning" />
                <Stat label={tr("tour.protectedAssets")} value="2.830" hint={tr("tour.coverageHint")} />
              </div>
              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {tr("tour.activity")}
                </p>
                <ul className="mt-3 space-y-3">
                  {activity.map(([a, b]) => (
                    <li key={a} className="flex items-start justify-between gap-3 text-xs">
                      <span className="flex items-start gap-2 text-foreground">
                        <Activity className="mt-0.5 size-3.5 shrink-0 text-primary" />
                        {a}
                      </span>
                      <span className="shrink-0 font-mono text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}

          {tab === "Vulnerabilities" ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead>
                  <tr className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    <th className="pb-2 font-normal">{tr("tour.severity")}</th>
                    <th className="pb-2 font-normal">{tr("tour.asset")}</th>
                    <th className="pb-2 font-normal">CVE</th>
                    <th className="pb-2 font-normal">{tr("tour.risk")}</th>
                    <th className="pb-2 font-normal">{tr("tour.status")}</th>
                    <th className="pb-2" />
                  </tr>
                </thead>
                <tbody>
                  {tourVulnerabilities.map((v) => (
                    <tr
                      key={v.id}
                      onClick={() =>
                        setFinding({
                          title: `${v.severity} · ${tr("tour.vulnerability")}`,
                          severity: v.severity,
                          asset: v.asset,
                          risk: v.risk,
                          status: v.status,
                          recommendation: v.recommendation,
                          meta: [
                            { label: tr("tour.findingId"), value: v.id },
                            { label: "CVE", value: v.cve },
                          ],
                        })
                      }
                      className="cursor-pointer border-t border-border/60 transition-colors hover:bg-raised/70"
                    >
                      <td className="py-3"><SeverityTag level={v.severity} /></td>
                      <td className="py-3 font-mono text-xs text-foreground">{v.asset}</td>
                      <td className="py-3 font-mono text-xs text-muted-foreground">{v.cve}</td>
                      <td className="py-3 font-display font-semibold">{v.risk}</td>
                      <td className="py-3 text-xs text-muted-foreground">{v.status}</td>
                      <td className="py-3 text-right"><ArrowRight className="ml-auto size-3.5 text-muted-foreground" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {tab === "Threats" ? (
            <div className="grid gap-3">
              {tourThreats.map((t) => (
                <button
                  key={t.id}
                  onClick={() =>
                    setFinding({
                      title: tr("tour.detectedThreat"),
                      severity: t.severity,
                      asset: t.source,
                      risk: t.severity === "CRITICAL" ? 96 : t.severity === "HIGH" ? 78 : 52,
                      status: t.action,
                      recommendation: t.recommendation,
                      meta: [
                        { label: tr("tour.threatId"), value: t.id },
                        { label: tr("tour.detected"), value: t.time },
                      ],
                    })
                  }
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4 text-left transition-colors hover:border-primary/50"
                >
                  <div className="flex items-center gap-3">
                    <SeverityTag level={t.severity} />
                    <div>
                      <p className="text-sm font-semibold">{t.threat}</p>
                      <p className="font-mono text-xs text-muted-foreground">{t.source}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 text-xs">
                    <span className="font-mono text-muted-foreground">{t.time}</span>
                    <span className="rounded-md border border-border px-2 py-1">{t.action}</span>
                  </div>
                </button>
              ))}
            </div>
          ) : null}

          {tab === "Assets" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {tourAssets.map((a, i) => {
                const Icon = assetIcons[i % assetIcons.length]!;
                return (
                  <div key={a.group} className="rounded-xl border border-border bg-surface p-4">
                    <Icon className="size-4 text-cyan" />
                    <p className="mt-3 font-display text-2xl font-bold">{a.count.toLocaleString("es-CO")}</p>
                    <p className="text-sm font-medium">{a.group}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{a.note}</p>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-cyan"
                        style={{ width: `${a.coverage}%` }}
                      />
                    </div>
                    <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                      {a.coverage}% {tr("tour.coverage")}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : null}

          {tab === "Reports" ? (
            <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {tr("tour.posture")}
                </p>
                <TrendChart height={compact ? 180 : 230} />
              </div>
              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {tr("tour.execSummary")}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tr("tour.execBody")}</p>
                <ul className="mt-4 space-y-2 text-xs">
                  {reportRows.map(([k, v]) => (
                    <li key={k} className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">{k}</span>
                      <span className="font-mono">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {finding ? (
        <div className="fixed inset-0 z-[60] flex justify-end bg-background/70 backdrop-blur-sm" onClick={() => setFinding(null)}>
          <aside
            onClick={(e) => e.stopPropagation()}
            className="h-full w-full max-w-md overflow-y-auto border-l border-border bg-popover p-6 shadow-2xl rise-in"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <SeverityTag level={finding.severity} />
                <h3 className="mt-3 font-display text-lg font-bold">{finding.title}</h3>
              </div>
              <button
                aria-label={tr("tour.close")}
                onClick={() => setFinding(null)}
                className="grid size-8 place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{tr("tour.asset")}</dt>
                <dd className="mt-1 font-mono break-all">{finding.asset}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{tr("tour.riskScore")}</dt>
                <dd className="mt-1 flex items-center gap-3">
                  <span className="font-display text-2xl font-bold">{finding.risk}</span>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-critical" style={{ width: `${finding.risk}%` }} />
                  </div>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{tr("tour.status")}</dt>
                <dd className="mt-1">{finding.status}</dd>
              </div>
              {finding.meta.map((m) => (
                <div key={m.label}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{m.label}</dt>
                  <dd className="mt-1 font-mono">{m.value}</dd>
                </div>
              ))}
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {tr("tour.recommendation")}
                </dt>
                <dd className="mt-1 leading-relaxed text-muted-foreground">{finding.recommendation}</dd>
              </div>
            </dl>

            <button className="mt-8 w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground">
              {tr("tour.assign")}
            </button>
          </aside>
        </div>
      ) : null}
    </div>
  );
}

export { TrendChart };

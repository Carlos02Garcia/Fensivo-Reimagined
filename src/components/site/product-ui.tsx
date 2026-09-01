import { useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, ArrowDownRight, Bell, ChevronRight, Mail, ShieldAlert } from "lucide-react";
import mark from "@/assets/fensivo-icon-official.png";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { landingCopy } from "@/lib/landing-copy";

/* ---------------------------------------------------------------- utils */

export function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

function riskColor(score: number) {
  if (score >= 75) return "var(--color-critical)";
  if (score >= 55) return "var(--color-warning)";
  if (score >= 35) return "var(--color-primary)";
  return "var(--color-success)";
}

export function RiskRing({
  score,
  size = 148,
  label,
  active = true,
}: {
  score: number;
  size?: number;
  label?: string;
  active?: boolean;
}) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    const from = v;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 900);
      const e = 1 - Math.pow(1 - p, 3);
      setV(from + (score - from) * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score, active]);

  const r = size / 2 - 10;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-muted)" strokeWidth={10} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={riskColor(v)}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * v) / 100}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="font-display text-3xl font-extrabold tabular-nums md:text-4xl">{Math.round(v)}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label ?? "/ 100"}</p>
        </div>
      </div>
    </div>
  );
}

export function Trend({ points, height = 72, color = "var(--color-cyan)" }: { points: number[]; height?: number; color?: string }) {
  const d = useMemo(() => {
    const max = Math.max(...points);
    const min = Math.min(...points);
    const span = Math.max(1, max - min);
    return points
      .map((p, i) => {
        const x = (i / (points.length - 1)) * 100;
        const y = 100 - ((p - min) / span) * 88 - 6;
        return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ");
  }, [points]);

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ height }} className="w-full">
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.35} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={`${d} L100,100 L0,100 Z`} fill="url(#trendFill)" />
      <path d={d} fill="none" stroke={color} strokeWidth={1.6} vectorEffect="non-scaling-stroke" className="draw-line" />
    </svg>
  );
}

/* ------------------------------------------------------- hero risk panel */

export function HeroRiskPanel() {
  const { lang } = useI18n();
  const c = landingCopy(lang);
  const [ref, seen] = useInView<HTMLDivElement>(0.25);

  const stats = [
    { v: 12, l: c.highRisk, i: AlertTriangle, tone: "text-critical" },
    { v: 7, l: c.phishing, i: Mail, tone: "text-warning" },
    { v: 4, l: c.exposures, i: ShieldAlert, tone: "text-cyan" },
  ];

  return (
    <div
      ref={ref}
      className="group relative w-full overflow-hidden rounded-3xl border border-border/80 bg-surface/80 p-5 shadow-2xl shadow-black/50 backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1 md:p-7"
    >
      <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-4">
        <div className="flex items-center gap-2.5">
          <img src={mark} alt="Fensivo" width={24} height={24} className="size-6 rounded-md" />
          <span className="font-display text-sm font-semibold">Fensivo 360</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{c.demoData}</span>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
        <RiskRing score={38} active={seen} />
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{c.hrs}</p>
          <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-success/40 bg-success/10 px-3 py-1 text-sm font-semibold text-success">
            <ArrowDownRight className="size-4" /> {c.hrsDelta}
          </p>
          <div className="mt-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{c.trend}</p>
            <Trend points={[62, 58, 59, 52, 48, 45, 41, 38]} height={64} />
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div
            key={s.l}
            className="rounded-xl border border-border/70 bg-background/60 p-3 transition-colors hover:border-primary/50"
          >
            <s.i className={cn("size-4", s.tone)} />
            <p className="mt-2 font-display text-2xl font-bold tabular-nums">{s.v}</p>
            <p className="text-[11px] leading-tight text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- people */

export const demoPeople = [
  { name: "Sarah Mitchell", role: "Manager · Finance", score: 81, level: "CRITICAL", initials: "SM" },
  { name: "David Reed", role: "Account Exec · Sales", score: 72, level: "HIGH", initials: "DR" },
  { name: "Mike Johnson", role: "Analyst · IT", score: 34, level: "MEDIUM", initials: "MJ" },
  { name: "Emily Carter", role: "Coordinator · HR", score: 18, level: "LOW", initials: "EC" },
];

const levelTone: Record<string, string> = {
  CRITICAL: "border-critical/40 bg-critical/10 text-critical",
  HIGH: "border-warning/40 bg-warning/10 text-warning",
  MEDIUM: "border-primary/40 bg-primary/10 text-primary",
  LOW: "border-success/40 bg-success/10 text-success",
};

function PeopleView({ onSelect }: { onSelect: (i: number) => void }) {
  const { lang } = useI18n();
  const c = landingCopy(lang);
  return (
    <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-start">
      <div className="rounded-2xl border border-border bg-background/60 p-6 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{c.peopleTitle}</p>
        <div className="mt-4 flex justify-center">
          <RiskRing score={61} />
        </div>
        <p className="mt-4 text-xs text-muted-foreground">{c.peopleSub}</p>
      </div>
      <ul className="grid gap-3">
        {demoPeople.map((p, i) => (
          <li key={p.name}>
            <button
              onClick={() => onSelect(i)}
              className="flex w-full items-center gap-4 rounded-xl border border-border bg-background/60 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/60"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-raised font-display text-xs font-bold text-cyan">
                {p.initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{p.name}</span>
                <span className="block truncate text-xs text-muted-foreground">{p.role}</span>
              </span>
              <span className="hidden h-1.5 w-28 overflow-hidden rounded-full bg-muted sm:block">
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${p.score}%`, background: riskColor(p.score) }}
                />
              </span>
              <span className="font-display text-lg font-bold tabular-nums" style={{ color: riskColor(p.score) }}>
                {p.score}
              </span>
              <span className={cn("hidden rounded border px-2 py-0.5 font-mono text-[10px] font-semibold md:inline", levelTone[p.level])}>
                {p.level}
              </span>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------- signals */

function SignalsView() {
  const { lang } = useI18n();
  const c = landingCopy(lang);
  const items = [
    { icon: ShieldAlert, tone: "text-critical", time: "9:14", body: c.sig1, sub: null as string | null },
    { icon: Mail, tone: "text-warning", time: "11:02", body: c.sig2, sub: c.sig2b },
    { icon: Bell, tone: "text-cyan", time: "8:01", body: c.sig3, sub: c.sig3b },
  ];
  const steps = [c.event, c.detection, c.riskUpdate, c.action];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
      <ul className="grid gap-3">
        {items.map((it, i) => (
          <li
            key={it.body}
            className="rise-in rounded-xl border border-border bg-background/60 p-4 transition-colors hover:border-primary/50"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <div className="flex items-start gap-3">
              <it.icon className={cn("mt-0.5 size-4 shrink-0", it.tone)} />
              <div className="min-w-0">
                <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Fensivo · {it.time}
                </p>
                <p className="mt-1 text-sm leading-relaxed">{it.body}</p>
                {it.sub ? (
                  <p className="mt-2 rounded-lg border border-border/70 bg-surface px-3 py-2 text-xs text-muted-foreground">
                    {it.sub}
                  </p>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <ol className="flex gap-3 lg:flex-col">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-1 items-center gap-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full border border-cyan/40 bg-cyan/10 font-mono text-[10px] text-cyan">
              {i + 1}
            </span>
            <span className="text-xs font-medium text-muted-foreground">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ----------------------------------------------------------- risk view */

function RiskView() {
  const { lang } = useI18n();
  const c = landingCopy(lang);
  return (
    <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
      <div className="rounded-2xl border border-border bg-background/60 p-6 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{c.companyRisk}</p>
        <div className="mt-5 flex justify-center">
          <RiskRing score={58} size={170} />
        </div>
        <p className="mt-5 text-xs text-success">{c.target}</p>
      </div>
      <div className="rounded-2xl border border-border bg-background/60 p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{c.systemTrends}</p>
        <Trend points={[74, 71, 69, 66, 64, 61, 59, 58]} height={140} />
        <div className="mt-4 grid gap-2 border-t border-border/60 pt-4 sm:grid-cols-3">
          {[
            [c.riskScore, "58"],
            [c.clickRate, "20%"],
            [c.autoResponse, "40%"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-2 sm:block">
              <p className="text-xs text-muted-foreground">{k}</p>
              <p className="font-display text-lg font-bold">{v}</p>
            </div>
          ))}
        </div>
        <ul className="mt-4 grid gap-2 text-xs text-muted-foreground">
          {[c.ins1, c.ins2, c.ins3].map((x) => (
            <li key={x} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-cyan" />
              {x}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- onboarding view */

function OnboardingView() {
  const { lang } = useI18n();
  const c = landingCopy(lang);

  const users = [
    { name: "Sarah Mitchell", dept: "Finance", role: "Manager", risk: 42 },
    { name: "David Reed", dept: "Sales", role: "Account Exec", risk: 68 },
    { name: "Mike Johnson", dept: "IT", role: "Analyst", risk: 35 },
    { name: "Emily Carter", dept: "HR", role: "Coordinator", risk: 28 },
    { name: "Rachel Adams", dept: "Marketing", role: "Director", risk: 55 },
    { name: "Tom Bennett", dept: "Operations", role: "Manager", risk: 47 },
    { name: "Laura Chen", dept: "Engineering", role: "Lead Developer", risk: 72 },
    { name: "James Wilson", dept: "Finance", role: "Analyst", risk: 31 },
    { name: "Maria Garcia", dept: "Sales", role: "VP of Sales", risk: 81 },
    { name: "Robert Kim", dept: "IT", role: "Security Engineer", risk: 22 },
    { name: "Patricia Brown", dept: "HR", role: "Director", risk: 39 },
    { name: "Daniel Okafor", dept: "Marketing", role: "Specialist", risk: 44 },
    { name: "Jessica Lee", dept: "Operations", role: "Coordinator", risk: 26 },
    { name: "Mark Thompson", dept: "Engineering", role: "Developer", risk: 63 },
    { name: "Angela White", dept: "Finance", role: "Controller", risk: 58 },
    { name: "Steven Park", dept: "Sales", role: "Account Manager", risk: 50 },
    { name: "Karen Davis", dept: "IT", role: "SysAdmin", risk: 41 },
    { name: "Brian Martinez", dept: "HR", role: "Recruiter", risk: 33 },
    { name: "Melissa Taylor", dept: "Marketing", role: "Content Manager", risk: 48 },
    { name: "George Adams", dept: "Operations", role: "Director", risk: 56 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold">{c.onboardingTitle}</h3>
        <p className="text-muted-foreground">{c.onboardingSub}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-background/60 p-4">
          <h4 className="font-medium">{c.googleWorkspace}</h4>
          <div className="text-sm text-muted-foreground">5 empleados · 10 usuarios activos</div>
          <div className="mt-2 flex justify-between border-t pt-2">
            <span>Estado</span>
            <span className="text-green-600">✅ {c.googleStatus}</span>
          </div>
        </div>
        <div className="rounded-xl border bg-background/60 p-4">
          <h4 className="font-medium">{c.ms365}</h4>
          <div className="text-sm text-muted-foreground">Active AD: 0ms (0)</div>
          <div className="mt-2 flex justify-between border-t pt-2">
            <span>Estado</span>
            <span className="text-muted-foreground">⏳ {c.msStatus}</span>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="font-semibold">{c.usersSynced}</span>
          <span className="text-sm text-muted-foreground">20 usuarios</span>
        </div>

        <div className="block sm:hidden space-y-3">
          {users.map((u) => (
            <div key={u.name} className="rounded-xl border bg-background/60 p-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-sm">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.role} · {u.dept}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  u.risk >= 65 ? 'bg-red-100 text-red-700' :
                  u.risk >= 45 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {u.risk}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden sm:block rounded-xl border bg-background/60 p-2 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="p-2">Nombre</th>
                <th className="p-2">Departamento</th>
                <th className="p-2">Rol</th>
                <th className="p-2">Riesgo</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.name} className="border-b border-border/50">
                  <td className="p-2 font-medium">{u.name}</td>
                  <td className="p-2">{u.dept}</td>
                  <td className="p-2">{u.role}</td>
                  <td className="p-2">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      u.risk >= 65 ? 'bg-red-100 text-red-700' :
                      u.risk >= 45 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {u.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------- the showcase */

export function Fensivo360Showcase({
  onPerson,
  tab: tabProp,
  onTabChange,
}: {
  onPerson?: (i: number) => void;
  tab?: "risk" | "signals" | "people" | "onboarding";
  onTabChange?: (t: "risk" | "signals" | "people" | "onboarding") => void;
}) {
  const { lang } = useI18n();
  const c = landingCopy(lang);
  const [tabState, setTabState] = useState<"risk" | "signals" | "people" | "onboarding">("onboarding");
  const tab = tabProp ?? tabState;
  const setTab = (k: "risk" | "signals" | "people" | "onboarding") => {
    setTabState(k);
    onTabChange?.(k);
  };

  const tabs = [ 
    { k: "risk" as const, l: c.tabRisk },
    { k: "signals" as const, l: c.tabSignals },
    { k: "people" as const, l: c.tabPeople },
    { k: "onboarding" as const, l: c.tabOnboarding },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-surface to-background p-4 shadow-2xl shadow-black/40 md:p-8">
<div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-5">
  <div
    role="tablist"
    aria-label="Fensivo 360"
    className="flex flex-col sm:flex-row gap-1 rounded-xl border border-border bg-background/60 p-1 w-full sm:w-auto"
  >
    {tabs.map((x) => (
      <button
        key={x.k}
        role="tab"
        aria-selected={tab === x.k}
        onClick={() => setTab(x.k)}
        className={cn(
          "rounded-lg px-5 py-2.5 text-sm font-semibold transition-all w-full sm:w-auto",
          tab === x.k
            ? "bg-primary text-primary-foreground shadow-[0_10px_30px_-16px_var(--color-primary)]"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {x.l}
      </button>
    ))}
  </div>
  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{c.demoData}</span>
  
</div>
      <div key={tab} className="rise-in pt-6">
        {tab === "onboarding" ? <OnboardingView /> : null}
        {tab === "risk" ? <RiskView /> : null}
        {tab === "signals" ? <SignalsView /> : null}
        {tab === "people" ? <PeopleView onSelect={(i) => onPerson?.(i)} /> : null}
      </div>
    </div>
  );
}
import { Building2, HeartHandshake, Server, ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { landingCopy } from "@/lib/landing-copy";
import { Trend } from "./product-ui";

const roleIcons = [ShieldCheck, Building2, HeartHandshake, Server];

export function RolesGrid() {
  const { lang } = useI18n();
  const c = landingCopy(lang);
  const previews = [
    [72, 66, 61, 55, 49, 44],
    [80, 74, 70, 63, 58, 52],
    [30, 38, 46, 55, 62, 71],
    [12, 9, 14, 7, 5, 3],
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {c.roles.map((r, i) => {
        const Icon = roleIcons[i]!;
        return (
          <div
            key={r.r}
            className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-primary/50"
          >
            <Icon className="size-5 text-cyan" />
            <p className="mt-5 font-display text-2xl font-bold">{r.r}</p>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{r.s}</p>
            <div className="mt-5 border-t border-border/60 pt-3">
              <Trend points={previews[i]!} height={44} color={i === 2 ? "var(--color-success)" : "var(--color-primary)"} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Integrations() {
  const { lang } = useI18n();
  const c = landingCopy(lang);
  const items = [
    { name: "Microsoft 365", tag: "OAuth" },
    { name: "Google Workspace", tag: "OAuth" },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
      <div>
        <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl">{c.integrationsTitle}</h2>
        <p className="mt-4 text-lg text-muted-foreground">{c.integrationsSub}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((it) => (
          <div
            key={it.name}
            className="rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-cyan/50"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">{it.tag}</span>
            <p className="mt-4 font-display text-xl font-semibold">{it.name}</p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-primary to-cyan" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

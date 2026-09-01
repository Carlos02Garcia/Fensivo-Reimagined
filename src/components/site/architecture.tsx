import { Cloud, Laptop, Network, Server, Shield } from "lucide-react";

const nodes = [
  { label: "Cloud", Icon: Cloud, x: 12, y: 16 },
  { label: "Servers", Icon: Server, x: 88, y: 16 },
  { label: "Endpoints", Icon: Laptop, x: 12, y: 84 },
  { label: "Networks", Icon: Network, x: 88, y: 84 },
];

export function ArchitectureDiagram() {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-surface to-background grid-field">
      <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {nodes.map((n) => (
          <line
            key={n.label}
            x1={n.x}
            y1={n.y}
            x2={50}
            y2={50}
            stroke="var(--color-primary)"
            strokeWidth={0.25}
            className="flow-line"
            opacity={0.7}
          />
        ))}
        <circle cx={50} cy={50} r={16} fill="none" stroke="var(--color-cyan)" strokeWidth={0.15} opacity={0.35} />
        <circle cx={50} cy={50} r={24} fill="none" stroke="var(--color-cyan)" strokeWidth={0.12} opacity={0.2} />
      </svg>

      {nodes.map((n) => (
        <div
          key={n.label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <div className="flex flex-col items-center gap-1.5">
            <span className="grid size-10 place-items-center rounded-xl border border-border bg-surface text-cyan md:size-12">
              <n.Icon className="size-4 md:size-5" />
            </span>
            <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground md:text-[10px]">
              {n.label}
            </span>
          </div>
        </div>
      ))}

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="float-slow glow-primary flex flex-col items-center gap-2 rounded-2xl border border-primary/40 bg-background/85 px-5 py-4 text-center backdrop-blur md:px-8 md:py-6">
          <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-cyan">
            <Shield className="size-4 text-background" />
          </span>
          <p className="font-display text-sm font-bold md:text-base">FENSIVO 360</p>
          <p className="max-w-[160px] text-[10px] leading-relaxed text-muted-foreground md:text-xs">
            Capa de inteligencia de seguridad
          </p>
        </div>
      </div>
    </div>
  );
}

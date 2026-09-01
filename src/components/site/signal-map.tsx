import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useInView } from "./product-ui";

/**
 * Interacción tipo Cyera adaptada a Fensivo: un prisma central (el perfil de
 * riesgo humano) que se enriquece señal a señal, con línea de tiempo superior
 * y etiquetas conectadas por líneas punteadas.
 */
type Node = { id: string; label: string; detail: string; side: "left" | "right"; top: number };

const dict = {
  es: {
    kicker: "Señales",
    title: "Cada señal afina el perfil de riesgo",
    intro: "Fensivo combina señales externas y conducta real para construir un score humano vivo, por persona y por equipo.",
    core: "Riesgo humano",
    nodes: [
      { id: "creds", label: "Credenciales expuestas", detail: "680+ fuentes de filtraciones monitoreadas 24/7.", side: "left", top: 18 },
      { id: "phish", label: "Clics en phishing", detail: "Simulacros reales que revelan la conducta, no la teoría.", side: "right", top: 26 },
      { id: "area", label: "Área y criticidad", detail: "El peso del rol y del acceso ajusta el riesgo real.", side: "left", top: 46 },
      { id: "expo", label: "Superficie expuesta", detail: "Dominios, correos y datos públicos asociados a la empresa.", side: "right", top: 52 },
      { id: "train", label: "Microlearning", detail: "Entrenamiento contextual justo después del error.", side: "left", top: 74 },
      { id: "retest", label: "Retest y mejora", detail: "Se vuelve a medir y el score baja de forma verificable.", side: "right", top: 78 },
    ] as Node[],
  },
  en: {
    kicker: "Signals",
    title: "Every signal sharpens the risk profile",
    intro: "Fensivo blends external exposure with real behavior into a living human risk score, per person and per team.",
    core: "Human risk",
    nodes: [
      { id: "creds", label: "Exposed credentials", detail: "680+ breach sources monitored 24/7.", side: "left", top: 18 },
      { id: "phish", label: "Phishing clicks", detail: "Real simulations that reveal behavior, not theory.", side: "right", top: 26 },
      { id: "area", label: "Role & criticality", detail: "Access and seniority weight the real risk.", side: "left", top: 46 },
      { id: "expo", label: "Exposed surface", detail: "Domains, emails and public data tied to the company.", side: "right", top: 52 },
      { id: "train", label: "Microlearning", detail: "Contextual training right after the mistake.", side: "left", top: 74 },
      { id: "retest", label: "Retest & improve", detail: "Measured again, with a verifiable score drop.", side: "right", top: 78 },
    ] as Node[],
  },
};

export function SignalMap() {
  const { lang } = useI18n();
  const c = (dict as Record<string, typeof dict.es>)[lang as string] ?? dict.es;
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const [i, setI] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const paused = useRef(false);

  useEffect(() => {
    if (!seen) return;
    const t = setInterval(() => {
      if (!paused.current) {
        setI((v) => {
          const next = (v + 1) % c.nodes.length;
          // Trigger reset animation when completing cycle
          if (next === 0 && v === c.nodes.length - 1) {
            setIsResetting(true);
            setTimeout(() => setIsResetting(false), 1200);
          }
          return next;
        });
      }
    }, 2600);
    return () => clearInterval(t);
  }, [seen, c.nodes.length]);

  const current = c.nodes[i] ?? c.nodes[0]!;
  const progress = ((i + 1) / c.nodes.length) * 100;
  const fillLevel = isResetting ? 0 : Math.min(progress, 100);
  const riskScore = Math.round(38 + ((i + 1) / c.nodes.length) * 45);
  const percentLoaded = Math.round(((i + 1) / c.nodes.length) * 100);
  
  // Cambiar color de números: amarillo durante carga, rojo cuando está completo
  const numberTone = fillLevel >= 100 ? "text-critical" : "text-warning";

  return (
    <div ref={ref} className="overflow-hidden rounded-3xl border border-border bg-surface">
      <div className="px-6 pt-8 md:px-10 md:pt-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan">{c.kicker}</p>
        <h3 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-[1.12] md:text-4xl">{c.title}</h3>
        <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{c.intro}</p>

        {/* Línea de tiempo */}
        <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-cyan transition-[width] duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          {c.nodes.map((n, idx) => (
            <button
              key={n.id}
              onClick={() => setI(idx)}
              className={cn(
                "font-mono text-[14px] uppercase tracking-[0.18em] font-bold transition-colors",
                idx === i ? "text-cyan" : "text-muted-foreground/60 hover:text-muted-foreground",
              )}
            >
              {String(idx + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>

      <div
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        className="relative mt-8 aspect-[16/10] min-h-[420px] w-full bg-[radial-gradient(120%_90%_at_50%_50%,color-mix(in_oklab,var(--color-primary)_14%,transparent),transparent_72%)]"
      >
        <div className="absolute inset-0 grid-field opacity-30" />

        {/* Conectores punteados animados */}
        <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {c.nodes.map((n, idx) => (
            <g key={n.id}>
              <line
                x1={n.side === "left" ? 42 : 58}
                y1={n.top}
                x2={n.side === "left" ? 8 : 92}
                y2={n.top}
                vectorEffect="non-scaling-stroke"
                strokeDasharray="6"
                strokeWidth={idx === i ? 2.5 : 1}
                className={cn(
                  "transition-all duration-500",
                  idx === i ? "stroke-cyan opacity-100" : "stroke-border opacity-40",
                )}
                style={{
                  animation: idx === i ? "flow-forward 0.8s linear infinite" : "none",
                }}
              />
            </g>
          ))}
        </svg>

        {/* Detector de Señales 3D - Animación de Carga Realista */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[88%] max-w-[620px]" style={{ perspective: "1200px" }}>
            <svg width="100%" height="100%" viewBox="0 0 320 360" className={cn(
              "block w-full h-full drop-shadow-[0_50px_120px_color-mix(in_oklab,var(--color-primary)_35%,transparent)] transition-all duration-500",
              isResetting && "drop-shadow-[0_0_60px_color-mix(in_oklab,var(--color-cyan)_60%,transparent)]"
            )} style={{ transformStyle: "preserve-3d" }}>
              <defs>
                <linearGradient id="load-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.18" />
                  <stop offset="35%" stopColor="var(--color-cyan)" stopOpacity="0.75" />
                  <stop offset="70%" stopColor="var(--color-cyan)" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="var(--color-success)" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="scan-sheen" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                  <stop offset="45%" stopColor="rgba(255,255,255,0.55)" />
                  <stop offset="70%" stopColor="rgba(255,255,255,0.12)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
                <linearGradient id="side-right" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.42" />
                  <stop offset="100%" stopColor="var(--color-cyan)" stopOpacity="0.15" />
                </linearGradient>
                <linearGradient id="side-left" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="var(--color-cyan)" stopOpacity="0.08" />
                </linearGradient>
                <filter id="cube-glow">
                  <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="intense-glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <clipPath id="hex-clip">
                  <polygon points="85,55 160,15 235,55 235,300 160,340 85,300" />
                </clipPath>
              </defs>

              <g className="float-hex origin-center" style={{ transformBox: "fill-box" }}>
                <g clipPath="url(#hex-clip)">
                  <rect
                    x="85"
                    y={340 - (fillLevel / 100) * 325}
                    width="150"
                    height={(fillLevel / 100) * 325}
                    fill="url(#load-gradient)"
                    opacity={isResetting ? 0.2 : 1}
                    className="transition-all duration-700 ease-out"
                  />
                  <rect
                    x="85"
                    y={340 - (fillLevel / 100) * 325}
                    width="150"
                    height={(fillLevel / 100) * 325}
                    fill="url(#scan-sheen)"
                    opacity={isResetting ? 0 : 0.6}
                    className="transition-all duration-700 ease-out"
                  />
                </g>

                <polygon
                  points="85,55 160,15 235,55 235,300 160,340 85,300"
                  fill="transparent"
                  stroke="var(--color-cyan)"
                  strokeOpacity={isResetting ? "1" : "0.8"}
                  strokeWidth={isResetting ? "3" : "2.2"}
                  filter={isResetting ? "url(#intense-glow)" : "url(#cube-glow)"}
                  className="transition-all duration-300"
                />
                <polygon
                  points="160,30 230,70 230,270 160,310"
                  fill="url(#side-right)"
                  stroke="var(--color-cyan)"
                  strokeOpacity={isResetting ? "0.9" : "0.25"}
                  strokeWidth={isResetting ? "1.8" : "1"}
                  className="transition-all duration-300"
                />
                <polygon
                  points="90,70 90,270 160,310 160,30"
                  fill="url(#side-left)"
                  stroke="var(--color-cyan)"
                  strokeOpacity={isResetting ? "0.8" : "0.18"}
                  strokeWidth={isResetting ? "1.3" : "0.9"}
                  className="transition-all duration-300"
                />

                <line x1="160" y1="30" x2="160" y2="310" stroke="var(--color-cyan)" strokeOpacity={isResetting ? "1" : "0.6"} strokeWidth={isResetting ? "2.5" : "1.5"} className="transition-all duration-300" />

                {Array.from({ length: 6 }).map((_, idx) => {
                  const y = 250 - idx * 32;
                  return (
                    <line
                      key={`scan-${idx}`}
                      x1="100"
                      y1={y}
                      x2="220"
                      y2={y}
                      stroke="var(--color-cyan)"
                      strokeWidth="0.8"
                      opacity={0.18 + idx * 0.12}
                      className="transition-all duration-300"
                    />
                  );
                })}

                {isResetting && (
                  <>
                    <circle cx="160" cy="170" r="80" fill="none" stroke="var(--color-cyan)" strokeWidth="1.5" opacity="0.7">
                      <animate attributeName="r" from="60" to="105" dur="1.2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="1" to="0" dur="1.2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="160" cy="170" r="50" fill="none" stroke="var(--color-cyan)" strokeWidth="1" opacity="0.4">
                      <animate attributeName="r" from="35" to="80" dur="1.2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.8" to="0" dur="1.2s" repeatCount="indefinite" />
                    </circle>
                  </>
                )}
              </g>
            </svg>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className={cn(
                "font-mono text-[11px] uppercase tracking-[0.25em] drop-shadow-lg transition-all duration-300",
                isResetting ? "text-cyan opacity-100" : "text-primary opacity-70"
              )}>
                {isResetting ? "Reiniciando" : "Detectando"}
              </p>
              <p className={cn(
                "mt-4 font-display text-7xl font-black tabular-nums transition-all duration-300",
                "drop-shadow-[0_0_30px_color-mix(in_oklab,var(--color-cyan)_50%,transparent)]",
                isResetting ? "text-cyan scale-110" : `${numberTone} scale-100`
              )}>
                {isResetting ? "0" : riskScore}
              </p>
              <p className="mt-2 font-mono text-[12px] font-bold uppercase tracking-[0.15em] text-warning opacity-100">
                {isResetting ? "Escaneo completo" : `${percentLoaded}% — Señales Detectadas`}
              </p>
              <p className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-warning opacity-90">
                {isResetting ? "Reinicio iniciado..." : `Fase ${i + 1} de ${c.nodes.length}`}
              </p>
            </div>
          </div>
        </div>

        {/* Etiquetas interactivas */}
        {c.nodes.map((n, idx) => (
          <button
            key={n.id}
            onMouseEnter={() => setI(idx)}
            onFocus={() => setI(idx)}
            onClick={() => setI(idx)}
            style={{ top: `${n.top}%`, [n.side]: "4%" } as React.CSSProperties}
            className={cn(
              "absolute -translate-y-1/2 whitespace-nowrap rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all duration-300 md:text-sm",
              idx === i
                ? "border-cyan/80 bg-background text-cyan shadow-[0_24px_70px_-34px_var(--color-cyan)] scale-105"
                : "border-border bg-surface/80 text-muted-foreground hover:border-primary/50 hover:scale-100",
            )}
          >
            {n.label}
          </button>
        ))}
      </div>

      <div className="border-t border-border/70 px-6 py-6 md:px-10">
        <p key={current.id} className="animate-fade-in text-sm text-muted-foreground md:text-base">
          <span className="font-semibold text-foreground">{current.label}.</span> {current.detail}
        </p>
      </div>
    </div>
  );
}

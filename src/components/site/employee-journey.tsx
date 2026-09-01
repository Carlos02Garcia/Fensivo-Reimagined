import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, GraduationCap, RotateCcw } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { landingCopy } from "@/lib/landing-copy";
import { RiskRing } from "./product-ui";
import { cn } from "@/lib/utils";

const SEQUENCE = [82, 74, 59, 41];

/** Riesgo → Por qué → Acción → Resultado, sobre una persona demo. */
export function EmployeeJourney() {
  const { lang } = useI18n();
  const c = landingCopy(lang);
  const [running, setRunning] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!running || i >= SEQUENCE.length - 1) return;
    const id = setTimeout(() => setI((v) => v + 1), 850);
    return () => clearTimeout(id);
  }, [running, i]);

  const score = SEQUENCE[i]!;
  const done = i === SEQUENCE.length - 1;

  return (
    <div className="grid gap-6 rounded-3xl border border-border bg-surface p-6 md:grid-cols-[auto_1fr] md:p-10">
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-background/60 p-6 text-center">
        <span className="grid size-12 place-items-center rounded-full border border-border bg-raised font-display text-sm font-bold text-cyan">
          AT
        </span>
        <div>
          <p className="font-display text-lg font-semibold">Ana Torres</p>
          <p className="text-xs text-muted-foreground">Analyst · Operations</p>
        </div>
        <RiskRing score={score} size={160} />
        <div className="flex items-center gap-2 font-mono text-[11px] tabular-nums text-muted-foreground">
          {SEQUENCE.map((s, idx) => (
            <span key={s} className={cn(idx <= i ? "text-foreground" : "opacity-40")}>
              {s}
              {idx < SEQUENCE.length - 1 ? " →" : ""}
            </span>
          ))}
        </div>
        {done ? (
          <p className="inline-flex items-center gap-2 rounded-full border border-success/40 bg-success/10 px-3 py-1 text-sm font-semibold text-success">
            <CheckCircle2 className="size-4" /> {c.riskReduced}
          </p>
        ) : null}
      </div>

      <div className="grid gap-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{c.why}</p>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
            {[c.why1, c.why2, c.why3].map((w) => (
              <li key={w} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-critical" />
                {w}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-background/60 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{c.recommended}</p>
          <p className="mt-2 flex items-center gap-2 font-display text-lg font-semibold">
            <GraduationCap className="size-5 text-cyan" /> {c.actionText}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={() => {
                setI(0);
                setRunning(true);
              }}
              disabled={running && !done}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {c.runAction} <ArrowRight className="size-4" />
            </button>
            <button
              onClick={() => {
                setRunning(false);
                setI(0);
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw className="size-4" /> {c.reset}
            </button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[c.training, c.retest, c.result].map((s, idx) => (
            <div
              key={s}
              className={cn(
                "rounded-xl border p-4 text-sm font-medium transition-colors",
                i > idx ? "border-success/40 bg-success/10 text-success" : "border-border bg-background/60 text-muted-foreground",
              )}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { landingCopy } from "@/lib/landing-copy";
import { useInView } from "./product-ui";
import { cn } from "@/lib/utils";

/** Historia visual progresiva: de 500 empleados a riesgo reducido. */
export function HumanRiskFlow() {
  const { lang } = useI18n();
  const c = landingCopy(lang);
  const [ref, seen] = useInView<HTMLDivElement>(0.25);
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!seen) return;
    const id = setInterval(() => setStep((s) => (s >= c.flow.length - 1 ? s : s + 1)), 420);
    return () => clearInterval(id);
  }, [seen, c.flow.length]);

  return (
    <div ref={ref} className="grid gap-3 md:grid-cols-7">
      {c.flow.map((f, i) => {
        const on = i <= step;
        const last = i === c.flow.length - 1;
        return (
          <div
            key={f.v}
            className={cn(
              "rounded-2xl border p-5 transition-all duration-500",
              on ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              last ? "border-success/50 bg-success/10" : "border-border bg-surface",
            )}
          >
            <p
              className={cn(
                "font-display text-3xl font-extrabold tabular-nums",
                last ? "text-success" : i === 0 ? "text-foreground" : "text-cyan",
              )}
            >
              {f.k}
            </p>
            <p className="mt-2 text-xs leading-snug text-muted-foreground">{f.v}</p>
          </div>
        );
      })}
    </div>
  );
}

import { useState } from "react";
import { Eye, Brain, Zap, LineChart } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { landingCopy } from "@/lib/landing-copy";
import { cn } from "@/lib/utils";

const icons = [Eye, Brain, Zap, LineChart];

/** 01 Detectar · 02 Entender · 03 Actuar · 04 Medir — tarjetas que se expanden. */
export function MethodSteps() {
  const { lang } = useI18n();
  const c = landingCopy(lang);
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {c.method.map((m, i) => {
        const Icon = icons[i]!;
        const on = active === i;
        return (
          <button
            key={m.n}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-pressed={on}
            className={cn(
              "group flex h-full flex-col rounded-2xl border p-7 text-left transition-all duration-300",
              on
                ? "-translate-y-1 border-primary/60 bg-surface shadow-[0_30px_80px_-50px_var(--color-primary)]"
                : "border-border bg-background hover:border-border",
            )}
          >
            <div className="flex items-center justify-between">
              <Icon className={cn("size-6 transition-colors", on ? "text-cyan" : "text-muted-foreground")} />
              <span className="font-mono text-xs text-muted-foreground">{m.n}</span>
            </div>
            <p className="mt-8 font-display text-2xl font-bold md:text-3xl">{m.t}</p>
            <p
              className={cn(
                "overflow-hidden text-sm leading-relaxed text-muted-foreground transition-all duration-300",
                on ? "mt-3 max-h-24 opacity-100" : "mt-0 max-h-0 opacity-0 md:max-h-0",
              )}
            >
              {m.d}
            </p>
          </button>
        );
      })}
    </div>
  );
}

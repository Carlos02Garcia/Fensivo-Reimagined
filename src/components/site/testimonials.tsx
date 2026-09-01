import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const n = testimonials.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % n), 6000);
    return () => clearInterval(id);
  }, [paused, n]);

  const t = testimonials[i]!;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0]!.clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0]!.clientX - touchX.current;
        if (Math.abs(dx) > 40) setI((v) => (v + (dx < 0 ? 1 : n - 1)) % n);
        touchX.current = null;
      }}
      className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface via-surface to-background p-8 md:p-12"
    >
      <Quote className="size-8 text-primary/40" />
      <div key={i} className="rise-in">
        <p className="mt-6 max-w-3xl font-display text-xl leading-relaxed md:text-2xl">“{t.quote}”</p>
        <div className="mt-8 flex items-center gap-4">
          <span className="grid size-12 place-items-center rounded-full border border-border bg-raised font-display text-sm font-bold text-cyan">
            {t.initials}
          </span>
          <div>
            <p className="text-sm font-semibold">{t.name}</p>
            <p className="text-xs text-muted-foreground">
              {t.role} · {t.company}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-1.5">
          {testimonials.map((x, idx) => (
            <button
              key={x.name}
              aria-label={`Testimonio ${idx + 1}`}
              onClick={() => setI(idx)}
              className={cn("h-1 rounded-full transition-all", idx === i ? "w-8 bg-cyan" : "w-4 bg-border")}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            aria-label="Testimonio anterior"
            onClick={() => setI((v) => (v + n - 1) % n)}
            className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            aria-label="Testimonio siguiente"
            onClick={() => setI((v) => (v + 1) % n)}
            className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

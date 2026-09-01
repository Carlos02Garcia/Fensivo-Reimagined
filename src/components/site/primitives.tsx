import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("transition-all duration-700 ease-out", shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1600,
}: {
  value: number;
  prefix?: string | undefined;
  suffix?: string | undefined;
  decimals?: number | undefined;
  duration?: number | undefined;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(value * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
        className,
      )}
    >
      <span className="dot-pulse size-1.5 rounded-full bg-cyan" />
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("border-t border-border/60 py-20 md:py-28", className)}>
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">{children}</div>
    </section>
  );
}

export function SeverityTag({ level }: { level: string }) {
  const map: Record<string, string> = {
    CRITICAL: "border-critical/40 bg-critical/12 text-critical",
    HIGH: "border-warning/40 bg-warning/12 text-warning",
    MEDIUM: "border-primary/40 bg-primary/12 text-primary",
    LOW: "border-border bg-muted/60 text-muted-foreground",
  };
  return (
    <span
      className={cn(
        "inline-flex rounded border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-widest",
        map[level] ?? map["LOW"],
      )}
    >
      {level}
    </span>
  );
}

export function Wordmark({
  name,
  className,
  size = "md",
}: {
  name: string;
  className?: string;
  size?: "md" | "lg";
}) {
  const initial = name.charAt(0);
  const lg = size === "lg";
  return (
    <div className={cn("flex items-center whitespace-nowrap", lg ? "gap-4" : "gap-2.5", className)}>
      <span
        className={cn(
          "grid place-items-center rounded-lg border border-border bg-raised font-display font-bold text-cyan",
          lg ? "size-12 text-[18px]" : "size-7 text-[12px]",
        )}
      >
        {initial}
      </span>
      <span
        className={cn(
          "font-display font-semibold tracking-tight text-muted-foreground",
          lg ? "text-[24px]" : "text-[15px]",
        )}
      >
        {name}
      </span>
    </div>
  );
}

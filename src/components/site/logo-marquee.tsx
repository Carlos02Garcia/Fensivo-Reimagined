import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { logos } from "@/lib/site-data";
import { Wordmark } from "./primitives";
import { cn } from "@/lib/utils";

export function LogoMarquee({ label, className }: { label: string; className?: string }) {
  const [paused, setPaused] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  const nudge = (dir: number) => {
    scroller.current?.scrollBy({ left: dir * 420, behavior: "smooth" });
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
        <div className="flex gap-2">
          <button
            aria-label="Logos anteriores"
            onClick={() => nudge(-1)}
            className="grid size-8 place-items-center rounded-md border border-border bg-surface text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            aria-label="Logos siguientes"
            onClick={() => nudge(1)}
            className="grid size-8 place-items-center rounded-md border border-border bg-surface text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div
        className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          ref={scroller}
          className="hide-scrollbar overflow-x-auto md:overflow-hidden"
          style={{ scrollbarWidth: "none" }}
        >
          <div
            className="marquee-track flex w-max items-center gap-20 py-5"
            style={{ animationPlayState: paused ? "paused" : "running" }}
          >
            {[...logos, ...logos].map((name, i) => (
              <Wordmark
                key={`${name}-${i}`}
                name={name}
                size="lg"
                className="opacity-70 transition-opacity hover:opacity-100"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

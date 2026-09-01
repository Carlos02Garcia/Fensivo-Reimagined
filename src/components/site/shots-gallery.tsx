import { useEffect, useState } from "react";
import { Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { landingCopy } from "@/lib/landing-copy";

export type ShotKey = "risk" | "signals" | "people" | "onboarding";

/**
 * Galería interactiva de capturas de pantalla.
 */
export function ShotsGallery({
  active,
  onSelect,
}: {
  active: ShotKey;
  onSelect: (k: ShotKey) => void;
}) {
  const { lang } = useI18n();
  const c = landingCopy(lang);
  const [zoom, setZoom] = useState<ShotKey | null>(null);

  const shots: { k: ShotKey; src: string; title: string; alt: string }[] = [
    { k: "risk", src: "/risk.png", title: c.tabRisk, alt: `Fensivo 360 — ${c.companyRisk}` },
    { k: "signals", src: "/signals.png", title: c.tabSignals, alt: `Fensivo 360 — ${c.signalsTitle}` },
    { k: "people", src: "/people.png", title: c.tabPeople, alt: `Fensivo 360 — ${c.peopleTitle}` },
    { k: "onboarding", src: "/onboarding.png", title: "Onboarding", alt: "Fensivo 360 — Onboarding" },
  ];

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoom(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom]);

  const zoomed = shots.find((s) => s.k === zoom);

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-2">
        {shots.map((s, i) => (
          <div
            key={s.k}
            className={cn(
              "group relative overflow-hidden rounded-2xl border transition-all duration-500",
              active === s.k
                ? "border-cyan/60 shadow-[0_0_60px_-20px_var(--color-cyan),0_30px_80px_-40px_var(--color-cyan)]"
                : "border-border/70 hover:border-cyan/40 hover:shadow-[0_0_40px_-25px_var(--color-cyan)]",
            )}
          >
            <button
              onClick={() => onSelect(s.k)}
              aria-pressed={active === s.k}
              className="block w-full text-left"
            >
              <span className="relative block bg-gradient-to-b from-raised/50 to-surface/30 p-0 backdrop-blur-sm overflow-hidden">
                {active === s.k && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan/0 via-cyan/5 to-primary/0 pointer-events-none" />
                )}
                <img
                  src={s.src}
                  alt={s.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={cn(
                    "w-full rounded-xl object-contain object-center transition-all duration-500",
                    "ring-1 ring-border/40 bg-surface/60",
                    "max-h-[480px]",
                    active === s.k ? "ring-cyan/40 scale-100" : "ring-border/20 group-hover:scale-[1.01]",
                  )}
                  style={{ imageRendering: "auto", transform: "translateZ(0)" }}
                />
              </span>
            </button>

            <div className="flex items-center justify-between gap-4 border-t border-border/50 bg-gradient-to-r from-surface/80 to-surface/40 px-6 py-4 backdrop-blur-sm">
              <span className="flex items-center gap-3 font-display text-sm font-bold">
                <span
                  className={cn(
                    "size-2.5 rounded-full transition-all duration-500",
                    active === s.k ? "bg-cyan shadow-[0_0_12px_var(--color-cyan)]" : "bg-muted-foreground/30",
                  )}
                />
                <span className={cn("transition-colors duration-300", active === s.k ? "text-cyan" : "text-foreground")}>
                  {s.title}
                </span>
              </span>
              <button
                onClick={() => setZoom(s.k)}
                aria-label={`${s.title} — ampliar al 100%`}
                className="inline-flex items-center gap-2 rounded-lg border border-cyan/30 bg-cyan/5 px-4 py-2 text-xs font-bold text-cyan transition-all hover:border-cyan/60 hover:bg-cyan/15 hover:shadow-[0_0_20px_-8px_var(--color-cyan)]"
              >
                <Maximize2 className="size-4" /> Ampliar 100%
              </button>
            </div>
          </div>
        ))}
      </div>

      {zoomed ? (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setZoom(null)}
          className="fixed inset-0 z-[70] grid place-items-center bg-background/95 p-4 backdrop-blur-xl md:p-10"
        >
          <button
            aria-label="Cerrar"
            onClick={() => setZoom(null)}
            className="absolute right-6 top-6 grid size-11 place-items-center rounded-full border border-cyan/40 bg-surface/80 backdrop-blur-sm transition-all hover:border-cyan/70 hover:bg-cyan/10 md:right-8 md:top-8"
          >
            <X className="size-5 text-cyan" />
          </button>
          <div className="relative">
            <img
              src={zoomed.src}
              alt={zoomed.alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] w-auto max-w-full rounded-xl border border-cyan/30 object-contain ring-1 ring-cyan/20 shadow-[0_0_80px_-20px_var(--color-cyan)]"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

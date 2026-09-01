import { useEffect, useRef, useState } from "react";
import { Check, Globe } from "lucide-react";
import { languages, useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string | undefined }) {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        aria-label={t("nav.language")}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
      >
        <Globe className="size-4" />
        <span className="font-mono text-xs uppercase tracking-[0.12em]">{lang}</span>
      </button>

      {open ? (
        <div
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-xl"
        >
          {languages.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={l.code === lang}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-raised",
                l.code === lang ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <span>{l.native}</span>
              {l.code === lang ? <Check className="size-3.5 text-cyan" /> : (
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] opacity-60">{l.code}</span>
              )}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

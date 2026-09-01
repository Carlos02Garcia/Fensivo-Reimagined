import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

/**
 * Píldora con efecto máquina de escribir: escribe y borra frases
 * rotativas con cursor parpadeante (estilo Fensivo).
 */
export function TypewriterPill() {
  const { t, lang } = useI18n();
  const phrases = [t("home.type1"), t("home.type2"), t("home.type3")];
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Reinicia al cambiar de idioma
    setText("");
    setPhase("typing");
    setIndex(0);
  }, [lang]);

  useEffect(() => {
    const current = phrases[index] ?? "";
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timer = setTimeout(() => setText(current.slice(0, text.length + 1)), 55);
      } else {
        timer = setTimeout(() => setPhase("holding"), 0);
      }
    } else if (phase === "holding") {
      timer = setTimeout(() => setPhase("deleting"), 2100);
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(current.slice(0, text.length - 1)), 26);
      } else {
        timer = setTimeout(() => {
          setIndex((i) => (i + 1) % phrases.length);
          setPhase("typing");
        }, 320);
      }
    }
    return () => clearTimeout(timer);
  }, [text, phase, index, phrases]);

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-6xl flex-col items-center justify-center gap-1 rounded-[2.5rem] border border-border/80 bg-surface/70 px-6 py-8 text-center shadow-2xl shadow-black/30 backdrop-blur-md md:min-h-[152px] md:flex-row md:flex-nowrap md:gap-4 md:px-14 md:py-12">
        {/* Línea con alto fijo para que no haya saltos mientras se escribe */}
        <span className="flex min-h-[2.6rem] items-center justify-center gap-2 whitespace-nowrap font-display text-2xl font-extrabold leading-tight tracking-tight text-foreground sm:min-h-[3rem] sm:text-3xl md:min-h-[3.75rem] md:text-5xl">
          <span>{text}</span>
          <span
            aria-hidden="true"
            className="type-cursor inline-block h-7 w-[3px] shrink-0 rounded-full bg-primary sm:h-9 md:h-12 md:w-[4px]"
          />
        </span>
        <span className="whitespace-nowrap font-display text-2xl font-extrabold leading-tight tracking-tight text-muted-foreground sm:text-3xl md:text-5xl">

          {t("home.typeFixed")}
        </span>
      </div>
    </div>
  );
}

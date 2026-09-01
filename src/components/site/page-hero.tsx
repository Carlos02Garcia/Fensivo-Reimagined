import type { ReactNode } from "react";
import { Eyebrow } from "@/components/site/primitives";

export function PageHero({
  kicker,
  title,
  intro,
  children,
}: {
  kicker: string;
  title: ReactNode;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 grid-field opacity-70" />
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/10 to-transparent" />
      <div className="relative mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Eyebrow>{kicker}</Eyebrow>
        <h1 className="mt-6 max-w-4xl font-display text-4xl font-extrabold leading-[1.08] md:text-5xl">{title}</h1>
        {intro ? <p className="mt-5 max-w-2xl text-muted-foreground md:text-lg">{intro}</p> : null}
        {children}
      </div>
    </section>
  );
}

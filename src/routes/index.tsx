import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-cyber.jpg";
import { Eyebrow, Reveal, Section } from "@/components/site/primitives";
import { LogoMarquee } from "@/components/site/logo-marquee";
import { Fensivo360Showcase, Trend } from "@/components/site/product-ui";
import { TypewriterPill } from "@/components/site/typewriter-pill";
import { ShotsGallery, type ShotKey } from "@/components/site/shots-gallery";
import { SwarmBackground } from "@/components/site/swarm-background";

import { HumanRiskFlow } from "@/components/site/human-risk-flow";
import { MethodSteps } from "@/components/site/method-steps";
import { EmployeeJourney } from "@/components/site/employee-journey";
import { RolesGrid, Integrations } from "@/components/site/roles-integrations";
import { Testimonials } from "@/components/site/testimonials";
import { SignalMap } from "@/components/site/signal-map";
import { useI18n } from "@/lib/i18n";
import { landingCopy } from "@/lib/landing-copy";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fensivo — Gestión de riesgo humano para equipos de seguridad" },
      {
        name: "description",
        content:
          "Fensivo 360 identifica, mide y reduce el riesgo humano: credenciales expuestas, phishing y entrenamiento contextual en una sola plataforma.",
      },
      { property: "og:title", content: "Fensivo — Phishing y amenazas bajo control" },
      {
        property: "og:description",
        content: "Identifica, mide y reduce el riesgo humano con Fensivo 360.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Hero() {
  const { lang } = useI18n();
  const c = landingCopy(lang);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1088}
          className="size-full object-cover"
          style={{
            maskImage: "linear-gradient(to bottom, black 0%, black 45%, transparent 96%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 45%, transparent 96%)",
          }}
        />
        {/* Tinte suave que también desaparece: el fondo global continúa sin costuras */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in oklab, var(--color-background) 35%, transparent) 0%, color-mix(in oklab, var(--color-background) 15%, transparent) 35%, transparent 70%)",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 96%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 96%)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_18%,color-mix(in_oklab,var(--color-primary)_16%,transparent),transparent_70%)]" />
        <div className="absolute inset-0 grid-field opacity-50" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-32 md:px-8 md:pb-28 md:pt-40">
        <Reveal>
          <Eyebrow>{c.heroKicker}</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-7 font-display text-[2.9rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:whitespace-nowrap lg:text-[5rem]">
            <span className="block lg:inline">{c.heroA}</span>{" "}
            <span className="block text-gradient lg:inline">{c.heroB}</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-7 max-w-2xl text-xl leading-relaxed text-muted-foreground md:text-2xl">{c.heroSub}</p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/platform/fensivo-360"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {c.ctaPrimary} <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/demo"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-7 py-3.5 text-base font-semibold backdrop-blur transition-colors hover:border-primary/60"
            >
              {c.ctaSecondary}
            </Link>
          </div>
        </Reveal>

        <Reveal delay={320} className="mt-16">
          <TypewriterPill />
        </Reveal>
      </div>


    </section>
  );
}

function Home() {
  const { lang } = useI18n();
  const c = landingCopy(lang);
  const [shot, setShot] = useState<ShotKey>("risk");



  return (
    <>
      <Hero />

      <Section className="border-t-0 py-14 md:py-16">
        <LogoMarquee label={c.trustLabel} />
      </Section>

      <Section>
        <Reveal>
          <h2 className="max-w-4xl font-display text-4xl font-bold leading-[1.1] md:text-6xl">{c.problemTitle}</h2>
        </Reveal>
        <Reveal delay={120} className="mt-14">
          <HumanRiskFlow />
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <h2 className="font-display text-4xl font-bold leading-[1.1] md:text-6xl">{c.methodTitle}</h2>
        </Reveal>
        <Reveal delay={120} className="mt-14">
          <MethodSteps />
        </Reveal>
      </Section>

      <Section id="fensivo-360">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h2 className="font-display text-4xl font-bold leading-[1.1] md:text-6xl">{c.meet}</h2>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground md:text-xl">{c.meetSub}</p>
          </Reveal>
          <Reveal delay={100}>
            <Link
              to="/platform/fensivo-360"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-primary/60"
            >
              {c.ctaPrimary} <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
        <Reveal delay={120} className="mt-12">
          <ShotsGallery active={shot} onSelect={setShot} />
        </Reveal>
        <Reveal delay={160} className="mt-6">
          <Fensivo360Showcase
            tab={shot}
            onTabChange={setShot}
            onPerson={() => document.getElementById("journey")?.scrollIntoView({ behavior: "smooth", block: "start" })}
          />
        </Reveal>

      </Section>

      <Section>
        <Reveal>
          <SignalMap />
        </Reveal>
      </Section>

      <Section id="journey">
        <Reveal>
          <h2 className="max-w-4xl font-display text-4xl font-bold leading-[1.1] md:text-5xl">{c.journeyTitle}</h2>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">{c.journeySub}</p>
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <EmployeeJourney />
        </Reveal>
      </Section>

      <Section>
        <div className="grid gap-10 rounded-3xl border border-border bg-surface p-8 md:grid-cols-[1.1fr_1fr] md:items-center md:p-14">
          <Reveal>
            <Eyebrow>{c.insightTitle}</Eyebrow>
            <p className="mt-6 font-display text-3xl font-bold leading-tight md:text-5xl">{c.insightMain}</p>
            <p className="mt-5 text-lg text-muted-foreground">{c.insightSub}</p>
            <p className="mt-6 inline-flex rounded-full border border-warning/40 bg-warning/10 px-4 py-2 text-sm font-semibold text-warning">
              {c.insightAction}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-border bg-background/60 p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{c.trend}</p>
              <Trend points={[64, 61, 58, 55, 50, 47, 44, 38]} height={170} />
              <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border/60 pt-4 text-center">
                {[["38", c.hrs], ["12", c.highRisk], ["4", c.exposures]].map(([v, l]) => (
                  <div key={l}>
                    <p className="font-display text-2xl font-bold">{v}</p>
                    <p className="text-[11px] leading-tight text-muted-foreground">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <h2 className="font-display text-4xl font-bold leading-[1.1] md:text-5xl">{c.rolesTitle}</h2>
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <RolesGrid />
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <h2 className="font-display text-4xl font-bold leading-[1.1] md:text-5xl">{c.testimonialsTitle}</h2>
        </Reveal>
        <Reveal delay={100} className="mt-12">
          <Testimonials />
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <Integrations />
        </Reveal>
      </Section>

      <Section>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/12 via-surface to-background p-10 md:p-16">
          <SwarmBackground intensity={0.45} className="opacity-70" />
          <Reveal className="relative">
            <h2 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.08] md:text-6xl">
              {c.finalTitle}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">{c.finalSub}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/demo"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                {c.ctaSecondary} <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-base font-semibold transition-colors hover:border-primary/60"
              >
                {c.ctaPrimary}
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

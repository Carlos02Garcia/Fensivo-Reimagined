import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/site/contact-form";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/primitives";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contacto — Fensivo" },
      {
        name: "description",
        content: "Escríbenos para hablar con el equipo de Fensivo sobre visibilidad, riesgo y detección de amenazas.",
      },
      { property: "og:title", content: "Contacto — Fensivo" },
      { property: "og:description", content: "Habla con nuestro equipo de seguridad." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title={<>Hablemos de tu superficie de ataque.</>}
        intro="Respondemos en menos de un día hábil. Este formulario es una demostración y no envía datos a ningún servidor."
      />
      <Section className="border-t-0">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <ContactForm submitLabel="Enviar mensaje" />
          <div className="space-y-4">
            {[
              ["Ventas", "sales@fensivo.demo"],
              ["Soporte", "support@fensivo.demo"],
              ["Seguridad", "security@fensivo.demo"],
            ].map(([t, v]) => (
              <div key={t} className="rounded-2xl border border-border bg-surface p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">{t}</p>
                <p className="mt-2 text-sm">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

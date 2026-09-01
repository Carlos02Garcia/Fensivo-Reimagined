import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

const field =
  "w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary/60";

export function ContactForm({ submitLabel = "Request Demo" }: { submitLabel?: string }) {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-success/40 bg-success/5 p-10 text-center">
        <CheckCircle2 className="mx-auto size-10 text-success" />
        <p className="mt-5 font-display text-2xl font-bold">Solicitud recibida</p>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          Un especialista de Fensivo se pondrá en contacto en menos de un día hábil para coordinar la sesión.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-7 rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:border-primary/60"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-surface/60 p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="text-muted-foreground">Nombre</span>
          <input required name="name" className={`mt-1.5 ${field}`} placeholder="Nombre y apellido" />
        </label>
        <label className="text-sm">
          <span className="text-muted-foreground">Empresa</span>
          <input required name="company" className={`mt-1.5 ${field}`} placeholder="Empresa" />
        </label>
        <label className="text-sm">
          <span className="text-muted-foreground">Correo corporativo</span>
          <input required type="email" name="email" className={`mt-1.5 ${field}`} placeholder="nombre@empresa.com" />
        </label>
        <label className="text-sm">
          <span className="text-muted-foreground">Teléfono</span>
          <input name="phone" className={`mt-1.5 ${field}`} placeholder="+57 300 000 0000" />
        </label>
        <label className="text-sm sm:col-span-2">
          <span className="text-muted-foreground">Tamaño de la empresa</span>
          <select name="size" className={`mt-1.5 ${field}`} defaultValue="">
            <option value="" disabled>
              Selecciona una opción
            </option>
            {["1-50", "51-200", "201-1000", "1001-5000", "5000+"].map((s) => (
              <option key={s} value={s}>
                {s} empleados
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm sm:col-span-2">
          <span className="text-muted-foreground">Necesidades de seguridad</span>
          <textarea
            name="needs"
            rows={4}
            className={`mt-1.5 ${field}`}
            placeholder="Cuéntanos qué quieres resolver: visibilidad, vulnerabilidades, cumplimiento, detección…"
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-6 w-full rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
      >
        {submitLabel}
      </button>
      <p className="mt-4 text-xs text-muted-foreground">
        Demostración sin backend: la información no se almacena ni se envía.
      </p>
    </form>
  );
}

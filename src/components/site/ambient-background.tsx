import { useEffect, useRef } from "react";

import { SwarmBackground } from "@/components/site/swarm-background";
import { CyberPulses } from "@/components/site/cyber-pulses";

type Dot = { x: number; y: number; r: number; phase: number; speed: number; hue: number };

/**
 * Fondo ambiental global, sutil y "enterprise security":
 * rejilla técnica en deriva lenta, auroras degradadas y puntos que parpadean
 * como señales monitorizadas. Sin interacción, sin robar protagonismo.
 */
export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let dots: Dot[] = [];
    let raf = 0;
    let t = 0;

    const build = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 640 ? 22 : w < 1024 ? 40 : 64;
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.8 + Math.random() * 1.6,
        phase: Math.random() * Math.PI * 2,
        speed: 0.004 + Math.random() * 0.012,
        hue: [205, 215, 222][Math.floor(Math.random() * 3)] ?? 215,
      }));
    };

    const frame = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.phase += d.speed;
        const a = (Math.sin(d.phase) * 0.5 + 0.5) * 0.5;
        d.y -= 0.05;
        if (d.y < -4) d.y = h + 4;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${d.hue}, 90%, 72%, ${a})`;
        ctx.shadowBlur = 8 * a;
        ctx.shadowColor = `hsla(${d.hue}, 90%, 70%, ${a * 0.8})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      raf = requestAnimationFrame(frame);
    };

    build();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", build);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base fluida: degradado vertical suave sin saltos de color, constante de principio a fin */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklab, var(--color-primary) 7%, transparent) 0%, color-mix(in oklab, var(--color-primary) 3%, transparent) 38%, color-mix(in oklab, var(--color-signal) 3%, transparent) 72%, color-mix(in oklab, var(--color-cyan) 4%, transparent) 100%)",
        }}
      />
      <div className="absolute inset-0 grid-field grid-drift opacity-[0.55]" />
      <div className="absolute -left-1/4 top-[-20%] size-[70vw] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-primary)_16%,transparent),transparent_65%)] blur-3xl aurora-a" />
      <div className="absolute -right-1/4 top-1/3 size-[65vw] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-signal)_13%,transparent),transparent_65%)] blur-3xl aurora-b" />
      <div className="absolute bottom-[-25%] left-1/4 size-[60vw] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-cyan)_10%,transparent),transparent_65%)] blur-3xl aurora-c" />
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      <SwarmBackground intensity={0.5} className="opacity-70" />
      <CyberPulses />
      <div className="absolute inset-0 scan-sweep" />
    </div>
  );
}

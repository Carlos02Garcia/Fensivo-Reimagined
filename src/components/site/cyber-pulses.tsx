import { useEffect, useRef } from "react";

type Path = { x0: number; y0: number; cx: number; cy: number; x1: number; y1: number };
type Pulse = { path: number; t: number; speed: number; hue: number; size: number };
type Bolt = { pts: { x: number; y: number }[]; life: number; max: number };

/**
 * Capa de "energía" para el Hero: pulsos de datos que viajan por rutas
 * curvas (como tráfico monitorizado) y relámpagos ocasionales muy sutiles.
 */
export function CyberPulses() {
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
    let paths: Path[] = [];
    let pulses: Pulse[] = [];
    let bolts: Bolt[] = [];
    let raf = 0;
    let nextBolt = 240; // frames hasta el primer relámpago

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(rect.width, 1);
      h = Math.max(rect.height, 1);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const pathCount = w < 640 ? 4 : 7;
      paths = Array.from({ length: pathCount }, (_, i) => {
        const y = (h / (pathCount + 1)) * (i + 1) + rand(-30, 30);
        const dir = Math.random() < 0.5 ? 1 : -1;
        return {
          x0: -40,
          y0: y,
          cx: w * rand(0.3, 0.7),
          cy: y + dir * rand(40, 140),
          x1: w + 40,
          y1: y + dir * rand(-20, 60),
        };
      });

      const pulseCount = w < 640 ? 8 : 16;
      pulses = Array.from({ length: pulseCount }, () => ({
        path: Math.floor(Math.random() * paths.length),
        t: Math.random(),
        speed: rand(0.0016, 0.0042),
        hue: [200, 210, 215, 262][Math.floor(Math.random() * 4)] ?? 210,
        size: rand(1.4, 2.6),
      }));
      bolts = [];
    };

    const pointAt = (p: Path, t: number) => {
      const u = 1 - t;
      return {
        x: u * u * p.x0 + 2 * u * t * p.cx + t * t * p.x1,
        y: u * u * p.y0 + 2 * u * t * p.cy + t * t * p.y1,
      };
    };

    const spawnBolt = () => {
      const x = rand(w * 0.15, w * 0.85);
      const yEnd = rand(h * 0.35, h * 0.75);
      const pts = [{ x, y: -10 }];
      let px = x;
      let py = -10;
      while (py < yEnd) {
        py += rand(18, 42);
        px += rand(-26, 26);
        pts.push({ x: px, y: py });
      }
      bolts.push({ pts, life: 1, max: rand(0.5, 0.8) });
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);

      // Rutas apenas visibles (circuito tenue)
      ctx.lineWidth = 0.7;
      for (const p of paths) {
        ctx.strokeStyle = "hsla(210, 85%, 70%, 0.05)";
        ctx.beginPath();
        ctx.moveTo(p.x0, p.y0);
        ctx.quadraticCurveTo(p.cx, p.cy, p.x1, p.y1);
        ctx.stroke();
      }

      // Pulsos viajando con estela
      for (const pl of pulses) {
        pl.t += pl.speed;
        if (pl.t > 1) {
          pl.t = 0;
          pl.path = Math.floor(Math.random() * paths.length);
        }
        const p = paths[pl.path]!;
        for (let k = 0; k < 6; k++) {
          const tt = pl.t - k * 0.012;
          if (tt < 0) continue;
          const { x, y } = pointAt(p, tt);
          const a = (1 - k / 6) * 0.55;
          ctx.beginPath();
          ctx.arc(x, y, pl.size * (1 - k / 8), 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${pl.hue}, 95%, 72%, ${a})`;
          if (k === 0) {
            ctx.shadowBlur = 14;
            ctx.shadowColor = `hsla(${pl.hue}, 95%, 70%, 0.9)`;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Relámpagos ocasionales
      nextBolt -= 1;
      if (nextBolt <= 0) {
        spawnBolt();
        nextBolt = Math.floor(rand(360, 780)); // cada 6–13 s aprox.
      }
      bolts = bolts.filter((b) => b.life > 0);
      for (const b of bolts) {
        b.life -= 0.02;
        const a = Math.max(b.life, 0) * b.max;
        // Resplandor ambiental del destello
        const last = b.pts[b.pts.length - 1]!;
        const g = ctx.createRadialGradient(last.x, last.y, 0, last.x, last.y, 220);
        g.addColorStop(0, `hsla(205, 95%, 75%, ${a * 0.14})`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(last.x - 220, last.y - 220, 440, 440);
        // Trazo del rayo
        ctx.lineWidth = 1.4;
        ctx.strokeStyle = `hsla(200, 100%, 82%, ${a})`;
        ctx.shadowBlur = 18;
        ctx.shadowColor = `hsla(200, 100%, 75%, ${a})`;
        ctx.beginPath();
        ctx.moveTo(b.pts[0]!.x, b.pts[0]!.y);
        for (const pt of b.pts.slice(1)) ctx.lineTo(pt.x, pt.y);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(frame);
    };

    build();
    raf = requestAnimationFrame(frame);
    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full"
    />
  );
}

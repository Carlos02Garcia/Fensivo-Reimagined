import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Shard = {
  x: number;
  y: number;
  z: number; // depth 0.3 - 1
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  size: number;
  sides: number;
  hue: number;
  glow: number;
};

// Paleta Fensivo: navy / azul tecnológico / cian, con acentos púrpura y rosa muy pálido
const HUES = [222, 214, 205, 262, 330];

function densityFor(width: number) {
  if (width < 640) return 26;
  if (width < 1024) return 48;
  return 84;
}

export function SwarmBackground({
  className,
  intensity = 1,
}: {
  className?: string;
  intensity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);

    let w = 0;
    let h = 0;
    let shards: Shard[] = [];
    let raf = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(rect.width, 1);
      h = Math.max(rect.height, 1);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(densityFor(w) * intensity);
      shards = Array.from({ length: count }, () => {
        const z = rand(0.3, 1);
        return {
          x: rand(0, w),
          y: rand(0, h),
          z,
          vx: rand(-0.16, 0.16) * z,
          vy: rand(-0.12, 0.12) * z,
          rot: rand(0, Math.PI * 2),
          vrot: rand(-0.0035, 0.0035),
          size: rand(4, 13) * z,
          sides: Math.random() < 0.55 ? 4 : Math.random() < 0.6 ? 3 : 6,
          hue: HUES[Math.floor(Math.random() * HUES.length)] ?? 222,
          glow: 0,
        };
      });
    };

    const drawShard = (s: Shard) => {
      const alpha = (0.14 + s.z * 0.3) * (1 + s.glow * 1.2);
      const scale = 1 + s.glow * 0.45;
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rot);
      ctx.beginPath();
      const r = s.size * scale;
      for (let i = 0; i < s.sides; i++) {
        const a = (i / s.sides) * Math.PI * 2 - Math.PI / 2;
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r * (s.sides === 4 ? 1.35 : 1);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      const light = 62 + s.z * 14;
      ctx.fillStyle = `hsla(${s.hue}, 82%, ${light}%, ${alpha * 0.22})`;
      ctx.strokeStyle = `hsla(${s.hue}, 88%, ${light + 8}%, ${Math.min(alpha, 0.85)})`;
      ctx.lineWidth = 0.9;
      if (s.glow > 0.02) {
        ctx.shadowBlur = 16 * s.glow;
        ctx.shadowColor = `hsla(${s.hue}, 90%, 70%, ${0.7 * s.glow})`;
      }
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);

      for (const s of shards) {
        s.x += s.vx;
        s.y += s.vy;
        s.rot += s.vrot;

        if (s.x < -40) s.x = w + 40;
        if (s.x > w + 40) s.x = -40;
        if (s.y < -40) s.y = h + 40;
        if (s.y > h + 40) s.y = -40;

        const dx = s.x - mouse.x;
        const dy = s.y - mouse.y;
        const d = Math.hypot(dx, dy);
        const radius = 150;
        const target = mouse.active && d < radius ? 1 - d / radius : 0;
        s.glow += (target - s.glow) * 0.08;
        if (target > 0.15) {
          s.x += (dx / (d || 1)) * 0.25 * target;
          s.y += (dy / (d || 1)) * 0.25 * target;
        }
      }

      // Red discreta alrededor del cursor
      if (mouse.active && w > 640) {
        const near = shards.filter((s) => s.glow > 0.18).slice(0, 10);
        ctx.save();
        ctx.setLineDash([2, 5]);
        ctx.lineWidth = 0.7;
        for (let i = 0; i < near.length; i++) {
          for (let j = i + 1; j < near.length; j++) {
            const a = near[i]!;
            const b = near[j]!;
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            if (dist > 170) continue;
            const op = Math.min(a.glow, b.glow) * (1 - dist / 170) * 0.55;
            ctx.strokeStyle = `hsla(200, 90%, 72%, ${op})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      for (const s of shards) drawShard(s);
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = e.pointerType !== "touch";
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    build();
    if (reduced) {
      for (const s of shards) drawShard(s);
    } else {
      raf = requestAnimationFrame(frame);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
    }

    const ro = new ResizeObserver(() => build());
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
    />
  );
}

'use client';
import { useEffect, useRef } from 'react';

// Berkeley-style particle network
// - Dense connected graph, uniform small dots, no random glow
// - Mouse brightens nearby connections (no repulsion)
// - Brand colors: #FF9900 orange, #4986E8 blue, rest grey

const CONNECT_DIST = 175;     // px — edge drawn if closer than this
const MOUSE_RADIUS = 160;     // px — mouse brightens edges/nodes in range
const SPEED        = 0.3;     // base speed (very uniform, slight variance)

type Color = 'orange' | 'blue' | 'grey';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  color: Color;
}

// RGB values for each color — matches icon.svg exactly
const RGB: Record<Color, string> = {
  orange: '255,153,0',     // #FF9900
  blue:   '73,134,232',    // #4986E8
  grey:   '90,110,160',    // mid blue-grey, readable on light bg
};

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0;
    const mouse = { x: -9999, y: -9999 };
    let raf: number;
    let particles: Particle[] = [];

    // ~1 particle per 9000px², capped at 180
    const targetCount = () => Math.min(180, Math.floor((w * h) / 9000));

    const mkParticle = (x?: number, y?: number): Particle => {
      const roll = Math.random();
      const color: Color = roll < 0.15 ? 'orange' : roll < 0.35 ? 'blue' : 'grey';
      // Very slight speed variance — keeps the network feeling alive but calm
      const angle = Math.random() * Math.PI * 2;
      const spd   = SPEED * (0.7 + Math.random() * 0.6);
      return {
        x: x ?? Math.random() * w,
        y: y ?? Math.random() * h,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        r: color === 'grey' ? 2.0 : 2.5,  // uniform, accent nodes slightly bigger
        color,
      };
    };

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const n = targetCount();
      // Rebuild if very different size; otherwise keep existing particles
      if (Math.abs(particles.length - n) > 20) {
        particles = Array.from({ length: n }, () => mkParticle());
      }
    };

    const onMouseMove  = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    onResize();
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // ── Move particles ─────────────────────────────────────
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        // Wrap around edges with a small buffer
        if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20; else if (p.y > h + 20) p.y = -20;
      }

      // ── Draw edges ─────────────────────────────────────────
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > CONNECT_DIST * CONNECT_DIST) continue;

          const d = Math.sqrt(d2);
          const t = 1 - d / CONNECT_DIST; // 1 near, 0 at threshold

          // Mouse proximity — brighten edges near cursor
          const mx = (a.x + b.x) / 2 - mouse.x;
          const my = (a.y + b.y) / 2 - mouse.y;
          const mouseDist = Math.sqrt(mx * mx + my * my);
          const mouseBoost = Math.max(0, 1 - mouseDist / MOUSE_RADIUS) * 0.45;

          // Edge color: prefer accent color if either endpoint is accent
          const rgb = (a.color === 'orange' || b.color === 'orange') ? RGB.orange
                    : (a.color === 'blue'   || b.color === 'blue')   ? RGB.blue
                    : RGB.grey;

          const alpha = Math.min(0.65, t * 0.18 + mouseBoost);

          ctx.beginPath();
          ctx.strokeStyle = `rgba(${rgb},${alpha})`;
          ctx.lineWidth   = 0.7 + mouseBoost * 0.8;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // ── Draw nodes ─────────────────────────────────────────
      for (const p of particles) {
        const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
        const md  = Math.sqrt(mdx * mdx + mdy * mdy);
        const prox = Math.max(0, 1 - md / MOUSE_RADIUS);

        const rgb   = RGB[p.color];
        // Base alpha: accent nodes darker, grey nodes subtler
        const base  = p.color === 'grey' ? 0.45 : 0.75;
        const alpha = Math.min(1, base + prox * 0.3);
        const r     = p.r + prox * 1.5; // very slight size boost near mouse

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
    />
  );
}

import { useEffect, useRef } from 'react';

/**
 * NightSky — canvas starfield with occasional comets. No dependencies.
 *
 * Realism comes from three things, not from adding more stars:
 *  - a magnitude distribution (many faint, very few bright), not uniform sizes
 *  - stellar colour temperature (blue-white / white / amber), never pure grey
 *  - scintillation only on the brighter stars, each on its own period, so the
 *    sky never blinks in unison
 *
 * Honours prefers-reduced-motion (static sky, no comets) and stops the loop
 * while the section is offscreen or the tab is hidden.
 */

// Stellar colour temperatures, warm to hot. Weighted toward white.
const STAR_TINTS = [
  { rgb: '255, 244, 232', weight: 0.2 }, // warm / K-type
  { rgb: '255, 255, 255', weight: 0.52 }, // white / G-type
  { rgb: '214, 236, 255', weight: 0.2 }, // blue-white / A-type
  { rgb: '178, 216, 255', weight: 0.08 }, // hot blue / B-type
];

const pickTint = () => {
  let r = Math.random();
  for (const tint of STAR_TINTS) {
    if (r < tint.weight) return tint.rgb;
    r -= tint.weight;
  }
  return STAR_TINTS[1].rgb;
};

/** Pre-render one star sprite per colour: bright core plus falloff halo. */
const makeSprite = (rgb) => {
  const size = 64;
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  grad.addColorStop(0, `rgba(${rgb}, 1)`);
  grad.addColorStop(0.08, `rgba(${rgb}, 0.95)`);
  grad.addColorStop(0.22, `rgba(${rgb}, 0.35)`);
  grad.addColorStop(0.5, `rgba(${rgb}, 0.08)`);
  grad.addColorStop(1, `rgba(${rgb}, 0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
};

const NightSky = ({
  /** Stars per 10.000 px². Restraint is the point — this is a backdrop. */
  density = 1.15,
  /** Seconds between comets, randomised within the range. */
  cometInterval = [7, 16],
  className = '',
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const sprites = new Map();
    const spriteFor = (rgb) => {
      if (!sprites.has(rgb)) sprites.set(rgb, makeSprite(rgb));
      return sprites.get(rgb);
    };

    let width = 0;
    let height = 0;
    let dpr = 1;
    let stars = [];
    let comets = [];
    let nextComet = 0;

    function buildStars() {
      const count = Math.round(((width * height) / 10000) * density);
      stars = Array.from({ length: count }, () => {
        // Cubed random → a sky of faint stars with a handful of bright ones.
        const magnitude = Math.pow(Math.random(), 3);
        const rgb = pickTint();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          rgb,
          sprite: spriteFor(rgb),
          radius: 0.55 + magnitude * 2.1,
          alpha: 0.3 + magnitude * 0.68,
          // Only the brighter stars scintillate, and each on its own clock.
          twinkle: magnitude > 0.32 ? 0.16 + magnitude * 0.26 : 0,
          period: 2.4 + Math.random() * 4.2,
          phase: Math.random() * Math.PI * 2,
          spike: magnitude > 0.82,
        };
      });
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
      if (reduced) draw(0);
    }

    function spawnComet() {
      // Enter from the top edge or the upper flank, always heading down-screen.
      const fromLeft = Math.random() < 0.5;
      const angle = (fromLeft ? 1 : -1) * (0.32 + Math.random() * 0.24);
      const speed = 480 + Math.random() * 420;
      comets.push({
        x: fromLeft ? -60 : width + 60,
        y: Math.random() * height * 0.55 - height * 0.1,
        vx: Math.cos(angle) * speed * (fromLeft ? 1 : -1),
        vy: Math.sin(Math.abs(angle)) * speed,
        life: 0,
        span: 1.1 + Math.random() * 0.7,
        length: 130 + Math.random() * 170,
        width: 1.1 + Math.random() * 1.1,
        rgb: Math.random() < 0.25 ? '214, 236, 255' : '255, 252, 245',
      });
    }

    function drawComet(comet) {
      const t = comet.life / comet.span;
      // Fade in fast, fade out slow — a real meteor brightens then burns out.
      const fade = Math.min(1, t / 0.14) * (1 - Math.pow(t, 1.7));
      if (fade <= 0) return;

      const speed = Math.hypot(comet.vx, comet.vy) || 1;
      const dx = comet.vx / speed;
      const dy = comet.vy / speed;
      const segments = 22;

      ctx.lineCap = 'round';
      for (let i = 0; i < segments; i++) {
        const a = i / segments;
        const b = (i + 1) / segments;
        // Tail tapers in both width and opacity as it trails behind the head.
        const taper = Math.pow(1 - a, 2.1);
        ctx.globalAlpha = fade * taper * 0.85;
        ctx.strokeStyle = `rgba(${comet.rgb}, 1)`;
        ctx.lineWidth = comet.width * taper;
        ctx.beginPath();
        ctx.moveTo(comet.x - dx * comet.length * a, comet.y - dy * comet.length * a);
        ctx.lineTo(comet.x - dx * comet.length * b, comet.y - dy * comet.length * b);
        ctx.stroke();
      }

      // Head glow
      const head = 9;
      ctx.globalAlpha = fade;
      ctx.drawImage(
        spriteFor(comet.rgb),
        comet.x - head,
        comet.y - head,
        head * 2,
        head * 2,
      );
      ctx.globalAlpha = 1;
    }

    function draw(time) {
      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        const scintillation = star.twinkle
          ? 1 + Math.sin((time / star.period) * Math.PI * 2 + star.phase) * star.twinkle
          : 1;
        const alpha = Math.min(1, star.alpha * scintillation);
        const size = star.radius * 7 * (0.94 + (scintillation - 1) * 0.3);

        ctx.globalAlpha = alpha;
        ctx.drawImage(
          star.sprite,
          star.x - size / 2,
          star.y - size / 2,
          size,
          size,
        );

        // The brightest few get a faint diffraction cross — the detail that
        // reads as "photographed" rather than "dots on a div".
        if (star.spike) {
          const len = star.radius * 6.5;
          ctx.globalAlpha = alpha * 0.22;
          ctx.strokeStyle = `rgba(${star.rgb}, 1)`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(star.x - len, star.y);
          ctx.lineTo(star.x + len, star.y);
          ctx.moveTo(star.x, star.y - len);
          ctx.lineTo(star.x, star.y + len);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      for (const comet of comets) drawComet(comet);
    }

    let frameId = null;
    let last = 0;
    let elapsed = 0;

    function frame(now) {
      frameId = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      elapsed += dt;

      if (elapsed >= nextComet) {
        spawnComet();
        nextComet =
          elapsed +
          cometInterval[0] +
          Math.random() * (cometInterval[1] - cometInterval[0]);
      }

      for (const comet of comets) {
        comet.x += comet.vx * dt;
        comet.y += comet.vy * dt;
        comet.life += dt;
      }
      comets = comets.filter((c) => c.life < c.span);

      draw(elapsed);
    }

    function start() {
      if (reduced || frameId !== null) return;
      last = performance.now();
      frameId = requestAnimationFrame(frame);
    }
    function stop() {
      if (frameId === null) return;
      cancelAnimationFrame(frameId);
      frameId = null;
    }

    resize();
    nextComet = cometInterval[0] * 0.45;

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    let onScreen = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen && !document.hidden) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (onScreen) start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      io.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [density, cometInterval, className]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};

export default NightSky;

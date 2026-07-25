/**
 * DIRECTION CONTRACT
 * THESIS: The landing IS the flyer brought to life — the celestial atmosphere,
 * hierarchy, and energy decomposed into immersive web sections with real motion.
 * Refuses: showing the flyer as a flat image wrapper.
 * OWN-WORLD: Deep navy→teal gradients, cyan light rays, peach CTA warmth.
 * Cloud atmosphere, ethereal glow. Bebas Neue dramatic, Montserrat body.
 * STORY: Land in heaven's gate → event identity → verse promise →
 * speakers → details → register.
 * FIRST VIEWPORT: Full-bleed celestial gradient with animated light columns,
 * Fervor logo at hero scale, date strip anchored bottom.
 * FORM: Immersive editorial scroll · Persuade mode.
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import {
  ArrowRight,
  MapPin,
  Clock3,
  CalendarDays,
  Instagram,
  Heart,
} from 'lucide-react';

const PREACHERS = [
  { name: 'Jhon Fabio García', role: 'Secretario de la IPUC', title: 'Pastor' },
  { name: 'David Alomia', role: 'Viceveedor Nacional', title: 'Pastor' },
  { name: 'Jader Moreno', role: 'Supervisor D22', title: 'Pastor' },
  { name: 'Jorge Yepes', role: 'Presbítero B D9', title: 'Pastor' },
  { name: 'Carlos Carvajal', role: 'Vicepresidente CP D9', title: 'Pastor' },
];

/* ─── Animated light columns in hero ─── */
const LightRays = () => (
  <div
    className="pointer-events-none absolute inset-0 overflow-hidden"
    aria-hidden="true"
  >
    {[
      { left: '10%', width: '2px', delay: '0s', dur: '4s', opacity: 0.3 },
      { left: '25%', width: '3px', delay: '1.2s', dur: '5s', opacity: 0.2 },
      { left: '42%', width: '1px', delay: '0.6s', dur: '3.5s', opacity: 0.35 },
      { left: '58%', width: '2px', delay: '2s', dur: '4.5s', opacity: 0.25 },
      { left: '73%', width: '3px', delay: '0.3s', dur: '5.5s', opacity: 0.18 },
      { left: '88%', width: '1px', delay: '1.8s', dur: '4s', opacity: 0.3 },
    ].map((ray, i) => (
      <div
        key={i}
        className="light-ray absolute top-0"
        style={{
          left: ray.left,
          width: ray.width,
          height: '100%',
          background: `linear-gradient(180deg, transparent 0%, rgba(5,219,242,${ray.opacity}) 30%, rgba(5,219,242,${ray.opacity * 0.6}) 60%, transparent 100%)`,
          animationDelay: ray.delay,
          animationDuration: ray.dur,
        }}
      />
    ))}
  </div>
);

/* ─── Floating particles ─── */
const Particles = () => (
  <div
    className="pointer-events-none absolute inset-0 overflow-hidden"
    aria-hidden="true"
  >
    {Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="particle absolute rounded-full bg-terceary"
        style={{
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.5 + 0.1,
          animationDelay: `${Math.random() * 8}s`,
          animationDuration: `${Math.random() * 6 + 6}s`,
        }}
      />
    ))}
  </div>
);

/* ─── Interactive mouse-reactive orbs ─── */
const MouseOrbs = ({ mouseX, mouseY }) => {
  const orbs = [
    { size: 400, color: 'terceary', baseX: 15, baseY: 20, factor: 30 },
    { size: 300, color: 'peach', baseX: 80, baseY: 70, factor: -20 },
    { size: 250, color: 'terceary', baseX: 60, baseY: 30, factor: 15 },
    { size: 200, color: 'secondary', baseX: 30, baseY: 80, factor: -25 },
  ];

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-${orb.color}/[0.04] blur-[120px]`}
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.baseX}%`,
            top: `${orb.baseY}%`,
            x: useSpring(useTransform(mouseX, [0, 1], [0, orb.factor]), {
              stiffness: 50,
              damping: 30,
            }),
            y: useSpring(useTransform(mouseY, [0, 1], [0, orb.factor * 0.6]), {
              stiffness: 50,
              damping: 30,
            }),
          }}
        />
      ))}
    </div>
  );
};

/* ─── Speakers section with interactive background ─── */
const SpeakersSection = ({ preachers, reduceMotion }) => {
  const sectionRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY],
  );

  const initial = reduceMotion ? false : 'hidden';
  const reveal = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-gradient-to-b from-primary via-celestial to-primary px-5 py-28 sm:px-8 md:py-36"
    >
      {/* Mouse-reactive orbs */}
      <MouseOrbs mouseX={mouseX} mouseY={mouseY} />

      {/* Floating grid lines */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-[20%] top-0 h-full w-px bg-gradient-to-b from-transparent via-terceary/[0.06] to-transparent" />
        <div className="absolute left-[50%] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/[0.04] to-transparent" />
        <div className="absolute left-[80%] top-0 h-full w-px bg-gradient-to-b from-transparent via-terceary/[0.06] to-transparent" />
        <div className="absolute left-0 top-[30%] h-px w-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        <div className="absolute left-0 top-[70%] h-px w-full bg-gradient-to-r from-transparent via-terceary/[0.06] to-transparent" />
      </div>

      {/* Corner accents */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full border border-terceary/[0.06]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-16 -bottom-16 h-[300px] w-[300px] rounded-full border border-peach/[0.06]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={reveal}
          className="mb-20 text-center md:mb-24"
        >
          <motion.div
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-8 h-px w-24 origin-center bg-gradient-to-r from-transparent via-terceary to-transparent"
          />
          <p className="mb-5 text-xs font-montserratBold uppercase tracking-[0.5em] text-terceary">
            Predicadores invitados
          </p>
          <h2 className="font-bebasNeue text-4xl leading-[0.95] tracking-wide sm:text-5xl md:text-6xl">
            Una palabra para{' '}
            <span className="bg-gradient-to-r from-peach to-[#f5a96a] bg-clip-text text-transparent">
              esta generación
            </span>
          </h2>
          <motion.div
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-8 h-px w-24 origin-center bg-gradient-to-r from-transparent via-terceary to-transparent"
          />
        </motion.div>

        {/* Preacher cards */}
        <div className="space-y-4">
          {preachers.map((preacher, i) => (
            <motion.div
              key={preacher.name}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: i % 2 === 0 ? -60 : 60,
                      filter: 'blur(4px)',
                    }
              }
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: i * 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={reduceMotion ? undefined : { scale: 1.015, x: 8 }}
              className="group relative grid grid-cols-[3rem_1fr] items-center gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-5 backdrop-blur-sm transition-colors duration-500 hover:border-terceary/20 hover:bg-white/[0.05] sm:grid-cols-[4rem_1fr_auto] sm:px-8 sm:py-6"
            >
              {/* Hover glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(600px circle at 50% 50%, rgba(5,219,242,0.06), transparent 40%)',
                }}
              />

              {/* Number */}
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-terceary/10 bg-terceary/[0.06] transition-all duration-500 group-hover:border-terceary/30 group-hover:bg-terceary/[0.12]">
                <span className="font-bebasNeue text-xl text-terceary/60 transition-colors duration-500 group-hover:text-terceary sm:text-2xl">
                  0{i + 1}
                </span>
              </div>

              {/* Info */}
              <div className="relative min-w-0">
                <p className="mb-1 text-[10px] font-montserratBold uppercase tracking-[0.25em] text-peach/60 transition-colors duration-500 group-hover:text-peach">
                  {preacher.title}
                </p>
                <h3 className="truncate font-bebasNeue text-xl tracking-wide text-white/90 transition-colors duration-500 group-hover:text-white sm:text-3xl md:text-4xl">
                  {preacher.name}
                </h3>
              </div>

              {/* Role */}
              <p className="relative col-start-2 text-[11px] font-montserratMedium uppercase tracking-[0.15em] text-white/30 transition-colors duration-500 group-hover:text-white/55 sm:col-start-auto sm:text-xs">
                {preacher.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const initial = reduceMotion ? false : 'hidden';
  const reveal = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const staggerChildren = {
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };

  // Remove splash loader when React mounts
  useEffect(() => {
    const splash = document.getElementById('splash-loader');
    if (splash) {
      splash.style.transition = 'opacity 0.5s ease';
      splash.style.opacity = '0';
      setTimeout(() => splash.remove(), 500);
    }
  }, []);

  return (
    <div className="overflow-hidden bg-primary text-white">
      {/* ═══════ HERO — LAYERED FLYER ═══════ */}
      <section
        ref={heroRef}
        className="relative isolate w-full overflow-hidden bg-white"
        aria-label="Fervor 2026 — información principal"
      >
        {/* Flyer container — 90% width centered, natural aspect ratio */}
        <div className="relative mx-auto w-[100%]">
          {/* Layer 1: Background flyer */}
          <img
            src="/fervor-bg.png"
            alt=""
            aria-hidden="true"
            width="1920"
            height="1080"
            fetchPriority="high"
            className="block h-auto w-full"
          />

          {/* Layer 2: People + logo — smooth cinematic entrance */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 80,
                    scale: 1.06,
                    filter: 'blur(8px)',
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
            }}
            transition={{
              delay: 0.4,
              duration: 1.5,
              ease: [0.22, 1, 0.36, 1],
              opacity: { delay: 0.25, duration: 1.1 },
              filter: { delay: 0.45, duration: 1.2 },
            }}
            className="absolute inset-0"
          >
            <img
              src="/fervor-people.png"
              alt="Fervor 2026, Identidad Celestial. Predicadores: Jhon Fabio García, David Alomia, Jader Moreno, Jorge Yepes, Carlos Carvajal."
              width="1920"
              height="1080"
              className="h-full w-full object-fill"
            />
          </motion.div>

          {/* Layer 3: Predicadores invitados — left side */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: -60,
                    filter: 'blur(6px)',
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
              filter: 'blur(0px)',
            }}
            transition={{
              delay: 1.2,
              duration: 1.3,
              ease: [0.22, 1, 0.36, 1],
              opacity: { delay: 1.0, duration: 0.9 },
              filter: { delay: 1.3, duration: 1.0 },
            }}
            className="absolute bottom-[30%] left-[2%] w-[20%] sm:bottom-[34%] sm:left-[5%] sm:w-[16%] md:w-[13%]"
          >
            <img
              src="/fervor-predicadores.png"
              alt="Predicadores invitados: John Fabio García, David Alomia, Jader Moreno, Jorge Yepes, Carlos Carvajal"
              className="h-auto w-full drop-shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            />
          </motion.div>
        </div>

        {/* White gradient vignette — seamless fade on all sides */}
        {/* <div
          className="pointer-events-none absolute inset-0 z-10"
          aria-hidden="true"
        >
          <div
            className="absolute inset-y-0 left-0 w-[18%]"
            style={{
              background:
                'linear-gradient(to right, white 0%, white 45%, rgba(255,255,255,0.6) 65%, rgba(255,255,255,0) 100%)',
            }}
          />
          <div
            className="absolute inset-y-0 right-0 w-[18%]"
            style={{
              background:
                'linear-gradient(to left, white 0%, white 45%, rgba(255,255,255,0.6) 65%, rgba(255,255,255,0) 100%)',
            }}
          />
          <div
            className="absolute inset-x-0 top-0 h-[12%]"
            style={{
              background:
                'linear-gradient(to bottom, white 0%, white 30%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,0) 100%)',
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[12%]"
            style={{
              background:
                'linear-gradient(to top, white 0%, white 30%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,0) 100%)',
            }}
          />
        </div> */}

        {/* Scroll indicator */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 md:bottom-6"
        >
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden md:flex h-10 w-6 items-start justify-center rounded-full border border-white/30 backdrop-blur-sm"
          >
            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : { y: [2, 14, 2], opacity: [0.6, 1, 0.6] }
              }
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-2 h-2 w-1 rounded-full bg-white"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════ VERSE / IDENTITY ═══════ */}
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 md:py-28">
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-primary" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(5,219,242,0.05),transparent)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-3xl text-center">
          {/* Reference pill */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span className="inline-block rounded-full border border-terceary/15 bg-terceary/[0.05] px-4 py-1.5 text-[10px] font-montserratBold uppercase tracking-[0.4em] text-terceary/80">
              Filipenses 3:20
            </span>
          </motion.div>

          {/* Quote */}
          <blockquote>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: 0.15,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-bebasNeue text-3xl leading-[1.1] tracking-wide text-white/85 sm:text-4xl md:text-5xl"
            >
              "Mas nuestra ciudadanía está en los cielos,{' '}
              <span className="text-terceary">
                de donde también esperamos al Salvador,
              </span>{' '}
              al Señor Jesucristo."
            </motion.p>
          </blockquote>

          {/* Divider */}
          <motion.div
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-8 h-px w-12 origin-center bg-gradient-to-r from-transparent via-terceary/40 to-transparent"
          />

          {/* Subtitle */}
          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mx-auto mt-6 max-w-lg text-sm leading-7 text-white/35"
          >
            Una experiencia de fe, palabra y adoración diseñada para despertar
            una generación que conoce de dónde viene, a quién pertenece y hacia
            dónde va.
          </motion.p>
        </div>
      </section>

      {/* ═══════ SPEAKERS ═══════ */}
      <SpeakersSection preachers={PREACHERS} reduceMotion={reduceMotion} />

      {/* ═══════ EVENT DETAILS ═══════ */}
      <section className="relative overflow-hidden px-5 py-24 sm:px-8 md:py-32">
        <div className="absolute inset-0 bg-primary" aria-hidden="true" />
        <div
          className="celestial-grid pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[120px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={initial}
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={reveal}
            className="mb-16 md:mb-20"
          >
            <p className="mb-4 text-xs font-montserratBold uppercase tracking-[0.4em] text-terceary">
              Agenda tu encuentro
            </p>
            <h2 className="max-w-2xl font-bebasNeue text-4xl leading-none tracking-wide sm:text-5xl md:text-6xl">
              La cita está lista
            </h2>
          </motion.div>

          {/* Row 1: Fecha · Duración · Donación */}
          <motion.div
            initial={initial}
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerChildren}
            className="mb-5 grid gap-5 sm:grid-cols-3"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 text-center transition-colors duration-300 hover:border-terceary/20 hover:bg-white/[0.05]"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-terceary/10 text-terceary transition-colors duration-300 group-hover:bg-terceary/20">
                <CalendarDays className="h-6 w-6" />
              </div>
              <p className="mb-2 text-[10px] font-montserratBold uppercase tracking-[0.35em] text-terceary/60">
                Fecha
              </p>
              <h3 className="font-bebasNeue text-3xl tracking-wide text-white sm:text-4xl">
                7 y 8 de diciembre
              </h3>
              <p className="mt-2 text-sm text-white/40">
                Dos noches · una misma presencia
              </p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 text-center transition-colors duration-300 hover:border-terceary/20 hover:bg-white/[0.05]"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-terceary/10 text-terceary transition-colors duration-300 group-hover:bg-terceary/20">
                <Clock3 className="h-6 w-6" />
              </div>
              <p className="mb-2 text-[10px] font-montserratBold uppercase tracking-[0.35em] text-terceary/60">
                Duración
              </p>
              <h3 className="font-bebasNeue text-3xl tracking-wide text-white sm:text-4xl">
                12 horas
              </h3>
              <p className="mt-2 text-sm text-white/40">
                Una vigilia que marcará generaciones
              </p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="group rounded-2xl border border-peach/20 bg-gradient-to-br from-peach/[0.08] to-transparent p-7 text-center transition-colors duration-300 hover:border-peach/30"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-peach/15 text-peach transition-colors duration-300 group-hover:bg-peach/25">
                <Heart className="h-6 w-6" />
              </div>
              <p className="mb-2 text-[10px] font-montserratBold uppercase tracking-[0.35em] text-peach/60">
                Donación
              </p>
              <h3 className="font-bebasNeue text-4xl tracking-wide text-white sm:text-5xl">
                $48.000
              </h3>
              <p className="mt-2 text-sm text-white/40">
                Tu aporte hace posible esta experiencia
              </p>
            </motion.div>
          </motion.div>

          {/* Row 2: Lugar — full width con mapa */}
          <motion.div
            initial={initial}
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={reveal}
          >
            <a
              href="https://www.google.com/maps/search/Coliseo+de+Voleibol+Yesid+Santos+Complejo+Deportivo+Atanasio+Girardot+Medellín"
              target="_blank"
              rel="noopener noreferrer"
              className="group grid overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-colors duration-300 hover:border-terceary/20 sm:grid-cols-[1fr_1.2fr]"
            >
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-terceary/10 text-terceary transition-colors duration-300 group-hover:bg-terceary/20">
                  <MapPin className="h-6 w-6" />
                </div>
                <p className="mb-2 text-[10px] font-montserratBold uppercase tracking-[0.35em] text-terceary/60">
                  Lugar
                </p>
                <h3 className="mb-3 font-bebasNeue text-3xl tracking-wide text-white sm:text-4xl">
                  Coliseo de Voleibol Yesid Santos
                </h3>
                <p className="text-sm leading-6 text-white/40">
                  Complejo Deportivo Atanasio Girardot · Medellín, Colombia
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-montserratBold uppercase tracking-[0.2em] text-terceary/70 transition-colors group-hover:text-terceary">
                  Abrir en Google Maps
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
              <div className="h-56 w-full overflow-hidden sm:h-auto sm:min-h-[280px]">
                <iframe
                  title="Ubicación Coliseo de Voleibol Yesid Santos"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2813.42839700027!2d-75.58945193487227!3d6.255365891974969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e44290f256c744d%3A0x28343bf86570664a!2sColiseo%20de%20V%C3%B3leibol%20Yesid%20Santos!5e1!3m2!1ses-419!2sco!4v1785006852991!5m2!1ses-419!2sco"
                  className="pointer-events-none h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════ PATROCINADORES ═══════ */}
      <section className="bg-white px-5 py-12 sm:px-8 sm:py-10">
        <motion.div
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
          className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center"
        >
          <p className="text-xs font-montserratBold uppercase tracking-[0.4em] text-primary/40">
            Patrocinador del website
          </p>
          <a
            href="https://comfortdesign.com.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-300 hover:scale-105"
          >
            <img
              src="/logo-comfort.png"
              alt="Comfort Design"
              className="h-16 w-auto object-contain sm:h-18"
            />
          </a>
          <div className="flex items-center gap-5">
            <a
              href="https://comfortdesign.com.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-montserratMedium text-primary/50 transition-colors hover:text-primary"
            >
              <ArrowRight className="h-3.5 w-3.5" />
              comfortdesign.com.co
            </a>
            <a
              href="https://www.instagram.com/comfortdesign.med/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-montserratMedium text-primary/50 transition-colors hover:text-primary"
            >
              <Instagram className="h-3.5 w-3.5" />
              @comfortdesign.med
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;

'use client';

import {useEffect, useRef, useState, type ReactNode} from 'react';
import Lenis from 'lenis';
import {motion, useInView, useReducedMotion, useScroll, useSpring, useTransform} from 'motion/react';

const entrance = [0.16, 1, 0.3, 1] as const;

export function MotionProvider({children}: {children: ReactNode}) {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({duration: 1.05, smoothWheel: true});
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduced]);
  return children;
}

export function Reveal({children, className = '', delay = 0}: {children: ReactNode; className?: string; delay?: number}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : {opacity: 0, y: 28}}
      whileInView={reduced ? undefined : {opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.15}}
      transition={{duration: 0.7, delay, ease: entrance}}
    >
      {children}
    </motion.div>
  );
}

export function HeroLines({lines}: {lines: string[]}) {
  const reduced = useReducedMotion();
  return (
    <h1 className="hero-title">
      {lines.map((line, index) => (
        <span className="hero-line-mask" key={line}>
          <motion.span
            initial={reduced ? false : {y: '105%'}}
            animate={{y: 0}}
            transition={{duration: 0.7, delay: index * 0.08 + 0.1, ease: entrance}}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export function HeroImage({children}: {children: ReactNode}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="hero-image-motion"
      initial={reduced ? false : {scale: 1.08, opacity: 0.86}}
      animate={{scale: 1, opacity: 1}}
      transition={{duration: 1.2, ease: entrance}}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({to, suffix = ''}: {to: number; suffix?: string}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, {once: true});
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? to : 0);
  useEffect(() => {
    if (!inView || reduced) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 1400, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to]);
  return <span ref={ref}>{value}{suffix}</span>;
}

export function MorningBakeRun({steps}: {steps: string[]}) {
  const scene = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const {scrollYProgress} = useScroll({target: scene, offset: ['start start', 'end end']});
  const smooth = useSpring(scrollYProgress, {stiffness: 120, damping: 30, mass: 0.9});
  const rackX = useTransform(smooth, [0, 1], ['-10%', '64%']);
  const labelX = useTransform(smooth, [0, 1], ['0%', '220%']);
  const tray0 = useTransform(smooth, [0, .2], [.18, 1]);
  const tray1 = useTransform(smooth, [.18, .38], [.18, 1]);
  const tray2 = useTransform(smooth, [.36, .56], [.18, 1]);
  const tray3 = useTransform(smooth, [.54, .74], [.18, 1]);
  const trayOpacity = [tray0, tray1, tray2, tray3];

  return (
    <section ref={scene} className="bake-run" aria-label="Morning bake process">
      <div className="bake-run-sticky">
        <div className="section-index">04 — 08</div>
        <div className="batch-rule" />
        <motion.div className="rack" style={reduced ? undefined : {x: rackX}} aria-hidden="true">
          <div className="rack-side" />
          {[0, 1, 2, 3].map((tray) => (
            <motion.div
              className="rack-tray"
              key={tray}
              style={reduced ? undefined : {opacity: trayOpacity[tray]}}
            >
              <span /><span /><span /><span />
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="batch-label" style={reduced ? undefined : {x: labelX}}>B—0427</motion.div>
        <ol className="process-stations">
          {steps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}
        </ol>
      </div>
    </section>
  );
}

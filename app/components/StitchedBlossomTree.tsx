// app/components/StitchedBlossomTree.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { StitchEngine } from './stitch/engine';
import { StitchRenderer, render2D } from './stitch/renderer';
import { CHERRY_BLOSSOM } from './stitch/cherryBlossom';

/*
 * A cross-stitched blossom tree. It sews itself in when scrolled into view.
 * While the mouse is over it the threads are pushed aside like cloth (harder
 * while pressed) and sway gently. If the mouse rests without moving, the cloth
 * calms from the outside in, towards the cursor; when it leaves, it springs back.
 */

// Pointer feel, in CSS px at the original's 120px size: the resting push and
// the stronger, wider hover push it eases into. Everything scales with the
// rendered size, so it behaves identically, just bigger.
const REFERENCE_WIDTH = 120;
const DEFLECT_PX = 4.2;
const RADIUS_PX = 20;
const HOVER_DEFLECT_PX = 6;
const HOVER_RADIUS_PX = 28;
const HOVER_RISE_MS = 220;
const HOVER_FALL_MS = 520;
// After STILL_MS without the cursor moving on the tree, the disturbance clears
// over SETTLE_MS, starting from the farthest threads and closing in on the cursor.
const STILL_MS = 3000;
const SETTLE_MS = 2500;
// Movement smaller than this (a hand resting on the mouse) doesn't count.
const MOTION_PX = 3;
// How far toward white the fabric backing under each stitch is tinted.
const BACKING_LIGHTEN = 0.45;

// Empty cells around the pattern on each side.
const BOUNDS = (() => {
  const { cols, rows, units } = CHERRY_BLOSSOM;
  const rs = units.map((u) => u.r);
  const cs = units.map((u) => u.c);
  return {
    top: Math.min(...rs),
    bottom: rows - 1 - Math.max(...rs),
    left: Math.min(...cs),
    right: cols - 1 - Math.max(...cs),
  };
})();

const StitchedBlossomTree: React.FC<{ className?: string }> = ({ className = '' }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const { cols, rows, cell, units } = CHERRY_BLOSSOM;
    const engine = new StitchEngine(cols, rows, cell, units, { backing: BACKING_LIGHTEN });
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const gl = StitchRenderer.create(canvas, engine.legs);
    const ctx2d = gl ? null : canvas.getContext('2d');
    const draw = () => {
      if (gl) gl.render(engine.legs, engine.W, engine.H);
      else if (ctx2d) render2D(ctx2d, engine.legs, engine.W);
    };

    let raf = 0;
    let visible = false;
    let sewn = false;
    let lastFrame: number | null = null;
    const hover = { level: 0, anim: null as number | null };

    const frame = (now: number) => {
      raf = 0;
      if (!visible) return;
      if (lastFrame !== null && now - lastFrame > 250) engine.shiftTimeline(now - lastFrame - 16);
      lastFrame = now;
      const settled = engine.tick(now);
      draw();
      if (settled && hover.anim === null) lastFrame = null;
      else raf = requestAnimationFrame(frame);
    };
    const wake = () => {
      if (!raf && visible && sewn) raf = requestAnimationFrame(frame);
    };

    // `hover.level` (0..1) blends the resting push into the hover push and
    // turns on the cloth sway, easing in on enter and out on leave.
    const applyHover = () => {
      const pxPerCell = host.clientWidth / cols;
      const scale = host.clientWidth / REFERENCE_WIDTH;
      const toCells = (px: number) => (px * scale) / pxPerCell;
      const toIntensity = (px: number) => (px * scale) / (0.5 * pxPerCell);
      const lerp = (a: number, b: number) => a + (b - a) * hover.level;
      engine.physics.intensity = lerp(toIntensity(DEFLECT_PX), toIntensity(HOVER_DEFLECT_PX));
      engine.physics.radius = cell * lerp(toCells(RADIUS_PX), toCells(HOVER_RADIUS_PX));
      engine.physics.sway = hover.level > 0.01;
    };
    const easeHover = (target: number) => {
      if (hover.anim !== null) cancelAnimationFrame(hover.anim);
      const from = hover.level;
      const duration = target > from ? HOVER_RISE_MS : HOVER_FALL_MS;
      const start = performance.now();
      const step = () => {
        const t = Math.min(1, (performance.now() - start) / duration);
        hover.level = from + t * t * (3 - 2 * t) * (target - from);
        applyHover();
        engine.wakePhysics();
        wake();
        hover.anim = t < 1 ? requestAnimationFrame(step) : null;
      };
      hover.anim = requestAnimationFrame(step);
    };
    applyHover();

    const toWorld = (e: PointerEvent): [number, number] => {
      const rect = host.getBoundingClientRect();
      return [((e.clientX - rect.left) / rect.width) * engine.W, ((e.clientY - rect.top) / rect.height) * engine.H];
    };

    // Settling from the outside in: a circle centred on the cursor shrinks
    // from the farthest thread down to nothing; threads outside it calm down.
    let stillTimer: ReturnType<typeof setTimeout> | undefined;
    let settleAnim: number | null = null;
    let resting = false; // settled while the cursor is still on the tree
    const cancelSettle = () => {
      clearTimeout(stillTimer);
      if (settleAnim !== null) cancelAnimationFrame(settleAnim);
      settleAnim = null;
      engine.settle = null;
    };
    const settleInward = () => {
      const { x, y } = engine.pointer;
      let far = 0;
      for (const n of engine.nodes.values()) far = Math.max(far, Math.hypot(n.cx - x, n.cy - y));
      // Start with the soft edge just outside the farthest thread, and finish
      // with it past the cursor, so the centre calms fully too.
      const from = far + 10 * cell;
      const to = -cell;
      const start = performance.now();
      const step = () => {
        const t = Math.min(1, (performance.now() - start) / SETTLE_MS);
        engine.settle = { x, y, radius: from + (to - from) * t * t * (3 - 2 * t) };
        engine.wakePhysics();
        wake();
        if (t < 1) {
          settleAnim = requestAnimationFrame(step);
          return;
        }
        // Fully calm: let go of the pointer so the tree can go idle.
        settleAnim = null;
        engine.settle = null;
        engine.clearPointer();
        engine.calm();
        if (hover.anim !== null) cancelAnimationFrame(hover.anim);
        hover.anim = null;
        hover.level = 0;
        applyHover();
        resting = true;
        wake();
      };
      settleAnim = requestAnimationFrame(step);
    };
    const restartStillTimer = () => {
      cancelSettle();
      stillTimer = setTimeout(settleInward, STILL_MS);
    };

    // Mouse only, like the original: touch scrolls the page as usual.
    const last = { x: 0, y: 0 };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      last.x = e.clientX;
      last.y = e.clientY;
      resting = false;
      easeHover(1);
      restartStillTimer();
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      host.setPointerCapture(e.pointerId);
      engine.setPointer(...toWorld(e), { down: true, active: true });
      if (resting || hover.level < 1) easeHover(1);
      resting = false;
      restartStillTimer();
      wake();
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      if (Math.hypot(e.clientX - last.x, e.clientY - last.y) < MOTION_PX) return;
      last.x = e.clientX;
      last.y = e.clientY;
      engine.setPointer(...toWorld(e), { active: true });
      if (resting || (hover.level < 1 && hover.anim === null)) easeHover(1);
      resting = false;
      restartStillTimer();
      wake();
    };
    const onUp = () => {
      engine.releasePointer();
      wake();
    };
    const onLeave = () => {
      cancelSettle();
      resting = false;
      engine.clearPointer();
      easeHover(0);
    };

    if (!reduceMotion) {
      host.addEventListener('pointerenter', onEnter);
      host.addEventListener('pointerdown', onDown);
      host.addEventListener('pointermove', onMove);
      host.addEventListener('pointerup', onUp);
      host.addEventListener('pointerleave', onLeave);
    }

    // Keep the backing store at device resolution (capped at 2x).
    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        applyHover();
        if (sewn) draw();
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    // Sew the tree in the first time it's properly on screen, and only
    // animate while it stays visible.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) {
          if (raf) cancelAnimationFrame(raf);
          raf = 0;
          return;
        }
        if (!sewn && entry.intersectionRatio >= 0.5) {
          sewn = true;
          if (reduceMotion) engine.revealAll();
          else engine.sewIn(performance.now());
        }
        wake();
      },
      { threshold: [0, 0.5] },
    );
    io.observe(host);

    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
      if (hover.anim !== null) cancelAnimationFrame(hover.anim);
      cancelSettle();
      host.removeEventListener('pointerenter', onEnter);
      host.removeEventListener('pointerdown', onDown);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerup', onUp);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  // The canvas is --tree wide; negative margins trim the pattern's empty
  // border so the layout box hugs the tree (canopy on the left, roots at the bottom).
  const trim = (cells: number) => `calc(var(--tree) * ${-cells / CHERRY_BLOSSOM.cols})`;
  return (
    <div
      className={`[--tree:200px] md:[--tree:260px] lg:[--tree:300px] ${className}`}
      role="presentation"
      aria-hidden="true"
    >
      <div
        ref={hostRef}
        className="relative aspect-square w-(--tree) touch-pan-y"
        style={{
          marginTop: trim(BOUNDS.top),
          marginRight: trim(BOUNDS.right),
          marginBottom: trim(BOUNDS.bottom),
          marginLeft: trim(BOUNDS.left),
        }}
      >
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 block size-full" />
      </div>
    </div>
  );
};

export default StitchedBlossomTree;

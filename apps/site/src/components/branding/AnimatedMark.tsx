'use client';

import { useEffect, useState } from 'react';
import { LogoMark } from '../logos/LogoMark';
import type { FC } from 'react';

export type AnimatedMarkProps = {
  size: number;
};

// How long the ring takes to fill and how long it then stays done, in milliseconds.
const runDuration = 3480;
const doneDuration = 1560;

// How long the check pops to 110 % and back once the step is done.
const popDuration = 546;

// Smooth start and end of each step of the ring.
const easeInOutCubic = (value: number) => {
  return value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2;
};

// The mark as the app's loader, looping: the ring fills clockwise in four quarters, each one waiting first with the
// dot pulsing and then sliding on, and when the step is done it turns green and the check pops out. Still at the
// logo's own state with reduced motion.
export const AnimatedMark: FC<AnimatedMarkProps> = ({ size }) => {
  const [elapsed, setElapsed] = useState<number | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      setElapsed((now - start) % (runDuration + doneDuration));
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  if (elapsed === null) {
    return <LogoMark size={size} tone="light" />;
  }

  if (elapsed < runDuration) {
    // Each quarter waits for the first 55 % of its time with the dot pulsing, then the ring slides to the next one.
    const position = (elapsed / runDuration) * 4;
    const quarter = Math.min(3, Math.floor(position));
    const local = position - quarter;
    const waiting = local < 0.55;
    const slide = waiting ? 0 : easeInOutCubic((local - 0.55) / 0.45);

    return <LogoMark size={size} tone="light" progress={Math.min(0.999, (quarter + slide) / 4 + 0.001)} pulse={waiting ? local / 0.55 : 0} />;
  }

  const sinceDone = (elapsed - runDuration) / popDuration;
  const checkScale = sinceDone < 1 ? 1 + 0.1 * Math.sin(sinceDone * Math.PI) : 1;

  return <LogoMark size={size} tone="light" progress={1} done checkScale={checkScale} />;
};

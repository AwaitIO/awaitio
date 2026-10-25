'use client';

import { useEffect, useState } from 'react';
import { CursorIcon } from '../icons/CursorIcon';
import type { FC, RefObject } from 'react';

export type GlideCursorProps = {
  // The element the pointer sits in; it needs `relative`, the pointer moves inside it.
  containerRef: RefObject<HTMLElement | null>;
  // The element to click now; when it changes, the pointer glides from the last one over to it.
  targetRef: RefObject<HTMLElement | null>;
  // Changes with every click, so each target gets clicked even when the pointer is already there.
  clickKey: string;
  // How long after the target changes the pointer sets off, in milliseconds.
  delay: number;
};

// How long the pointer travels to the next target, in milliseconds; the click comes right after it lands.
const glideDuration = 500;

// A mouse pointer that stays on screen across several clicks: it glides in from the lower right to the first target,
// then from target to target, and presses each one.
export const GlideCursor: FC<GlideCursorProps> = ({ containerRef, targetRef, clickKey, delay }) => {
  const [position, setPosition] = useState<{ x: number; y: number; visible: boolean } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const target = targetRef.current;

    if (!container || !target) {
      return;
    }

    const containerBox = container.getBoundingClientRect();
    const targetBox = target.getBoundingClientRect();
    const x = targetBox.left + targetBox.width / 2 - containerBox.left;
    const y = targetBox.top + targetBox.height / 2 - containerBox.top;

    setPosition((current) => {
      return current ?? { x: x + 36, y: y + 30, visible: false };
    });

    const timer = window.setTimeout(() => {
      setPosition({ x, y, visible: true });
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [containerRef, targetRef, clickKey, delay]);

  if (!position) {
    return null;
  }

  return (
    <span
      className={['pointer-events-none absolute z-10 transition-[left,top,opacity] duration-500 ease-in-out', !position.visible && 'opacity-0'].filter(Boolean).join(' ')}
      style={{ left: position.x, top: position.y }}
    >
      <span key={clickKey} className="block origin-top-left animate-cursor-press" style={{ animationDelay: `${delay + glideDuration}ms` }}>
        <CursorIcon />
      </span>
    </span>
  );
};

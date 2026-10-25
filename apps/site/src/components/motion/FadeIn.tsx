'use client';

import { Div } from './Div';
import type { FC, ReactNode } from 'react';

export type FadeInProps = {
  children: ReactNode;
  className?: string;
  // Seconds to wait, for blocks that come in one after another.
  delay?: number;
  // `load` animates once the page has loaded (the top of a page), `view` when the block first scrolls into view.
  on?: 'load' | 'view';
};

// The site's one entrance: the block rises 30 px and fades in. On load it is a CSS animation, in view it is motion's
// whileInView. Runs once per block.
export const FadeIn: FC<FadeInProps> = ({ children, className, delay = 0, on = 'view' }) => {
  if (on === 'load') {
    // Plain CSS, so the block is in the first paint and shows even before or without JavaScript.
    return (
      <div className={[className, 'animate-rise'].filter(Boolean).join(' ')} style={{ animationDelay: `${delay * 0.6}s` }}>
        {children}
      </div>
    );
  }

  const hidden = { opacity: 0, y: 30 };
  const shown = { opacity: 1, y: 0 };
  const transition = { duration: 0.5, delay, ease: 'easeOut' as const };

  return (
    <Div className={className} initial={hidden} whileInView={shown} transition={transition} viewport={{ once: true, amount: 0.3 }}>
      {children}
    </Div>
  );
};

'use client';

import { PixelLogo } from './PixelLogo';
import { LogoMark } from '../logos/LogoMark';
import { Div } from '../motion/Div';
import type { FC } from 'react';

export type VsHeroLogosProps = {
  name: string;
  logo?: string;
};

// How far each logo comes from, and how far past its place it swings in when the two meet.
const travel = 140;
const bump = 14;

// The two logos of a comparison come in from the sides and knock together like a fist bump, then "vs" pops up
// between them. Runs once when the page loads; with reduced motion they simply appear.
export const VsHeroLogos: FC<VsHeroLogosProps> = ({ name, logo }) => {
  const meet = { duration: 0.6, times: [0, 0.7, 1], ease: 'easeOut' as const };

  return (
    <div className="flex items-center gap-5 sm:gap-8">
      <Div initial={{ opacity: 0, x: -travel }} animate={{ opacity: 1, x: [-travel, bump, 0] }} transition={{ x: meet, opacity: { duration: 0.3 } }}>
        <LogoMark size={88} tone="light" />
      </Div>
      <Div className="font-pixel text-2xl text-gray-400" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: [0, 1.4, 1] }} transition={{ delay: 0.42, duration: 0.4, ease: 'easeOut' }}>
        vs
      </Div>
      <Div initial={{ opacity: 0, x: travel }} animate={{ opacity: 1, x: [travel, -bump, 0] }} transition={{ x: meet, opacity: { duration: 0.3 } }}>
        {logo ? <PixelLogo bitmap={logo} cells={32} label={name} className="h-[88px] w-[88px] text-gray-900" /> : <span className="text-2xl font-semibold">{name}</span>}
      </Div>
    </div>
  );
};

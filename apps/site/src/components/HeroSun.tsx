import { ditherSunPath } from '../utils/ditherSunPath';
import type { FC } from 'react';

export type HeroSunProps = {
  className?: string;
};

const groups = 3;
const sun = ditherSunPath({ radius: 125, cell: 10, groups });

// The dithered sun that sits on the hero horizon, the one illustration of the brand. Its dithered pixels slowly dim and
// the gaps faintly light up in turns, each group a third behind the last, so it glows; still with reduced motion.
export const HeroSun: FC<HeroSunProps> = ({ className }) => {
  return (
    <svg viewBox="0 0 250 125" className={className} aria-hidden="true">
      <path d={sun.core} className="fill-orange-500" />
      {sun.embers.map((path, index) => {
        return (
          <path
            key={`ember-${index}`}
            d={path}
            className="fill-orange-500 motion-safe:animate-sun-ember"
            style={{ animationDelay: `${(-index * 3.5) / groups}s` }}
          />
        );
      })}
      {sun.sparks.map((path, index) => {
        return (
          <path
            key={`spark-${index}`}
            d={path}
            className="fill-orange-500 opacity-0 motion-safe:animate-sun-spark"
            style={{ animationDelay: `${(-index * 4.5) / groups - 0.8}s` }}
          />
        );
      })}
    </svg>
  );
};

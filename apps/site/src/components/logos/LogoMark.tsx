import { logoColors } from './logoColors';
import type { LogoMarkProps } from './LogoMarkProps';
import { ditherRingPath } from '../../utils/ditherRingPath';
import type { FC } from 'react';

// The dither ring with the dot, a third of the way round by default; done, it turns green with a check inside, popping out
// through `checkScale` as it arrives. Below 48 px the pixels are drawn twice as large, so the dither stays visible instead of turning grey.
export const LogoMark: FC<LogoMarkProps> = ({ size, tone, progress = 0.3, done = false, pulse = 0, checkScale = 1 }) => {
  const { ink, accent, done: doneColor } = logoColors({ tone });
  const { path, check, dot } = ditherRingPath({ progress, cell: size >= 48 ? 1 : 2, done });

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path d={path} fill={done ? doneColor : ink} />
      {done && <path d={check} fill={doneColor} transform={`translate(16 16) scale(${checkScale}) translate(-16 -16)`} />}
      {!done && <circle cx={dot.cx} cy={dot.cy} r={dot.r + 0.6 * Math.sin(pulse * Math.PI)} fill={accent} />}
    </svg>
  );
};

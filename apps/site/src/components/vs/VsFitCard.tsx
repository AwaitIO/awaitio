import { PixelLogo } from './PixelLogo';
import { CodeText } from '../CodeText';
import { LogoMark } from '../logos/LogoMark';
import type { FC } from 'react';

export type VsFitCardProps = {
  name: string;
  points: string[];
  // AwaitIO's card: ink with the orange shadow and the dither ring; the other tool's card stays light.
  isAwaitIO: boolean;
  // The other tool's logo bitmap; its initial when missing.
  logo?: string;
};

// One side of "Which one fits": the tool's logo big in the corner, "Pick <tool> if" in pixels and the cases as
// numbered rows.
export const VsFitCard: FC<VsFitCardProps> = ({ name, points, isAwaitIO, logo }) => {
  return (
    <div
      className={[
        'flex flex-col overflow-hidden rounded-[10px] border-[1.5px] border-gray-900',
        isAwaitIO && 'bg-gray-900 text-white shadow-[6px_6px_0_var(--color-orange-500)]',
        !isAwaitIO && 'bg-white text-gray-900 shadow-[6px_6px_0_var(--color-gray-400)]',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={['flex items-center justify-between gap-4 px-6 pt-6 pb-5 sm:px-8', isAwaitIO && 'border-b border-white/15', !isAwaitIO && 'border-b border-gray-200'].filter(Boolean).join(' ')}>
        <div className="flex flex-col gap-1">
          <span className={['font-mono text-xs tracking-widest uppercase', isAwaitIO && 'text-orange-300', !isAwaitIO && 'text-gray-500'].filter(Boolean).join(' ')}>Pick</span>
          <h3 className="font-pixel text-2xl leading-none sm:text-3xl">{isAwaitIO ? 'AwaitIO' : name} if</h3>
        </div>
        {isAwaitIO && <LogoMark size={56} tone="dark" />}
        {!isAwaitIO && logo && <PixelLogo bitmap={logo} cells={32} label={name} className="h-14 w-14 text-gray-900" />}
      </div>
      <ol className="flex flex-col">
        {points.map((point, index) => {
          return (
            <li
              key={point}
              className={['flex gap-4 px-6 py-4 sm:px-8', index > 0 && isAwaitIO && 'border-t border-white/10', index > 0 && !isAwaitIO && 'border-t border-gray-100'].filter(Boolean).join(' ')}
            >
              <span className={['shrink-0 font-mono text-sm', isAwaitIO && 'text-orange-400', !isAwaitIO && 'text-gray-400'].filter(Boolean).join(' ')}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className={['min-w-0', isAwaitIO && 'text-gray-100', !isAwaitIO && 'text-gray-700'].filter(Boolean).join(' ')}>
                <CodeText text={point} />
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

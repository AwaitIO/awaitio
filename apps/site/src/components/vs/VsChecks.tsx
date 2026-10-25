import { CheckValueBadge } from './CheckValueBadge';
import { PixelLogo } from './PixelLogo';
import type { ComparisonCheck } from '../../types/ComparisonCheck';
import { LogoMark } from '../logos/LogoMark';
import type { FC } from 'react';

export type VsChecksProps = {
  name: string;
  // The other tool's logo bitmap, drawn in square pixels in the header; its initial when missing.
  logo?: string;
  checks: ComparisonCheck[];
};

// The at-a-glance table: one short capability per row and an icon for each tool, the way Apple compares Safari with
// Chrome. Rows where the other tool wins stay in, so the table reads as fair.
export const VsChecks: FC<VsChecksProps> = ({ name, logo, checks }) => {
  return (
    <div className="offset-card overflow-hidden bg-white">
      <div className="grid grid-cols-[1fr_4.5rem_4.5rem] items-end gap-2 border-b-[1.5px] border-gray-900 px-5 py-4 sm:grid-cols-[1fr_7rem_7rem] sm:px-8">
        <span />
        <span className="flex flex-col items-center gap-2 font-mono text-[11px] font-semibold tracking-widest text-orange-600 uppercase">
          <LogoMark size={28} tone="light" />
          AwaitIO
        </span>
        <span className="flex flex-col items-center gap-2 text-center font-mono text-[11px] font-semibold tracking-widest text-gray-500 uppercase">
          {logo ? (
            <PixelLogo bitmap={logo} cells={16} label={name} className="h-7 w-7 text-gray-900" />
          ) : (
            <span className="flex h-7 w-7 items-center justify-center rounded-md border-[1.5px] border-gray-400 text-sm text-gray-500">{name.charAt(0)}</span>
          )}
          {name}
        </span>
      </div>
      {checks.map((check, index) => {
        return (
          <div
            key={check.label}
            className={['grid grid-cols-[1fr_4.5rem_4.5rem] items-center gap-2 px-5 py-4 sm:grid-cols-[1fr_7rem_7rem] sm:px-8', index > 0 && 'border-t border-gray-200'].filter(Boolean).join(' ')}
          >
            <span className="min-w-0 text-sm font-medium text-gray-900 sm:text-base">{check.label}</span>
            <span className="flex justify-center">
              <CheckValueBadge value={check.awaitio} />
            </span>
            <span className="flex justify-center">
              <CheckValueBadge value={check.them} />
            </span>
          </div>
        );
      })}
    </div>
  );
};

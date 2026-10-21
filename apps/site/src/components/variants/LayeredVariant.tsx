import { BrowserFrame } from './BrowserFrame';
import { CodeCard } from './CodeCard';
import { MockButton } from './MockButton';
import { MockField } from './MockField';
import { variantCode } from './variantCode';
import type { FC } from 'react';

export const LayeredVariant: FC = () => {
  return (
    <div className="relative mx-auto max-w-4xl pb-8 md:pb-24">
      <CodeCard
        className="md:w-[62%]"
        lines={[
          { tokens: variantCode.name },
          { tokens: variantCode.handler },
          { tokens: variantCode.email },
          { tokens: variantCode.startsAt, highlighted: true },
          { tokens: variantCode.create },
          { tokens: variantCode.result },
          { tokens: variantCode.close },
          { tokens: variantCode.end },
        ]}
      />
      <svg viewBox="0 0 160 120" className="absolute top-[22%] left-[58%] z-10 hidden h-28 w-40 text-orange-500 md:block" fill="none" aria-hidden="true">
        <path d="M8 40 C 60 10, 120 20, 138 100" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 6" strokeLinecap="round" />
        <path d="M128 92 L141 104 L150 88" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="56" y="12" fill="currentColor" className="font-mono text-[13px] font-semibold">
          await
        </text>
      </svg>
      <BrowserFrame className="mt-6 md:absolute md:top-44 md:right-0 md:mt-0 md:w-[46%] md:rotate-2">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Create user</h3>
          <MockField label="Start date" value="Oct 20, 2026 9:00" focused hint="Time zone: Europe/Prague" />
          <MockButton />
        </div>
      </BrowserFrame>
    </div>
  );
};

'use client';

import { useState, type FC } from 'react';
import { match } from 'ts-pattern';
import type { BrandColor } from './BrandColor';

export type ColorSwatchProps = {
  color: BrandColor;
};

export const ColorSwatch: FC<ColorSwatchProps> = ({ color }) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="h-24 border-b border-gray-200" style={{ backgroundColor: color.hex }} />
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold">{color.name}</h3>
          <button
            type="button"
            onClick={() => {
              void navigator.clipboard.writeText(color.hex).then(() => {
                setIsCopied(true);
                setTimeout(() => {
                  setIsCopied(false);
                }, 1500);
              });
            }}
            className="rounded-md border border-gray-300 px-2 py-1 font-mono text-xs text-gray-700 hover:bg-gray-50"
          >
            {match(isCopied)
              .with(true, () => {
                return 'Copied';
              })
              .with(false, () => {
                return color.hex;
              })
              .exhaustive()}
          </button>
        </div>
        <p className="text-sm text-gray-600">{color.role}</p>
      </div>
    </article>
  );
};

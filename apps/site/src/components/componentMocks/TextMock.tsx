import { SketchLabel } from './SketchLabel';
import type { FC } from 'react';

export const TextMock: FC = () => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <SketchLabel text="Company name" />
      <div className="flex h-8 items-center rounded-md border border-gray-300 bg-white px-2 text-xs text-gray-800">
        Acme Inc.
        <span className="ml-0.5 h-3.5 w-px animate-pulse bg-gray-900" />
      </div>
    </div>
  );
};

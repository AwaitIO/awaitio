import { SketchLabel } from './SketchLabel';
import type { FC } from 'react';

export const BooleanMock: FC = () => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <SketchLabel text="Send a confirmation email" />
      <div className="flex items-center gap-2 text-xs text-gray-600">
        <span className="flex size-4 items-center justify-center rounded-sm bg-gray-900 text-[10px] leading-none text-white">✓</span>
        The customer gets a copy
      </div>
    </div>
  );
};

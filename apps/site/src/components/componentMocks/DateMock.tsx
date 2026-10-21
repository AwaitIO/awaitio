import { SketchLabel } from './SketchLabel';
import type { FC } from 'react';

export const DateMock: FC = () => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <SketchLabel text="Ships on" />
      <div className="flex h-8 items-center justify-between rounded-md border border-gray-300 bg-white px-2 text-xs text-gray-800">
        Oct 24, 2026
        <span className="grid h-4 w-4 grid-cols-3 gap-px rounded-sm border border-gray-400 p-px">
          <span className="bg-gray-300" />
          <span className="bg-orange-400" />
          <span className="bg-gray-300" />
        </span>
      </div>
    </div>
  );
};

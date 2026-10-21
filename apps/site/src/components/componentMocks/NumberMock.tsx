import { SketchLabel } from './SketchLabel';
import type { FC } from 'react';

export const NumberMock: FC = () => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <SketchLabel text="Credits" />
      <div className="flex h-8 items-center justify-between rounded-md border border-gray-300 bg-white px-2 text-xs text-gray-800">
        250
        <span className="flex flex-col text-[8px] leading-none text-gray-400">
          <span>▲</span>
          <span>▼</span>
        </span>
      </div>
    </div>
  );
};

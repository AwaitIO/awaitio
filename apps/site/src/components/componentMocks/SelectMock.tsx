import { SketchLabel } from './SketchLabel';
import type { FC } from 'react';

export const SelectMock: FC = () => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <SketchLabel text="Plan" />
      <div className="overflow-hidden rounded-md border border-gray-300 bg-white text-xs text-gray-800">
        <div className="flex h-8 items-center justify-between px-2">
          Team<span className="text-gray-400">▾</span>
        </div>
        <div className="border-t border-gray-200 px-2 py-1 text-gray-500">Free</div>
        <div className="bg-orange-50 px-2 py-1 text-orange-700">Team</div>
      </div>
    </div>
  );
};

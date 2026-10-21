import { SketchLabel } from './SketchLabel';
import type { FC } from 'react';

export const MultipleSelectMock: FC = () => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <SketchLabel text="Notify by" />
      <div className="overflow-hidden rounded-md border border-gray-300 bg-white text-xs text-gray-800">
        <div className="p-1.5">
          <div className="flex h-7 items-center justify-between rounded border border-gray-300 bg-white px-2 text-gray-700 shadow-sm">
            Add…<span className="pr-0.5 text-gray-500">▾</span>
          </div>
        </div>
        {['Email', 'Slack'].map((channel) => {
          return (
            <div key={channel} className="flex items-center justify-between border-t border-gray-200 px-2 py-1">
              {channel}
              <span className="text-gray-400">×</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

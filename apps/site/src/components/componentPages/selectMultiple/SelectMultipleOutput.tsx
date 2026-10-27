import type { FC } from 'react';

// Roughly what the example shows: the step's card with the Add… drop-down, Email already picked under it, and Continue.
export const SelectMultipleOutput: FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-3 bg-gray-50 p-4 text-left text-gray-900 sm:p-5">
      <p className="text-sm font-semibold">Notify delay</p>
      <div className="flex flex-col gap-1.5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <span className="text-xs font-semibold">Notify by</span>
        <div className="overflow-hidden rounded-md border border-gray-300 text-xs">
          <div className="p-1.5">
            <span className="flex h-8 items-center justify-between rounded border border-gray-300 px-2.5 text-gray-500 shadow-sm">
              Add…<span>▾</span>
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 px-2.5 py-1.5">
            Email<span className="text-gray-400">×</span>
          </div>
        </div>
      </div>
      <span className="self-start rounded-md bg-gray-900 px-3 py-1.5 text-[11px] font-medium text-white">Continue</span>
    </div>
  );
};

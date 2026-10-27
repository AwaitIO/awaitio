import type { FC } from 'react';

// Roughly what the example shows: the question with its help text and the two buttons, without Continue.
export const ConfirmOutput: FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-3 bg-gray-50 p-4 text-left text-gray-900 sm:p-5">
      <p className="text-sm font-semibold">Delete archived files</p>
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold">Delete archived files?</span>
          <span className="text-[11px] text-gray-500">They cannot be restored.</span>
        </div>
        <div className="flex gap-2">
          <span className="rounded-md bg-gray-900 px-3 py-1.5 text-[11px] font-medium text-white">Confirm</span>
          <span className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[11px] font-medium text-gray-700">Cancel</span>
        </div>
      </div>
    </div>
  );
};

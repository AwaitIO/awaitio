import type { FC } from 'react';

// Roughly what the example shows: the step's card with the date two weeks ahead already filled in, and Continue.
export const InputDateOutput: FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-3 bg-gray-50 p-4 text-left text-gray-900 sm:p-5">
      <p className="text-sm font-semibold">Set due date</p>
      <div className="flex flex-col gap-1.5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <span className="text-xs font-semibold">Due date</span>
        <div className="flex h-9 items-center justify-between rounded-md border border-gray-300 px-3 text-sm text-gray-800">
          Nov 10, 2026
          <span className="grid size-4 grid-cols-3 gap-px rounded-sm border border-gray-400 p-px">
            <span className="bg-gray-300" />
            <span className="bg-orange-400" />
            <span className="bg-gray-300" />
          </span>
        </div>
      </div>
      <span className="self-start rounded-md bg-gray-900 px-3 py-1.5 text-[11px] font-medium text-white">Continue</span>
    </div>
  );
};

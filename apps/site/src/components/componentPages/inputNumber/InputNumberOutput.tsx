import type { FC } from 'react';

// Roughly what the example shows: the step's card with the number field, its help text and Continue.
export const InputNumberOutput: FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-3 bg-gray-50 p-4 text-left text-gray-900 sm:p-5">
      <p className="text-sm font-semibold">Refund order</p>
      <div className="flex flex-col gap-1.5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <span className="text-xs font-semibold">Refund amount</span>
        <div className="flex h-9 items-center justify-between rounded-md border border-gray-300 px-3 text-sm text-gray-800">
          <span>
            120
            <span className="ml-px inline-block h-3.5 w-px translate-y-0.5 bg-gray-900" />
          </span>
          <span className="flex flex-col text-[8px] leading-none text-gray-400">
            <span>▲</span>
            <span>▼</span>
          </span>
        </div>
        <span className="text-[11px] text-gray-500">In euros, up to 500</span>
      </div>
      <span className="self-start rounded-md bg-gray-900 px-3 py-1.5 text-[11px] font-medium text-white">Continue</span>
    </div>
  );
};

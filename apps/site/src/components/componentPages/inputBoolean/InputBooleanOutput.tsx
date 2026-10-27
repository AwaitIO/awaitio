import type { FC } from 'react';

// Roughly what the example shows: the step's card with the checked box, its help text and Continue.
export const InputBooleanOutput: FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-3 bg-gray-50 p-4 text-left text-gray-900 sm:p-5">
      <p className="text-sm font-semibold">Cancel order</p>
      <div className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <span className="text-xs font-semibold">Email the customer</span>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span className="flex size-4 shrink-0 items-center justify-center rounded-sm bg-gray-900 text-[10px] leading-none text-white">✓</span>
          They get a copy of the cancellation
        </div>
      </div>
      <span className="self-start rounded-md bg-gray-900 px-3 py-1.5 text-[11px] font-medium text-white">Continue</span>
    </div>
  );
};

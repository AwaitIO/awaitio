import type { FC } from 'react';

// Roughly what the example shows: the step's card with the Company name field, its placeholder and Continue.
export const InputTextOutput: FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-3 bg-gray-50 p-4 text-left text-gray-900 sm:p-5">
      <p className="text-sm font-semibold">Create account</p>
      <div className="flex flex-col gap-1.5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <span className="text-xs font-semibold">Company name</span>
        <span className="flex h-8 items-center rounded-md border border-gray-300 px-2 text-[11px] text-gray-400 ring-2 ring-orange-200">
          <span className="mr-px h-3.5 w-px bg-gray-900" />
          Acme Inc.
        </span>
      </div>
      <span className="self-start rounded-md bg-gray-900 px-3 py-1.5 text-[11px] font-medium text-white">Continue</span>
    </div>
  );
};

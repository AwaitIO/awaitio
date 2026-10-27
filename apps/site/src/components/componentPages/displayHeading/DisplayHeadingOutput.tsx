import type { FC } from 'react';

// Roughly what the example shows: the step's card with the Company heading, its line, two fields and Continue.
export const DisplayHeadingOutput: FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-3 bg-gray-50 p-4 text-left text-gray-900 sm:p-5">
      <p className="text-sm font-semibold">Edit company</p>
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-0.5">
          <span className="text-base font-semibold">Company</span>
          <span className="text-[11px] text-gray-500">How the account is billed.</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium">Name</span>
          <span className="rounded-md border border-gray-300 px-2 py-1.5 text-[11px] text-gray-400">&nbsp;</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium">Billing email</span>
          <span className="rounded-md border border-gray-300 px-2 py-1.5 text-[11px] text-gray-400">&nbsp;</span>
        </div>
      </div>
      <span className="self-start rounded-md bg-gray-900 px-3 py-1.5 text-[11px] font-medium text-white">Continue</span>
    </div>
  );
};

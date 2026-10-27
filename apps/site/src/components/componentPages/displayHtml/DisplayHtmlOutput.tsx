import type { FC } from 'react';

// Roughly what the example shows: the step's card with the Email preview heading, the email and Continue.
export const DisplayHtmlOutput: FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-3 bg-gray-50 p-4 text-left text-gray-900 sm:p-5">
      <p className="text-sm font-semibold">Preview email</p>
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <span className="text-xs font-semibold">Email preview</span>
        <div className="flex flex-col gap-2 text-xs text-gray-700">
          <span className="text-base font-semibold text-gray-900">Your trial ends soon</span>
          <span>Hi Ana,</span>
          <span>
            the trial of <b className="text-gray-900">Northwind</b> ends on <b className="text-gray-900">Nov 3, 2026</b>. Pick a plan to keep your store open.
          </span>
          <span className="text-orange-600 underline decoration-orange-300 underline-offset-2">Choose a plan</span>
        </div>
      </div>
      <span className="self-start rounded-md bg-gray-900 px-3 py-1.5 text-[11px] font-medium text-white">Continue</span>
    </div>
  );
};

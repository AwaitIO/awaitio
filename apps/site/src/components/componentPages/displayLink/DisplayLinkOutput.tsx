import type { FC } from 'react';

// Roughly what the example shows: the heading, the link under it and Continue.
export const DisplayLinkOutput: FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-3 bg-gray-50 p-4 text-left text-gray-900 sm:p-5">
      <p className="text-sm font-semibold">Login link</p>
      <div className="flex flex-col gap-1.5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <span className="text-xs font-semibold">Login link</span>
        <span className="truncate text-[11px] text-orange-600 underline decoration-orange-300 underline-offset-2">https://app.example.com/login/k7f2q9xw</span>
      </div>
      <span className="self-start rounded-md bg-gray-900 px-3 py-1.5 text-[11px] font-medium text-white">Continue</span>
    </div>
  );
};

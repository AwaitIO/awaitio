import type { FC } from 'react';

// Roughly what the example shows: the step's card with the Owner email field, its help text and Continue.
export const InputEmailOutput: FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-3 bg-gray-50 p-4 text-left text-gray-900 sm:p-5">
      <p className="text-sm font-semibold">Invite owner</p>
      <div className="flex flex-col gap-1.5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <span className="text-xs font-semibold">Owner email</span>
        <span className="flex h-8 items-center rounded-md border border-gray-300 px-2 text-[11px] text-gray-800 ring-2 ring-orange-200">
          omar@harbor.example
          <span className="ml-px h-3.5 w-px bg-gray-900" />
        </span>
        <span className="text-[11px] text-gray-500">Gets the invitation</span>
      </div>
      <span className="self-start rounded-md bg-gray-900 px-3 py-1.5 text-[11px] font-medium text-white">Continue</span>
    </div>
  );
};

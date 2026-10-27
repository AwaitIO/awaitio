import type { FC } from 'react';

// Roughly what the example shows: the step's card with the reason over a few lines, its help text and Continue.
export const InputTextareaOutput: FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-3 bg-gray-50 p-4 text-left text-gray-900 sm:p-5">
      <p className="text-sm font-semibold">Refund payment</p>
      <div className="flex flex-col gap-1.5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <span className="text-xs font-semibold">Why refund this payment?</span>
        <span className="flex h-24 flex-col rounded-md border border-gray-300 px-2 py-1.5 text-[11px] leading-5 text-gray-800 ring-2 ring-orange-200">
          <span>The parcel never arrived.</span>
          <span>
            The carrier lost it on the way to Lisbon.
            <span className="ml-px inline-block h-3.5 w-px translate-y-0.5 bg-gray-900" />
          </span>
        </span>
        <span className="text-[11px] text-gray-500">Goes to the customer with the refund</span>
      </div>
      <span className="self-start rounded-md bg-gray-900 px-3 py-1.5 text-[11px] font-medium text-white">Continue</span>
    </div>
  );
};

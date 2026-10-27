import type { FC } from 'react';

// Roughly what the example shows: the step's card with the Uploaded photo heading, the picture at medium height and
// Continue.
export const DisplayImageOutput: FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-3 bg-gray-50 p-4 text-left text-gray-900 sm:p-5">
      <p className="text-sm font-semibold">Review photo</p>
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <span className="text-xs font-semibold">Uploaded photo</span>
        <div className="relative h-40 w-56 max-w-full overflow-hidden rounded-lg bg-sky-100">
          <span className="absolute top-5 right-8 h-9 w-9 rounded-full bg-orange-400" />
          <span className="absolute -bottom-10 -left-6 h-24 w-40 rounded-[50%] bg-emerald-300" />
          <span className="absolute -right-8 -bottom-12 h-24 w-48 rounded-[50%] bg-emerald-500" />
        </div>
      </div>
      <span className="self-start rounded-md bg-gray-900 px-3 py-1.5 text-[11px] font-medium text-white">Continue</span>
    </div>
  );
};

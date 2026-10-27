import type { FC } from 'react';

const roles = ['Admin', 'Editor', 'Viewer'];

// Roughly what the example shows: the step's card with the New role drop-down open on Editor, and Continue.
export const SelectSingleOutput: FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-3 bg-gray-50 p-4 text-left text-gray-900 sm:p-5">
      <p className="text-sm font-semibold">Change role</p>
      <div className="flex flex-col gap-1.5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <span className="text-xs font-semibold">New role</span>
        <span className="flex h-8 items-center justify-between rounded-md border border-gray-300 px-2.5 text-xs ring-2 ring-orange-200">
          Editor<span className="text-gray-400">▾</span>
        </span>
        <div className="overflow-hidden rounded-md border border-gray-200 bg-white text-xs shadow-md">
          {roles.map((role) => {
            return (
              <div key={role} className={['px-2.5 py-1.5', role === 'Editor' && 'bg-orange-50 text-orange-700', role !== 'Editor' && 'text-gray-700'].filter(Boolean).join(' ')}>
                {role}
              </div>
            );
          })}
        </div>
      </div>
      <span className="self-start rounded-md bg-gray-900 px-3 py-1.5 text-[11px] font-medium text-white">Continue</span>
    </div>
  );
};

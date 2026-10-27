import type { FC } from 'react';

const plans = ['Free', 'Team', 'Business'];

// Roughly what the example shows: the step's card with the Plan drop-down open in the system's own menu, and Continue.
export const SelectSingleNativeOutput: FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-3 bg-gray-50 p-4 text-left text-gray-900 sm:p-5">
      <p className="text-sm font-semibold">Change plan</p>
      <div className="flex flex-col gap-1.5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <span className="text-xs font-semibold">Plan</span>
        <span className="flex h-8 items-center justify-between rounded-md border border-gray-300 bg-gray-50 px-2.5 text-xs shadow-sm">
          Team<span className="text-[10px] text-gray-500">⇅</span>
        </span>
        <div className="flex w-40 flex-col rounded-md border border-gray-300 bg-white py-1 text-xs shadow-lg">
          {plans.map((plan) => {
            return (
              <span key={plan} className={['flex items-center gap-2 px-2 py-1', plan === 'Team' && 'bg-orange-500 text-white', plan !== 'Team' && 'text-gray-800'].filter(Boolean).join(' ')}>
                <span className="w-2.5">{plan === 'Team' ? '✓' : ''}</span>
                {plan}
              </span>
            );
          })}
        </div>
      </div>
      <span className="self-start rounded-md bg-gray-900 px-3 py-1.5 text-[11px] font-medium text-white">Continue</span>
    </div>
  );
};

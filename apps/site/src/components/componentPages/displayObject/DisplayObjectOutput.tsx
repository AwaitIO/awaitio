import type { FC } from 'react';

// Roughly what the example shows: the step's card with the Account heading, the record as a tree and Continue.
export const DisplayObjectOutput: FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-3 bg-gray-50 p-4 text-left text-gray-900 sm:p-5">
      <p className="text-sm font-semibold">Show account</p>
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <span className="text-xs font-semibold">Account</span>
        <div className="overflow-hidden rounded-lg border border-gray-200 p-3 font-mono text-[11px] leading-relaxed text-gray-700">
          <div>{'{'}</div>
          <div className="pl-4">
            id: <span className="text-orange-600">42</span>
          </div>
          <div className="pl-4">
            name: <span className="text-emerald-700">&quot;Northwind&quot;</span>
          </div>
          <div className="truncate pl-4">
            ownerEmail: <span className="text-emerald-700">&quot;ana@northwind.example&quot;</span>
          </div>
          <div className="pl-4">
            isActive: <span className="text-sky-700">true</span>
          </div>
          <div className="pl-4">
            <span className="text-gray-400">▾</span> plan: {'{'}
          </div>
          <div className="pl-8">
            name: <span className="text-emerald-700">&quot;Team&quot;</span>
          </div>
          <div className="pl-8">
            seats: <span className="text-orange-600">25</span>
          </div>
          <div className="pl-4">{'}'}</div>
          <div className="truncate pl-4">
            createdAt: <span className="text-emerald-700">&quot;2026-10-16T09:30:00.000Z&quot;</span>
          </div>
          <div>{'}'}</div>
        </div>
      </div>
      <span className="self-start rounded-md bg-gray-900 px-3 py-1.5 text-[11px] font-medium text-white">Continue</span>
    </div>
  );
};

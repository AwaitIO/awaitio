import type { FC } from 'react';

const fields = [
  { label: 'Company name', value: 'Northwind Traders', rows: 1 },
  { label: 'Owner email', value: 'ana@northwind.example', rows: 1 },
  { label: 'Note for the team', value: 'Moving over from the old billing system in November.', rows: 3 },
];

// Roughly what the example shows: three fields on one card and a single Continue.
export const GroupOutput: FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-3 bg-gray-50 p-4 text-left text-gray-900 sm:p-5">
      <p className="text-sm font-semibold">Create account</p>
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        {fields.map((field) => {
          return (
            <div key={field.label} className="flex flex-col gap-1">
              <span className="text-xs font-semibold">{field.label}</span>
              <span className={['rounded-md border border-gray-300 px-2 py-1 text-[11px] text-gray-800', field.rows > 1 && 'min-h-14'].filter(Boolean).join(' ')}>{field.value}</span>
            </div>
          );
        })}
      </div>
      <span className="self-start rounded-md bg-gray-900 px-3 py-1.5 text-[11px] font-medium text-white">Continue</span>
    </div>
  );
};

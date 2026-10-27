import type { FC } from 'react';

const tiles = [
  { label: 'Users', value: '542' },
  { label: 'Admins', value: '3' },
  { label: 'Invited', value: '18' },
];

// Roughly what the example shows: three tiles in the step's card and Continue.
export const DisplayMetadataOutput: FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-3 bg-gray-50 p-4 text-left text-gray-900 sm:p-5">
      <p className="text-sm font-semibold">User totals</p>
      <div className="grid grid-cols-3 gap-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        {tiles.map((tile) => {
          return (
            <div key={tile.label} className="flex flex-col gap-1 rounded-lg border border-gray-200 px-3 py-2">
              <span className="text-[11px] text-gray-500">{tile.label}</span>
              <span className="text-lg font-semibold">{tile.value}</span>
            </div>
          );
        })}
      </div>
      <span className="self-start rounded-md bg-gray-900 px-3 py-1.5 text-[11px] font-medium text-white">Continue</span>
    </div>
  );
};

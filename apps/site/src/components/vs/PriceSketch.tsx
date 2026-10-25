import type { FC } from 'react';

// A row of seats, each with its own price tag, against one tag for the whole organization.
export const PriceSketch: FC = () => {
  return (
    <div className="flex w-full max-w-[16rem] flex-col gap-3 text-[11px]">
      <div className="flex items-center justify-between gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-500">
        <span className="flex gap-1">
          {[0, 1, 2, 3, 4, 5].map((seat) => {
            return <span key={seat} className="h-3 w-3 rounded-full bg-gray-300" />;
          })}
        </span>
        <span className="font-mono">per seat</span>
      </div>
      <div className="flex items-center justify-between gap-2 rounded-md border-[1.5px] border-orange-500 bg-white px-3 py-2 text-gray-900">
        <span className="flex gap-1">
          {[0, 1, 2, 3, 4, 5].map((seat) => {
            return <span key={seat} className="h-3 w-3 rounded-full bg-orange-500" />;
          })}
        </span>
        <span className="font-mono font-semibold">one price</span>
      </div>
    </div>
  );
};

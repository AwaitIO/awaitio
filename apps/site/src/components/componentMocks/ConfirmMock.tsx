import type { FC } from 'react';

export const ConfirmMock: FC = () => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="flex flex-col gap-2 rounded-md border border-gray-300 bg-white p-3">
        <span className="text-xs font-medium text-gray-900">Delete 12 files?</span>
        <div className="flex gap-2">
          <span className="rounded bg-gray-900 px-2 py-1 text-[10px] text-white">Confirm</span>
          <span className="rounded border border-gray-300 px-2 py-1 text-[10px] text-gray-700">Cancel</span>
        </div>
      </div>
    </div>
  );
};

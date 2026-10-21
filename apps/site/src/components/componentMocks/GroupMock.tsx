import type { FC } from 'react';

export const GroupMock: FC = () => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="flex flex-col gap-2 rounded-md border border-dashed border-gray-300 p-2">
        <div className="flex gap-2">
          <span className="h-6 flex-1 rounded border border-gray-300 bg-white" />
          <span className="h-6 flex-1 rounded border border-gray-300 bg-white" />
        </div>
        <span className="h-6 rounded border border-gray-300 bg-white" />
        <span className="h-5 w-16 rounded bg-gray-900" />
      </div>
    </div>
  );
};

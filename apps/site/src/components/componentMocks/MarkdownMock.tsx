import type { FC } from 'react';

export const MarkdownMock: FC = () => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="flex flex-col gap-1.5 rounded-md bg-white p-2">
        <span className="text-xs font-semibold text-gray-900">Refund policy</span>
        <span className="h-1.5 w-full rounded bg-gray-200" />
        <span className="h-1.5 w-5/6 rounded bg-gray-200" />
        <span className="flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-gray-500" />
          <span className="h-1.5 w-2/3 rounded bg-gray-200" />
        </span>
      </div>
    </div>
  );
};

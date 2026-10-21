import type { FC } from 'react';

export const HtmlMock: FC = () => {
  return (
    <div className="flex w-full flex-col gap-1 rounded-md bg-white p-2 text-[11px] text-gray-700">
      <span>
        Hi <b className="text-gray-900">Ada</b>, your order shipped.
      </span>
      <span className="text-blue-600 underline underline-offset-2">Track the package</span>
      <span className="h-1.5 w-3/4 rounded bg-gray-200" />
    </div>
  );
};

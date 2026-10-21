import type { FC } from 'react';

export const LinkMock: FC = () => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <span className="text-[11px] font-medium text-gray-700">Invoice</span>
      <span className="text-xs text-blue-600 underline underline-offset-2">Open in Stripe ↗</span>
    </div>
  );
};

import type { FC } from 'react';

export const HeadingMock: FC = () => {
  return (
    <div className="flex w-full flex-col gap-1">
      <span className="text-base font-semibold text-gray-900">Billing</span>
      <span className="text-xs text-gray-500">Plan, invoices and refunds</span>
      <span className="mt-1 h-px w-full bg-gray-200" />
    </div>
  );
};

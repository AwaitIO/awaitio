import type { FC } from 'react';

// Roughly what the example shows: the step's card with the formatted text and Continue.
export const DisplayMarkdownOutput: FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-3 bg-gray-50 p-4 text-left text-gray-900 sm:p-5">
      <p className="text-sm font-semibold">Delete account</p>
      <div className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-4 text-xs text-gray-700 shadow-sm">
        <span className="text-base font-semibold text-gray-900">Before you delete</span>
        <span>
          The account <b className="text-gray-900">Northwind</b> has 12 users.
        </span>
        <ul className="flex flex-col gap-1 pl-4">
          <li className="list-disc">Their runs stay in the log</li>
          <li className="list-disc">Invoices are kept for 10 years</li>
        </ul>
      </div>
      <span className="self-start rounded-md bg-gray-900 px-3 py-1.5 text-[11px] font-medium text-white">Continue</span>
    </div>
  );
};

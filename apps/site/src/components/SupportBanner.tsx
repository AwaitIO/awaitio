import { constants } from '../constants';
import type { FC } from 'react';

export const SupportBanner: FC = () => {
  return (
    <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-orange-400 bg-orange-50/40 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">Support AwaitIO</p>
        <p className="mt-1 text-gray-600">No license needed but you like AwaitIO? A sponsorship of any amount, once or monthly, funds its development.</p>
      </div>
      <a href={constants.SPONSORS_URL} className="shrink-0 self-start rounded-lg border border-orange-400 px-5 py-3 text-sm font-medium text-orange-700 hover:bg-orange-100 sm:self-auto">
        Sponsor on GitHub
      </a>
    </div>
  );
};

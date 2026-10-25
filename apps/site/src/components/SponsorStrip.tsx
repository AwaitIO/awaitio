import Link from 'next/link';
import { constants } from '../constants';
import { HeartIcon } from '../icons/HeartIcon';
import type { FC } from 'react';

export const SponsorStrip: FC = () => {
  return (
    <section className="flex flex-col items-center gap-4 border-t border-gray-900/10 px-4 py-16 text-center">
      <HeartIcon size="normal" className="h-20 w-20 text-orange-500" />
      <p className="max-w-sm text-gray-600">AwaitIO is free for small teams, made possible by companies and people who sponsor it.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <a href={constants.SPONSORS_URL} className="rounded-full border border-orange-400 px-5 py-2 text-sm font-medium text-orange-700 hover:bg-orange-50">
          Become a sponsor
        </a>
        <Link href="/pricing" className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          See pricing
        </Link>
      </div>
    </section>
  );
};

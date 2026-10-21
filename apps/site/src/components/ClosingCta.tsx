import Link from 'next/link';
import { constants } from '../constants';
import type { FC } from 'react';

export const ClosingCta: FC = () => {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 text-center">
      <h2 className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">Free for small teams</h2>
      <p className="mx-auto mt-4 max-w-xl text-gray-600">
        Up to 3 users free, including commercial use. Larger teams pay one flat monthly price per organization. Free or paid, it is the same software.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href={`${constants.DOCS_URL}/quickstart`} className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-700">
          Quickstart
        </a>
        <Link href="/pricing" className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium hover:bg-gray-50">
          See pricing
        </Link>
      </div>
    </section>
  );
};

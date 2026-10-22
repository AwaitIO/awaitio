import Link from 'next/link';
import { AppScreenshot } from './AppScreenshot';
import { constants } from '../constants';
import { TypeScriptIcon } from '../icons/TypeScriptIcon';
import type { FC } from 'react';

export const Hero: FC = () => {
  return (
    <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-orange-50/60 to-white">
      <div className="mx-auto max-w-4xl px-4 pt-24 pb-14 text-center">
        <p className="inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600">
          <TypeScriptIcon />
          TypeScript
        </p>
        <h1 className="mt-6 text-5xl leading-[1.15] font-semibold tracking-[-0.02em] sm:text-6xl">
          Backoffice written just like regular <span className="text-orange-500">API routes</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Each action is an async TypeScript function, like a route handler. Instead of reading a request, every <code className="rounded bg-gray-100 px-1.5 py-0.5 text-base">await io</code> asks a
          person in the browser and waits for the answer. There is no frontend to build and nothing else to host.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/demo" className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-700">
            Try the demo
          </Link>
          <a href={constants.DOCS_URL} className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium hover:bg-gray-50">
            Read the docs
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-4 pb-20">
        <AppScreenshot src="/preview.png" alt="The demo backoffice: the Users page with its actions, stats and a table of users" url="demo.awaitio.com/groups/users" />
      </div>
    </section>
  );
};

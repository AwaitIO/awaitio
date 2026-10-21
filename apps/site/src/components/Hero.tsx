import { constants } from '../constants';
import type { FC } from 'react';

export const Hero: FC = () => {
  return (
    <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-orange-50/60 to-white">
      <div className="mx-auto max-w-4xl px-4 pt-24 pb-20 text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          TypeScript · one Node process · your own app
        </p>
        <h1 className="mt-6 text-5xl leading-[1.15] font-semibold tracking-[-0.02em] sm:text-6xl">
          Internal tools with just <span className="text-orange-500">async/await</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Write each tool as an async TypeScript function. Every <code className="rounded bg-gray-100 px-1.5 py-0.5 text-base">await io</code> asks a person in the browser and waits for the answer.
          The server and the UI run inside your own app, so there is nothing else to host.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={constants.DOCS_URL} className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-700">
            Read the docs
          </a>
          <a href={constants.GITHUB_URL} className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium hover:bg-gray-50">
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

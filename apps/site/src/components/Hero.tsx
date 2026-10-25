import Link from 'next/link';
import { AppScreenshot } from './AppScreenshot';
import { HeroSun } from './HeroSun';
import { constants } from '../constants';
import { TypeScriptIcon } from '../icons/TypeScriptIcon';
import { FadeIn } from './motion/FadeIn';
import type { FC } from 'react';

export const Hero: FC = () => {
  return (
    <section className="relative overflow-hidden border-b border-gray-900 bg-paper">
      <div className="mx-auto max-w-4xl px-4 pt-24 pb-[206px] text-center xl:pb-[238px]">
        <FadeIn on="load">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600">
            <TypeScriptIcon />
            TypeScript
          </p>
        </FadeIn>
        <FadeIn on="load" delay={0.1}>
          <h1 className="mt-6 text-5xl leading-[1.1] font-semibold tracking-[-0.03em] sm:text-6xl">
            Backoffice written just like regular <span className="text-orange-500">API routes</span>
          </h1>
        </FadeIn>
        <FadeIn on="load" delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Each action is an async TypeScript function, like a route handler. Instead of reading a request, every <code className="rounded bg-gray-200 px-1.5 py-0.5 text-base">await io</code> asks a
            person in the browser and waits for the answer. There is no frontend to build and nothing else to host.
          </p>
        </FadeIn>
        <FadeIn on="load" delay={0.3} className="mt-10 flex flex-wrap justify-center gap-5">
          <Link href="/demo" className="offset-button rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-700">
            Try the demo
          </Link>
          <a href={constants.DOCS_URL} className="offset-button-secondary rounded-lg border-[1.5px] border-gray-900 bg-white px-5 py-3 text-sm font-medium hover:bg-gray-50">
            Read the docs
          </a>
        </FadeIn>
      </div>
      {/* The horizon runs across the whole width under the buttons, the sun sits on it on the right and the app window
          reaches up over it. */}
      <div className="horizon-band relative border-t border-gray-900">
        <HeroSun className="absolute right-[5%] bottom-full w-32 sm:w-44 lg:w-56 xl:-right-[6%] xl:w-[32rem]" />
        <div className="relative mx-auto -mt-[125.5px] max-w-5xl px-4 pb-20">
          <FadeIn on="load" delay={0.4}>
            <AppScreenshot src="/preview.png" alt="The demo backoffice: the Users page with its actions, stats and a table of users" url="demo.awaitio.com/groups/users" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

import { HowItWorksDemo } from './HowItWorksDemo';
import { FadeIn } from './motion/FadeIn';
import type { FC } from 'react';

// The homepage's code → UI section: the refund action running, its code next to the backoffice it drives.
export const HowItWorksSection: FC = () => {
  return (
    <section className="px-4 py-24">
      <FadeIn className="mx-auto max-w-3xl text-center">
        <p className="font-pixel text-xl text-orange-500 uppercase">How it works</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">Your code awaits, the browser answers</h2>
        <p className="mt-5 text-lg text-gray-600">
          Every <code className="rounded bg-gray-200 px-1.5 py-0.5 text-base">await io.input</code> call shows a form to the person running the action and pauses your function until they answer. Then
          it simply goes on.
        </p>
      </FadeIn>
      {/* The demo is wider than the rest of the page, up to 1800 px, so the code and the app sit side by side at full size. */}
      <FadeIn className="mx-auto mt-16 max-w-[1800px]">
        <HowItWorksDemo />
      </FadeIn>
    </section>
  );
};

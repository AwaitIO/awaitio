import { LayeredVariant } from './variants/LayeredVariant';
import type { FC } from 'react';

// The homepage's code → UI section: the code and the form it produces, overlapping like two sheets on a desk.
export const HowItWorksSection: FC = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-sm font-medium tracking-widest text-orange-500 uppercase">How it works</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">Your code awaits, the browser answers</h2>
        <p className="mt-5 text-lg text-gray-600">
          Every <code className="rounded bg-gray-100 px-1.5 py-0.5 text-base">await io.input</code> call shows a form to the person running the action and pauses your function until they answer. Then
          it simply goes on.
        </p>
      </div>
      <div className="mt-16">
        <LayeredVariant />
      </div>
    </section>
  );
};

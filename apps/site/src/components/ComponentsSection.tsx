import { BringYourOwnTile } from './BringYourOwnTile';
import { ComponentTile } from './ComponentTile';
import { componentShowcases } from '../utils/componentShowcases';
import { FadeIn } from './motion/FadeIn';
import type { FC } from 'react';

// Every io method with a sketch of how it looks, and the dashed tile for your own.
export const ComponentsSection: FC = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <FadeIn className="mx-auto max-w-3xl text-center">
        <p className="font-pixel text-xl text-orange-500 uppercase">Components</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">Everything you can await</h2>
        <p className="mt-5 text-lg text-gray-600">Each one is a call on io that shows a control and returns a typed value. Missing one? Write it.</p>
      </FadeIn>
      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {componentShowcases.map((component, index) => {
          return (
            <FadeIn key={component.method} className="grid" delay={(index % 4) * 0.1}>
              <ComponentTile component={component} />
            </FadeIn>
          );
        })}
        <FadeIn className="grid" delay={(componentShowcases.length % 4) * 0.1}>
          <BringYourOwnTile />
        </FadeIn>
      </div>
    </section>
  );
};

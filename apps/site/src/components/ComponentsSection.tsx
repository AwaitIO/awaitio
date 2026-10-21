import { BringYourOwnTile } from './BringYourOwnTile';
import { ComponentTile } from './ComponentTile';
import { componentShowcases } from '../utils/componentShowcases';
import type { FC } from 'react';

// Every io method with a sketch of how it looks, and the dashed tile for your own.
export const ComponentsSection: FC = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-sm font-medium tracking-widest text-orange-500 uppercase">Components</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">Everything you can await</h2>
        <p className="mt-5 text-lg text-gray-600">Each one is a call on io that shows a control and returns a typed value. Missing one? Write it.</p>
      </div>
      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {componentShowcases.map((component) => {
          return <ComponentTile key={component.method} component={component} />;
        })}
        <BringYourOwnTile />
      </div>
    </section>
  );
};

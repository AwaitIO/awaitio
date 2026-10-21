import { UseCaseCard } from './UseCaseCard';
import { useCases } from '../utils/useCases';
import type { FC } from 'react';

// Who AwaitIO is for, right after "How it works": the kinds of tools people build with it.
export const UseCasesSection: FC = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-sm font-medium tracking-widest text-orange-500 uppercase">What people build</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">Every tool your team keeps asking for</h2>
        <p className="mt-5 text-lg text-gray-600">Anything a person should run, fill in or approve, written as one async function next to the code it needs.</p>
      </div>
      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {useCases.map((useCase) => {
          return <UseCaseCard key={useCase.title} useCase={useCase} />;
        })}
      </div>
    </section>
  );
};

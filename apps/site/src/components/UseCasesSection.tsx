import { UseCaseCard } from './UseCaseCard';
import { useCases } from '../utils/useCases';
import { FadeIn } from './motion/FadeIn';
import type { FC } from 'react';

// Who AwaitIO is for, right after "How it works": the kinds of tools people build with it.
export const UseCasesSection: FC = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <FadeIn className="mx-auto max-w-3xl text-center">
        <p className="font-pixel text-xl text-orange-500 uppercase">What people build</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">Every tool your team keeps asking for</h2>
        <p className="mt-5 text-lg text-gray-600">Anything a person should run, fill in or approve, written as one async function next to the code it needs.</p>
      </FadeIn>
      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {useCases.map((useCase, index) => {
          return (
            <FadeIn key={useCase.title} className="grid" delay={(index % 4) * 0.1}>
              <UseCaseCard useCase={useCase} />
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
};

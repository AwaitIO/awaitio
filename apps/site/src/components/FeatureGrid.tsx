import { CodeFolderIcon } from './CodeFolderIcon';
import { FeatureCard } from './FeatureCard';
import { LayersIcon } from './LayersIcon';
import { PuzzleIcon } from './PuzzleIcon';
import { ShieldIcon } from './ShieldIcon';
import type { Feature } from '../types/Feature';
import { featureSnippets } from '../utils/featureSnippets';
import type { FC } from 'react';

const features: Feature[] = [
  {
    title: 'Bring your codebase',
    body: 'A handler is a plain function in your own process. Your Prisma client, services, utilities and environment variables work as they are.',
    icon: CodeFolderIcon,
    code: featureSnippets.codebase,
  },
  {
    title: 'Your own components',
    body: 'A component is plain React in one file, with its props and the value it returns. Register it next to the built-in ones and await it like any io method.',
    icon: PuzzleIcon,
    code: featureSnippets.components,
  },
  {
    title: 'Environments with their own secrets',
    body: 'Production, staging and local are separate servers with their own secrets and data. AwaitIO deploys with the rest of your app, and the header switches between them.',
    icon: LayersIcon,
    code: featureSnippets.environments,
  },
  {
    title: 'Private by default',
    body: 'Email and password login with scrypt hashes and signed cookies, runs visible only to the person who started them, and nothing sent anywhere: no hosted service, no telemetry.',
    icon: ShieldIcon,
    code: featureSnippets.private,
  },
];

export const FeatureGrid: FC = () => {
  return (
    <section className="border-t border-gray-100 bg-gray-50/60">
      <div className="mx-auto max-w-6xl px-4 py-24">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">Everything stays in your code and on your servers</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {features.map((feature) => {
            return <FeatureCard key={feature.title} feature={feature} />;
          })}
        </div>
      </div>
    </section>
  );
};

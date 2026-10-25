import type { ComparisonFacts } from '../types/ComparisonFacts';

// AwaitIO's side of every comparison table. No prices or license promises here: those stay on /pricing.
export const awaitioFacts: ComparisonFacts = {
  build: 'Write an async TypeScript function. Every `await io.input` call asks a person and waits for the answer.',
  runs: 'Inside your own Node app, on your own servers.',
  code: 'In your repo, with code review, types and git history.',
  ui: 'Comes from the code. Your own Node process serves it.',
  openSource: 'No. The source code is public. The terms are on the pricing page.',
};

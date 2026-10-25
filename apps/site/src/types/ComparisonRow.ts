import type { ComparisonFacts } from './ComparisonFacts';

// One row of the comparison table: which fact it shows and its label.
export type ComparisonRow = {
  key: keyof ComparisonFacts;
  label: string;
};

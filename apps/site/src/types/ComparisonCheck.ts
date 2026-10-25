import type { ComparisonCheckValue } from './ComparisonCheckValue';

// One row of the at-a-glance table on /vs/<slug>: a short capability and how each tool does on it.
export type ComparisonCheck = {
  label: string;
  awaitio: ComparisonCheckValue;
  them: ComparisonCheckValue;
};

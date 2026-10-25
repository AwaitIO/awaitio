import type { ComparisonRow } from '../types/ComparisonRow';

// The rows of the comparison table on every /vs/<slug> page, in order.
export const comparisonRows: ComparisonRow[] = [
  { key: 'build', label: 'How you build' },
  { key: 'runs', label: 'Where it runs' },
  { key: 'code', label: 'Where the code lives' },
  { key: 'ui', label: 'How the UI is made' },
  { key: 'openSource', label: 'Open source' },
];

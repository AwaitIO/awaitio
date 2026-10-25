import type { HowItWorksStep } from '../types/HowItWorksStep';

// The refund action from start to finish, in the order a person goes through it; the demo loops over it.
export const howItWorksSteps: HowItWorksStep[] = [
  { view: 'list', lines: [4, 6], duration: 2200 },
  { view: 'email', lines: [7, 7], duration: 900 },
  { view: 'typing', lines: [7, 7], duration: 1600 },
  { view: 'filled', lines: [7, 7], duration: 700 },
  { view: 'loading', lines: [8, 8], duration: 1300 },
  { view: 'table', lines: [10, 14], duration: 1300 },
  { view: 'pickOne', lines: [10, 14], duration: 800 },
  { view: 'pickTwo', lines: [10, 14], duration: 1200 },
  { view: 'refundOne', lines: [16, 23], duration: 1300 },
  { view: 'refundTwo', lines: [16, 23], duration: 1100 },
  { view: 'done', lines: [25, 25], duration: 2600 },
];

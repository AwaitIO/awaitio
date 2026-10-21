import type { UseCase } from '../types/UseCase';

export const useCases: UseCase[] = [
  {
    title: 'Back offices',
    description: 'Look up and edit customers, orders and coupons without building an admin.',
    iconPaths: ['M4 5h16v14H4z', 'M4 9h16', 'M9 9v10'],
  },
  {
    title: 'Customer support',
    description: 'Give support the few safe buttons they need, each one checked in code.',
    iconPaths: ['M4 13a8 8 0 0 1 16 0', 'M4 13v3a2 2 0 0 0 2 2h1v-6H4', 'M20 13v3a2 2 0 0 1-2 2h-1v-6h3'],
  },
  {
    title: 'One-off scripts, made safe',
    description: 'Turn the migration you would run from a laptop into an action with inputs and a confirmation.',
    iconPaths: ['M5 7l4 5-4 5', 'M12 17h7'],
  },
  {
    title: 'Reports and exports',
    description: 'Ask for a month or a customer and return a table, straight from your database.',
    iconPaths: ['M5 20V10', 'M12 20V4', 'M19 20v-7'],
  },
];

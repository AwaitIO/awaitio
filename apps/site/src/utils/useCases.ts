import { ChartIcon } from '../icons/ChartIcon';
import { HeadsetIcon } from '../icons/HeadsetIcon';
import { LayoutIcon } from '../icons/LayoutIcon';
import { TerminalIcon } from '../icons/TerminalIcon';
import type { UseCase } from '../types/UseCase';

export const useCases: UseCase[] = [
  {
    title: 'Back offices',
    description: 'Look up and edit customers, orders and coupons without building an admin.',
    icon: LayoutIcon,
  },
  {
    title: 'Customer support',
    description: 'Give support the few safe buttons they need, each one checked in code.',
    icon: HeadsetIcon,
  },
  {
    title: 'One-off scripts, made safe',
    description: 'Turn the migration you would run from a laptop into an action with inputs and a confirmation.',
    icon: TerminalIcon,
  },
  {
    title: 'Reports and exports',
    description: 'Ask for a month or a customer and return a table, straight from your database.',
    icon: ChartIcon,
  },
];

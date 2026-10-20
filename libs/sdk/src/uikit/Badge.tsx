import { themeBlock } from './themeBlock';
import type { HighlightColor } from '../shared/types/HighlightColor';
import type { ReactNode } from 'react';

// A short colored label, e.g. a status in a table cell: { label: 'Active', highlightColor: 'green' }.
export type BadgeProps = {
  color: HighlightColor;
  children: ReactNode;
};

export const Badge = themeBlock<BadgeProps>('Badge');

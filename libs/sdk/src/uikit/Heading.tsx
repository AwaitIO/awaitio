import { themeBlock } from './themeBlock';
import type { ReactNode } from 'react';

// The title of one block of a page, e.g. above a table.
export type HeadingProps = {
  children: ReactNode;
  description?: string;
};

export const Heading = themeBlock<HeadingProps>('Heading');

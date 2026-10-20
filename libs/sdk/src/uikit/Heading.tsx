import { themeBlock } from './themeBlock';
import type { ReactNode } from 'react';

// The title of one block of a page, e.g. above a table.
export type HeadingProps = {
  children: ReactNode;
  description?: string;
  // 2 for a section title that splits a form or page (io.display.heading); 3, the default, for the title of one block.
  level?: 2 | 3;
};

export const Heading = themeBlock<HeadingProps>('Heading');

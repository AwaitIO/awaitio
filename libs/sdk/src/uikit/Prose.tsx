import { themeBlock } from './themeBlock';
import type { ReactNode } from 'react';

// Formatted text: headings, paragraphs, lists, links and code from markdown (io.display.markdown).
export type ProseProps = {
  children: ReactNode;
};

export const Prose = themeBlock<ProseProps>('Prose');

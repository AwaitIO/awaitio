import type { DisplayElement } from './DisplayElement';
import type { LayoutElement } from './LayoutElement';
import type { LayoutTree } from './LayoutTree';
import type { z } from 'zod';

type LayoutChildren = {
  children: DisplayElement[];
};

// io.layout in a page: the built-in basic layout plus one function per registered layout, typed by its props schema.
export type Layouts<T extends LayoutTree> = {
  basic: (props: { title?: string; description?: string } & LayoutChildren) => LayoutElement;
} & {
  [K in keyof T]: (props: z.input<T[K]['props']> & LayoutChildren) => LayoutElement;
};

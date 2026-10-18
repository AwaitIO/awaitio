import type { ComponentDefinition } from './ComponentDefinition';
import type { ComponentTree } from './ComponentTree';
import type { DisplayDefinition } from './DisplayDefinition';
import type { DisplayElement } from './DisplayElement';
import type { z } from 'zod';

// The display components of the tree as page methods: { display: { table } } gives io.display.table(label, props).
export type DisplayTree<T extends ComponentTree> = {
  [K in keyof T as T[K] extends ComponentDefinition ? never : K]: T[K] extends DisplayDefinition
    ? (label: string, ...props: Record<string, never> extends z.input<T[K]['props']> ? [props?: z.input<T[K]['props']>] : [props: z.input<T[K]['props']>]) => DisplayElement
    : T[K] extends ComponentTree
    ? DisplayTree<T[K]>
    : never;
};

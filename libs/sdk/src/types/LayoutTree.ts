import type { LayoutDefinition } from './LayoutDefinition';

// The layouts pages can use: { basic: layoutBasic } gives io.layout.basic({ …, children }).
export type LayoutTree = {
  [key: string]: LayoutDefinition;
};

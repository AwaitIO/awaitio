import type { ComponentDefinition } from './ComponentDefinition';

// The shape of `io`: { input: { text: inputText } } becomes io.input.text().
export type ComponentTree = {
  [key: string]: ComponentDefinition | ComponentTree;
};

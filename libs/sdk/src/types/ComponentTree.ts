import type { ComponentDefinition } from './ComponentDefinition';
import type { DisplayDefinition } from './DisplayDefinition';

// The shape of `io`: { input: { text: inputText } } becomes io.input.text(), { display: { table: displayTable } }
// io.display.table() in pages.
export type ComponentTree = {
  [key: string]: ComponentDefinition | DisplayDefinition | ComponentTree;
};

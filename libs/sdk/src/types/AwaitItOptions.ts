import type { ComponentTree } from './ComponentTree';

export type AwaitItOptions<T extends ComponentTree> = {
  // io components available to every action, e.g. { input: { text: inputText } } for io.input.text().
  components?: T;
};

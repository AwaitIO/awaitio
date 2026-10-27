import type { CodeToken } from './CodeToken';
import type { ComponentOptionIcon } from './ComponentOptionIcon';

// One card in "What you can set" on /components/<slug>: a pixel icon of what the setting is about, its line of code and
// a bold lead-in with one or two sentences.
export type ComponentOption = {
  icon: ComponentOptionIcon;
  title: string;
  body: string;
  code: CodeToken[];
};

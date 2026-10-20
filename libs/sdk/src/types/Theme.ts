import type { ThemeBlockRef } from './ThemeBlockRef';
import type { ThemeBlocks } from '../uikit/types/ThemeBlocks';

// The `theme` option: which package draws each block. Every block is required, so a missing one is a type error:
// { ...defaultTheme, Label: myTheme.Label } keeps the default look and replaces only the label.
export type Theme = {
  [K in keyof ThemeBlocks]: ThemeBlockRef<K>;
};

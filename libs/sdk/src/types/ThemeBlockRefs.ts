import type { ThemeBlockRef } from './ThemeBlockRef';
import type { ThemeBlocks } from '../uikit/types/ThemeBlocks';

// What defineTheme() returns: one ref per block the theme package draws.
export type ThemeBlockRefs<TBlocks extends Partial<ThemeBlocks>> = {
  [K in keyof TBlocks & keyof ThemeBlocks]: ThemeBlockRef<K>;
};

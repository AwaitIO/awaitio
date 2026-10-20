import type { ThemeBlocks } from '../../uikit/types/ThemeBlocks';

// The browser half of a theme definition, registered by its built script.
export type ThemeUi = {
  blocks: Partial<ThemeBlocks>;
};

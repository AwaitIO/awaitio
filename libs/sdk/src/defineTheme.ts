import type { ThemeBlockRefs } from './types/ThemeBlockRefs';
import type { ThemeBlocks } from './uikit/types/ThemeBlocks';
import { callerDirectory } from './utils/callerDirectory';

// A theme package's blocks, each one tagged with the package's folder, so a block picked into another theme still
// brings its own script: theme: { ...defaultTheme, Label: myTheme.Label }.
export const defineTheme = <TBlocks extends Partial<ThemeBlocks>>(blocks: TBlocks): ThemeBlockRefs<TBlocks> => {
  const uiDirectory = callerDirectory({ depth: 1 });

  return Object.fromEntries(
    Object.entries(blocks).map(([name, component]) => {
      return [name, { kind: 'awaitio-theme-block', name, component, uiDirectory }];
    }),
  ) as ThemeBlockRefs<TBlocks>;
};

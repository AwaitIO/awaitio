import type { ThemeBlocks } from '../uikit/types/ThemeBlocks';

// One block of a theme package, e.g. defaultTheme.Label: the component and where its built browser script lives, so the
// server knows which theme script the UI has to load for it.
export type ThemeBlockRef<TName extends keyof ThemeBlocks = keyof ThemeBlocks> = {
  kind: 'awaitio-theme-block';
  name: TName;
  component: ThemeBlocks[TName];
  // Folder of the file that called defineTheme; `awaitio/vite` builds the script (and its CSS) into <folder>/ui.
  uiDirectory: string | null;
};

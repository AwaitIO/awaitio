import { mkdirSync, mkdtempSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { defineTheme } from '../defineTheme';
import type { Theme } from '../types/Theme';
import { themeBlockNames } from '../uikit/themeBlockNames';

// Stands in for the folder of a built theme package: <folder>/ui/ui.js.
const uiDirectory = mkdtempSync(join(tmpdir(), 'awaitio-theme-'));
mkdirSync(join(uiDirectory, 'ui'));
writeFileSync(join(uiDirectory, 'ui', 'ui.js'), 'window.testThemeLoaded = true;');

const refs = defineTheme(
  Object.fromEntries(
    themeBlockNames.map((name) => {
      return [
        name,
        () => {
          return null;
        },
      ];
    }),
  ),
);

// A theme that draws every block as nothing: the server tests only need it to exist.
export const testTheme = Object.fromEntries(
  Object.entries(refs).map(([name, ref]) => {
    return [name, { ...ref, uiDirectory }];
  }),
) as unknown as Theme;

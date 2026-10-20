import { mkdirSync, mkdtempSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { defineTheme } from '../defineTheme';

// A second theme package that draws only Label, picked into the test app's theme.
const uiDirectory = mkdtempSync(join(tmpdir(), 'awaitio-label-theme-'));
mkdirSync(join(uiDirectory, 'ui'));
writeFileSync(join(uiDirectory, 'ui', 'ui.js'), 'window.testLabelLoaded = true;');

export const testLabelBlock = {
  ...defineTheme({
    Label: () => {
      return null;
    },
  }).Label,
  uiDirectory,
};

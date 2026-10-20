import { themeBlockNames } from 'awaitio/ui';
import { expect, test } from 'vitest';
import { defaultTheme } from './defaultTheme';

test('Should draw every block of awaitio/ui, so it works without any other theme', () => {
  const missing = themeBlockNames.filter((name) => {
    return defaultTheme[name] === undefined;
  });

  expect(missing).toEqual([]);
});

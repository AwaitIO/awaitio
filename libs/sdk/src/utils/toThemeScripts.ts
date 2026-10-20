import type { Theme } from '../types/Theme';
import type { ThemeScripts } from '../types/ThemeScripts';
import { themeBlockNames } from '../uikit/themeBlockNames';

export type ToThemeScriptsArgs = {
  theme: Theme;
};

// Checks that the theme draws every block with a block of the same name, and lists the theme packages it takes them
// from; the types already ask for every block, this catches plain JavaScript and casts.
export const toThemeScripts = ({ theme }: ToThemeScriptsArgs): ThemeScripts => {
  const directories: string[] = [];
  const scriptByBlock: Record<string, number> = {};

  themeBlockNames.forEach((name) => {
    const ref: unknown = theme[name];
    const isRef = typeof ref === 'object' && ref !== null && 'kind' in ref && ref.kind === 'awaitio-theme-block';

    if (!isRef) {
      throw new Error(`theme.${name} is missing. Start from a theme package and replace only what you need: { ...defaultTheme, ${name}: myTheme.${name} }.`);
    }

    const block = ref as Theme[typeof name];

    if (block.name !== name) {
      throw new Error(`theme.${name} is the ${block.name} block of a theme; use a ${name} block.`);
    }

    if (!block.uiDirectory) {
      throw new Error(`theme.${name} does not say where its built script is. Create the theme with defineTheme() from awaitio.`);
    }

    if (!directories.includes(block.uiDirectory)) {
      directories.push(block.uiDirectory);
    }

    scriptByBlock[name] = directories.indexOf(block.uiDirectory);
  });

  return { directories, scriptByBlock };
};

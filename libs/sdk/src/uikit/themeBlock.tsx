import { hostGlobalName } from '../client/hostGlobalName';
import type { ThemeBlocks } from './types/ThemeBlocks';
import type { AwaitIOHost } from '../client/types/AwaitIOHost';
import type { FC } from 'react';

// A building block of awaitio/ui as the core sees it: only its props. What it looks like comes from the active theme,
// looked up when it renders, so a theme that replaces one block (a Label) changes it everywhere it is used.
export const themeBlock = <TProps extends object>(name: keyof ThemeBlocks): FC<TProps> => {
  const Block: FC<TProps> = (props) => {
    const host = (window as unknown as Record<string, AwaitIOHost | undefined>)[hostGlobalName];
    const Themed = host?.ui[name] as FC<TProps> | undefined;

    if (!Themed) {
      throw new Error(`The theme has no ${name}. Register a theme that provides it, e.g. @awaitio/theme-default.`);
    }

    return <Themed {...props} />;
  };
  Block.displayName = name;

  return Block;
};

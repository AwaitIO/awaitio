import { themeBlock } from './themeBlock';
import type { ReactNode } from 'react';

// A link to another page of the AwaitIO UI, e.g. an action with params; a plain click stays in the app (navigateTo).
export type LinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export const Link = themeBlock<LinkProps>('Link');

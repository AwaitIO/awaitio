import { themeBlock } from './themeBlock';
import type { ReactNode } from 'react';

// A box that holds a form, a result or a message.
export type CardProps = {
  children: ReactNode;
};

export const Card = themeBlock<CardProps>('Card');

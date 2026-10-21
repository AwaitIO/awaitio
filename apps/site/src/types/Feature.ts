import type { CodeSnippet } from './CodeSnippet';
import type { FC } from 'react';

export type Feature = {
  title: string;
  body: string;
  icon: FC;
  code: CodeSnippet;
};

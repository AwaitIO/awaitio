import type { CodeToken } from './CodeToken';

export type CodeSnippet = {
  file: string;
  lines: CodeToken[][];
  // Zero-based indexes of the lines the feature is about.
  focus: number[];
};

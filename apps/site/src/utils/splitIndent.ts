import type { CodeToken } from '../types/CodeToken';

// Takes the leading spaces off the first token, so a wrapped line can be laid out with a hanging indent.
export const splitIndent = (tokens: CodeToken[]) => {
  const [first, ...rest] = tokens;

  if (!first) {
    return { indent: 0, tokens };
  }

  const trimmed = first.text.trimStart();

  return { indent: first.text.length - trimmed.length, tokens: [{ ...first, text: trimmed }, ...rest] };
};

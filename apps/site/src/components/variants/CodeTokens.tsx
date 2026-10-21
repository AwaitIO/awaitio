import type { CodeToken } from '../../types/CodeToken';
import type { FC } from 'react';

export type CodeTokensProps = {
  tokens: CodeToken[];
  // Drops the indentation of the first token, for a line shown on its own.
  trimStart?: boolean;
};

export const CodeTokens: FC<CodeTokensProps> = ({ tokens, trimStart = false }) => {
  const shown = trimStart ? tokens.map((token, index) => (index === 0 ? { ...token, text: token.text.trimStart() } : token)) : tokens;

  return (
    <>
      {shown.map((token, index) => {
        return (
          <span key={index} className={token.className}>
            {token.text}
          </span>
        );
      })}
    </>
  );
};

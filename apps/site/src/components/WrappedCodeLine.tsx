import { match, P } from 'ts-pattern';
import type { CodeToken } from '../types/CodeToken';
import { splitIndent } from '../utils/splitIndent';
import { withBreakPoints } from '../utils/withBreakPoints';
import type { FC } from 'react';

export type WrappedCodeLineProps = {
  tokens: CodeToken[];
  isFocused: boolean;
};

// One code line that wraps instead of scrolling: the first row starts at the line's indent and every wrapped row
// two characters further in. A focused line gets a flat band over all its rows and the full width.
export const WrappedCodeLine: FC<WrappedCodeLineProps> = ({ tokens, isFocused }) => {
  const line = splitIndent(tokens);

  return (
    <div
      className={['-mx-3 pr-3 break-words whitespace-pre-wrap [overflow-wrap:anywhere]', isFocused && 'bg-white/[0.08]'].filter(Boolean).join(' ')}
      style={{ paddingLeft: `calc(${line.indent + 2}ch + 12px)`, textIndent: '-2ch' }}
    >
      {match(line.tokens)
        .with([], () => {
          return ' ';
        })
        .with(P.array(), (lineTokens) => {
          return lineTokens.map((token, index) => {
            return (
              <span key={index} className={token.className}>
                {withBreakPoints(token.text)}
              </span>
            );
          });
        })
        .exhaustive()}
    </div>
  );
};

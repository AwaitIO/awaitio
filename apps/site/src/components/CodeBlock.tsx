import { match, P } from 'ts-pattern';
import { WrappedCodeLine } from './WrappedCodeLine';
import type { CodeToken } from '../types/CodeToken';
import type { FC } from 'react';

export type CodeBlockProps = {
  lines: CodeToken[][];
  // Index of a line drawn with a light background, e.g. the one the browser is waiting on.
  highlightedLine?: number;
  // Lines the surrounding text talks about, marked with a flat band.
  focusLines?: number[];
  // Wrap long lines with a hanging indent instead of scrolling sideways.
  wrap?: boolean;
  className?: string;
};

// Every code snippet on the site, colored with the same palette.
export const CodeBlock: FC<CodeBlockProps> = ({ lines, highlightedLine, focusLines, wrap = false, className }) => {
  if (wrap) {
    return (
      <div className={['font-mono', className].filter(Boolean).join(' ')}>
        {lines.map((tokens, index) => {
          return <WrappedCodeLine key={index} tokens={tokens} isFocused={focusLines?.includes(index) ?? false} />;
        })}
      </div>
    );
  }

  return (
    // The outer padding keeps the code and the scrollbar off the terminal's edges; the inner box is as wide as the
    // longest line, so the highlighted bands run the full width of the code while it scrolls.
    <div className={['font-mono', className].filter(Boolean).join(' ')}>
      <pre className="code-scroll overflow-x-auto pb-2">
        <div className="w-max min-w-full pr-4">
          {lines.map((tokens, index) => {
            return (
              <div key={index} className={['-mx-2 rounded px-2', index === highlightedLine && 'bg-white/10', focusLines?.includes(index) && 'bg-white/[0.08]'].filter(Boolean).join(' ')}>
                {match(tokens)
                  .with([], () => {
                    return ' ';
                  })
                  .with(P.array(), (lineTokens) => {
                    return lineTokens.map((token, tokenIndex) => {
                      return (
                        <span key={tokenIndex} className={token.className}>
                          {token.text}
                        </span>
                      );
                    });
                  })
                  .exhaustive()}
              </div>
            );
          })}
        </div>
      </pre>
    </div>
  );
};

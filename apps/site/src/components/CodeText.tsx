import type { FC } from 'react';

export type CodeTextProps = {
  // Plain copy where text between backticks is inline code, e.g. "Every `await io.input` call asks a person."
  text: string;
};

// Copy from the data files with its `code` parts drawn as inline code.
export const CodeText: FC<CodeTextProps> = ({ text }) => {
  return (
    <>
      {text.split('`').map((part, index) => {
        if (index % 2 === 1) {
          return (
            <code key={index} className="rounded bg-gray-200 px-1 py-0.5 font-mono text-[0.9em] text-gray-900">
              {part}
            </code>
          );
        }

        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

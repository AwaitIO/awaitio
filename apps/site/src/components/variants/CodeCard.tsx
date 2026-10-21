import { CodeTokens } from './CodeTokens';
import type { CodeToken } from '../../types/CodeToken';
import { TrafficLights } from '../TrafficLights';
import type { FC, ReactNode } from 'react';

export type CodeCardLine = {
  tokens: CodeToken[];
  highlighted?: boolean;
  // Shown at the end of the line: a badge, a connector dot, an inline preview.
  aside?: ReactNode;
  // Shown under the line, inside the editor (inline previews).
  below?: ReactNode;
};

export type CodeCardProps = {
  lines: CodeCardLine[];
  fileName?: string;
  numbered?: boolean;
  className?: string;
};

export const CodeCard: FC<CodeCardProps> = ({ lines, fileName = 'src/actions/users/createUserAction.ts', numbered = false, className }) => {
  return (
    <div className={['min-w-0 overflow-hidden rounded-xl bg-[#17181c] shadow-xl ring-1 ring-black/5', className].filter(Boolean).join(' ')}>
      <div className="flex items-center gap-4 px-4 py-3">
        <TrafficLights />
        <span className="truncate font-mono text-xs text-gray-400">{fileName}</span>
      </div>
      <div className="overflow-x-auto px-4 pb-5 font-mono text-[12.5px] leading-6">
        {lines.map((line, index) => {
          return (
            <div key={index}>
              <div className={['-mx-2 flex items-center gap-3 rounded px-2 whitespace-pre', line.highlighted && 'bg-white/10'].filter(Boolean).join(' ')}>
                <span className={['w-5 shrink-0 text-right text-gray-600 select-none', !numbered && 'hidden'].filter(Boolean).join(' ')}>{index + 1}</span>
                <span className="text-gray-200">
                  <CodeTokens tokens={line.tokens} />
                </span>
                <span className="ml-auto pl-3">{line.aside}</span>
              </div>
              {line.below}
            </div>
          );
        })}
      </div>
    </div>
  );
};

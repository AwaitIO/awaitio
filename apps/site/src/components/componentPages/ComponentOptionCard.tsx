import type { ComponentOption } from '../../types/ComponentOption';
import { componentOptionIcons } from '../../utils/componentOptionIcons';
import { CodeText } from '../CodeText';
import type { FC } from 'react';

export type ComponentOptionCardProps = {
  option: ComponentOption;
};

// What one setting does: its pixel icon, its line of code on the ink chip and a bold lead-in with a sentence or two, on
// a sand panel. The page sets them in rows of three, so the code has room.
export const ComponentOptionCard: FC<ComponentOptionCardProps> = ({ option }) => {
  const Icon = componentOptionIcons[option.icon];

  return (
    <div className="flex min-w-0 flex-col gap-5 rounded-xl border-[1.5px] border-gray-900/10 bg-gray-100 p-5">
      <Icon size="coarse" className="h-10 w-10 shrink-0 text-gray-900" />
      <div className="rounded-md bg-gray-900 px-3 py-2 font-mono text-[11px] leading-5 break-words">
        {option.code.map((token, index) => {
          return (
            <span key={index} className={token.className}>
              {token.text}
            </span>
          );
        })}
      </div>
      <p className="text-gray-600">
        <span className="font-semibold text-gray-900">{option.title}</span> <CodeText text={option.body} />
      </p>
    </div>
  );
};

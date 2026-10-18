import { constants as sharedConstants } from '../shared/constants';
import type { FC, ReactNode } from 'react';

export type LinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

// A link to another page of the AwaitIO UI, e.g. an action with params. A plain click stays in the app; a click with
// a modifier key opens a new tab as usual.
export const Link: FC<LinkProps> = ({ href, children, className = 'text-blue-600 underline-offset-2 hover:text-blue-800 hover:underline' }) => {
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
          return;
        }

        event.preventDefault();
        window.history.pushState(null, '', href);
        window.dispatchEvent(new Event(sharedConstants.NAVIGATE_EVENT));
      }}
    >
      {children}
    </a>
  );
};

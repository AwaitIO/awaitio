import { navigateTo, type LinkProps } from 'awaitio/ui';
import type { FC } from 'react';

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
        navigateTo(href);
      }}
    >
      {children}
    </a>
  );
};

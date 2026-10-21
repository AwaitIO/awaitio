import { withBasePath } from '../../uikit/withBasePath';
import { navigate } from '../utils/navigate';
import type { FC, ReactNode } from 'react';

export type NavLinkProps = {
  // A route of the UI (routes.action()); the link itself points under the basePath.
  href: string;
  className?: string;
  // Runs instead of plain navigation, e.g. to cancel a running action first.
  onNavigate?: (href: string) => void;
  children: ReactNode;
};

// A real link: it opens in a new tab with a modifier key, a plain click stays in the app.
export const NavLink: FC<NavLinkProps> = ({ href, className, onNavigate = navigate, children }) => {
  return (
    <a
      href={withBasePath(href)}
      className={className}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
          return;
        }

        event.preventDefault();
        onNavigate(href);
      }}
    >
      {children}
    </a>
  );
};

import { constants } from '../../constants';
import { ArrowIcon } from '../../icons/ArrowIcon';
import type { ComponentDocsLink } from '../../types/ComponentDocsLink';
import type { FC } from 'react';

export type ComponentDocsLinksProps = {
  links: ComponentDocsLink[];
};

// The docs pages to read next, one card each, opened in a new tab.
export const ComponentDocsLinks: FC<ComponentDocsLinksProps> = ({ links }) => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {links.map((link) => {
        return (
          <a
            key={link.path}
            href={`${constants.DOCS_URL}${link.path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group offset-card flex flex-col gap-2 bg-white p-6 transition-[border-color,box-shadow] hover:border-orange-500 hover:shadow-[5px_5px_0_var(--color-orange-500)]"
          >
            <span className="font-mono text-xs text-gray-500">docs.awaitio.com{link.path}</span>
            <span className="inline-flex items-center gap-1.5 text-lg font-semibold transition-colors group-hover:text-orange-600">
              {link.label}
              <ArrowIcon />
            </span>
            <span className="text-sm text-gray-600">{link.description}</span>
          </a>
        );
      })}
    </div>
  );
};

import Link from 'next/link';
import { constants } from '../constants';
import { ArrowIcon } from '../icons/ArrowIcon';
import type { FC } from 'react';

export type NotFoundActionsProps = {
  className?: string;
};

// The two ways out of the 404 page: back to the home page, or the docs in a new tab.
export const NotFoundActions: FC<NotFoundActionsProps> = ({ className = 'justify-center' }) => {
  return (
    <div className={['flex flex-wrap gap-5', className].join(' ')}>
      <Link href="/" className="offset-button rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-700">
        Back to home
      </Link>
      <a
        href={constants.DOCS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="offset-button-secondary inline-flex items-center gap-1 rounded-lg border-[1.5px] border-gray-900 bg-white px-5 py-3 text-sm font-medium hover:bg-gray-50"
      >
        Read the docs
        <ArrowIcon />
      </a>
    </div>
  );
};

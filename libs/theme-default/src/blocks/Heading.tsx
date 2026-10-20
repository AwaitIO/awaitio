import type { HeadingProps } from 'awaitio/ui';
import type { FC } from 'react';

// The title of one block of a page, e.g. above a table.
export const Heading: FC<HeadingProps> = ({ children, description }) => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-base font-semibold text-gray-900">{children}</h2>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
};

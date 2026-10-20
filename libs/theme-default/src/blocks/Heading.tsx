import type { HeadingProps } from 'awaitio/ui';
import type { FC } from 'react';

// The title of one block of a page, e.g. above a table; level 2 is a bigger section title with room above it.
export const Heading: FC<HeadingProps> = ({ children, description, level = 3 }) => {
  if (level === 2) {
    return (
      <div className="flex flex-col gap-1 pt-2">
        <h2 className="text-lg font-semibold text-gray-900">{children}</h2>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-base font-semibold text-gray-900">{children}</h3>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
};

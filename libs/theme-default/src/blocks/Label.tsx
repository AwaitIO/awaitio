import type { LabelProps } from 'awaitio/ui';
import type { FC } from 'react';

export const Label: FC<LabelProps> = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium">
      {children}
    </label>
  );
};

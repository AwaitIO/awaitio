import type { HintProps } from 'awaitio/ui';
import type { FC } from 'react';

// Small secondary text under a control, e.g. the time zone of a date field.
export const Hint: FC<HintProps> = ({ children }) => {
  return <p className="text-xs text-gray-500">{children}</p>;
};

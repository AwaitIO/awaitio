import type { FC, ReactNode } from 'react';

export type HintProps = {
  children: ReactNode;
};

// Small secondary text under a control, e.g. the time zone of a date field.
export const Hint: FC<HintProps> = ({ children }) => {
  return <p className="text-xs text-gray-500">{children}</p>;
};

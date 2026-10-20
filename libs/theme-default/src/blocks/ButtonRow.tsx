import type { ButtonRowProps } from 'awaitio/ui';
import type { FC } from 'react';

// Buttons next to each other with a small gap, wrapping on a narrow screen.
export const ButtonRow: FC<ButtonRowProps> = ({ children }) => {
  return <div className="flex flex-wrap gap-2">{children}</div>;
};

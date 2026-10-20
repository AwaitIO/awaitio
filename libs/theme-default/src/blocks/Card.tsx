import type { CardProps } from 'awaitio/ui';
import type { FC } from 'react';

export const Card: FC<CardProps> = ({ children }) => {
  return <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">{children}</div>;
};

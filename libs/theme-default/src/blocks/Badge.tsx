import type { BadgeProps, HighlightColor } from 'awaitio/ui';
import type { FC } from 'react';

// Whole class names, so Tailwind finds them in the source.
const colorClassNames: Record<HighlightColor, string> = {
  red: 'bg-red-100 text-red-800',
  orange: 'bg-orange-100 text-orange-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  green: 'bg-green-100 text-green-800',
  blue: 'bg-blue-100 text-blue-800',
  purple: 'bg-purple-100 text-purple-800',
  pink: 'bg-pink-100 text-pink-800',
  gray: 'bg-gray-100 text-gray-700',
};

// A small rounded label in a soft background of its color.
export const Badge: FC<BadgeProps> = ({ color, children }) => {
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${colorClassNames[color]}`}>{children}</span>;
};

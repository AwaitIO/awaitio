import type { FC } from 'react';

// The chevron of a drop-down, drawn by the theme instead of the browser so it keeps a gap from the right edge.
export const SelectArrow: FC = () => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-gray-500"
    >
      <path d="M6 8l4 4 4-4" />
    </svg>
  );
};

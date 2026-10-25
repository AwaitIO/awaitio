import { CursorIcon } from '../icons/CursorIcon';
import type { FC } from 'react';

export type DemoCursorProps = {
  // How long after the step starts the pointer sets off, in milliseconds, so the click lands at the end of the step.
  delay: number;
};

// A mouse pointer that glides onto the element it sits in and clicks it. The element needs `relative`; the pointer
// ends at its center.
export const DemoCursor: FC<DemoCursorProps> = ({ delay }) => {
  return (
    <span className="pointer-events-none absolute top-1/2 left-1/2 z-10 animate-cursor-click opacity-0" style={{ animationDelay: `${delay}ms` }}>
      <CursorIcon />
    </span>
  );
};

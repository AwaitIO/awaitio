'use client';

import { useEffect, useState } from 'react';
import type { FC } from 'react';

export type TypedTextProps = {
  text: string;
  // Time to type the whole text, in milliseconds.
  duration: number;
};

// Text that appears one character at a time, as if someone typed it, with a caret after it.
export const TypedText: FC<TypedTextProps> = ({ text, duration }) => {
  const [length, setLength] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLength((typed) => {
        return Math.min(text.length, typed + 1);
      });
    }, duration / text.length);

    return () => {
      clearInterval(timer);
    };
  }, [text, duration]);

  return (
    <span>
      {text.slice(0, length)}
      <span className="ml-px inline-block h-[1em] w-px translate-y-[2px] animate-pulse bg-gray-900" />
    </span>
  );
};

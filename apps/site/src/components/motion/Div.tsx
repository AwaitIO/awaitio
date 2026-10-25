'use client';

import { motion } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';
import type { FC } from 'react';

export type DivProps = HTMLMotionProps<'div'>;

// A div that can animate: pass `initial`, `animate` or `whileInView` and it moves, without them
// it is a plain div.
export const Div: FC<DivProps> = (props) => {
  return <motion.div {...props} />;
};

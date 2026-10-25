'use client';

import { MotionConfig } from 'motion/react';
import type { FC, ReactNode } from 'react';

export type MotionSettingsProps = {
  children: ReactNode;
};

// Everything that moves on the site follows the visitor's "reduce motion" setting: with it on, blocks appear in place.
export const MotionSettings: FC<MotionSettingsProps> = ({ children }) => {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
};

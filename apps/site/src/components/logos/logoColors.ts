import { match } from 'ts-pattern';
import type { LogoMarkProps } from './LogoMarkProps';

export type LogoColorsArgs = {
  tone: LogoMarkProps['tone'];
};

// Ink is the main color, paper the color of the background the mark sits on; the dot is always orange.
export const logoColors = ({ tone }: LogoColorsArgs) => {
  return match(tone)
    .with('light', () => {
      return { ink: '#111827', paper: '#ffffff', accent: '#f97316' };
    })
    .with('dark', () => {
      return { ink: '#ffffff', paper: '#111827', accent: '#f97316' };
    })
    .exhaustive();
};

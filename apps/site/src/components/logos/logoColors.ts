import { match } from 'ts-pattern';
import type { LogoMarkProps } from './LogoMarkProps';

export type LogoColorsArgs = {
  tone: LogoMarkProps['tone'];
};

// Ink is the main color, paper the color of the background the mark sits on; the dot is always the sun orange and a
// finished step always green.
export const logoColors = ({ tone }: LogoColorsArgs) => {
  return match(tone)
    .with('light', () => {
      return { ink: '#2B2621', paper: '#EDE8DF', accent: '#D9733F', done: '#3F8A5A' };
    })
    .with('dark', () => {
      return { ink: '#FBF8F2', paper: '#2B2621', accent: '#D9733F', done: '#5FA878' };
    })
    .exhaustive();
};

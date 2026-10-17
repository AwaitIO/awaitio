import { match } from 'ts-pattern';
import { constants } from '../constants';
import type { FaviconState } from '../types/FaviconState';

export type RenderFaviconSvgArgs = {
  state: FaviconState;
  ink: string;
  // Share of the ring the arc covers, 0–1, starting at the top and going clockwise.
  progress: number;
};

const RADIUS = 11;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Logo 10 in a 32×32 box: a tinted ring, the arc over `progress` of it and a dot at the arc's end. The dot is orange
// while AwaitIO is busy or waits for the person, in the ink color otherwise.
export const renderFaviconSvg = ({ state, ink, progress }: RenderFaviconSvgArgs) => {
  const angle = progress * 2 * Math.PI;
  const dotX = (16 + RADIUS * Math.sin(angle)).toFixed(2);
  const dotY = (16 - RADIUS * Math.cos(angle)).toFixed(2);
  const dotColor = match(state)
    .with('idle', () => {
      return ink;
    })
    .with('busy', 'waiting', () => {
      return constants.FAVICON_ACCENT;
    })
    .exhaustive();

  return [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">',
    `<circle cx="16" cy="16" r="${RADIUS}" stroke="${ink}" stroke-opacity="0.18" stroke-width="3.5"/>`,
    // A full circle drawn from the top, clockwise, of which the dash shows the first `progress`.
    `<path d="M16 5a11 11 0 1 1 0 22a11 11 0 1 1 0-22" stroke="${ink}" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="${(progress * CIRCUMFERENCE).toFixed(2)} ${CIRCUMFERENCE.toFixed(
      2,
    )}"/>`,
    `<circle cx="${dotX}" cy="${dotY}" r="3.2" fill="${dotColor}"/>`,
    '</svg>',
  ].join('');
};

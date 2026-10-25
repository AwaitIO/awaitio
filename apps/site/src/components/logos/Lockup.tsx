import { match } from 'ts-pattern';
import { LogoMark } from './LogoMark';
import type { LogoMarkProps } from './LogoMarkProps';
import type { FC } from 'react';

export type LockupProps = {
  // Height of the icon in px; the wordmark and the gap follow from it.
  size: number;
  tone: LogoMarkProps['tone'];
  Mark?: FC<LogoMarkProps>;
};

// The icon with the "AwaitIO" wordmark (IBM Plex Mono, "Await" semibold and "IO" regular, 0.08em tracking) in one fixed
// proportion everywhere: the text is 0.75 of the icon's height and
// sits 0.25 of it away, centered on the icon. The downloadable SVG lockups use the same ratio (32 / 24 / 8).
export const Lockup: FC<LockupProps> = ({ size, tone, Mark = LogoMark }) => {
  const color = match(tone)
    .with('light', () => {
      return '#2B2621';
    })
    .with('dark', () => {
      return '#FBF8F2';
    })
    .exhaustive();

  return (
    <span className="inline-flex items-center" style={{ gap: size * 0.25 }}>
      <Mark size={size} tone={tone} />
      <span className="leading-none" style={{ fontSize: size * 0.75, fontFamily: 'var(--font-wordmark), ui-monospace, monospace', letterSpacing: '0.08em', color }}>
        <span style={{ fontWeight: 600 }}>Await</span>
        <span style={{ fontWeight: 400 }}>IO</span>
      </span>
    </span>
  );
};

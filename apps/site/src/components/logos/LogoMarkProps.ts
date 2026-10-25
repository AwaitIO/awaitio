export type LogoMarkProps = {
  size: number;
  // 'dark' draws the mark for a dark background: the ink turns white.
  tone: 'light' | 'dark';
  // The mark as a loader: how far the ring is filled, 0 to 1; the logo itself sits at 0.3.
  progress?: number;
  // The finished step: the ring turns green with a check inside.
  done?: boolean;
  // How far the waiting dot is through its pulse, 0 to 1: it swells a little and settles back.
  pulse?: number;
  // The check grows from its centre by this factor, for the short pop when a step finishes.
  checkScale?: number;
};

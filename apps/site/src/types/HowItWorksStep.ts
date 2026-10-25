// One moment of the animated how-it-works demo: what the app shows, which code lines are running and for how long.
export type HowItWorksStep = {
  view: 'list' | 'email' | 'typing' | 'filled' | 'loading' | 'table' | 'pickOne' | 'pickTwo' | 'refundOne' | 'refundTwo' | 'done';
  // First and last line number of the code that runs at this moment, both included.
  lines: [number, number];
  // How long the moment stays on screen, in milliseconds.
  duration: number;
};

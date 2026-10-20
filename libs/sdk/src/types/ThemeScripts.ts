// The theme scripts the UI loads (by position: /themes/0/ui.js…) and which of them draws each block.
export type ThemeScripts = {
  directories: string[];
  scriptByBlock: Record<string, number>;
};

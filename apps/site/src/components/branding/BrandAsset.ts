import type { LogoMarkProps } from '../logos/LogoMarkProps';
import type { FC } from 'react';

export type BrandAsset = {
  name: string;
  description: string;
  // Draws the preview: the icon alone or the icon with the wordmark.
  kind: 'icon' | 'lockup';
  Mark: FC<LogoMarkProps>;
  tone: LogoMarkProps['tone'];
  // File name in public/branding without the extension; every asset has an .svg and a .png.
  file: string;
};

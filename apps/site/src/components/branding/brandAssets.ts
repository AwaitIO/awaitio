import type { BrandAsset } from './BrandAsset';
import { LogoMark } from '../logos/LogoMark';

export const brandAssets: BrandAsset[] = [
  { name: 'Logo', description: 'The default: icon and wordmark, on sand or light backgrounds.', kind: 'lockup', Mark: LogoMark, tone: 'light', file: 'awaitio-logo' },
  { name: 'Logo on dark', description: 'For dark backgrounds; the ink turns cream, the dot stays orange.', kind: 'lockup', Mark: LogoMark, tone: 'dark', file: 'awaitio-logo-dark' },
  { name: 'Icon', description: 'Favicons, avatars and app icons.', kind: 'icon', Mark: LogoMark, tone: 'light', file: 'awaitio-icon' },
  { name: 'Icon on dark', description: 'The icon for dark backgrounds.', kind: 'icon', Mark: LogoMark, tone: 'dark', file: 'awaitio-icon-dark' },
];

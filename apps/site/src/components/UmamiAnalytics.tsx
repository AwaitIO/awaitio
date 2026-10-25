import Script from 'next/script';
import { constants } from '../constants';
import type { FC } from 'react';

// Umami Cloud page views. `data-domains` makes it count only awaitio.com, so localhost and previews send nothing.
export const UmamiAnalytics: FC = () => {
  return <Script defer src="https://cloud.umami.is/script.js" data-website-id={constants.UMAMI_WEBSITE_ID} data-domains="awaitio.com" strategy="afterInteractive" />;
};

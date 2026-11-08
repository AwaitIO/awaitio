/* eslint-disable no-process-env */
import Script from 'next/script';

// Self-hosted Umami page views. `data-domains` makes it count only awaitio.com, so localhost and test deploys send nothing.
export const UmamiAnalytics = () => {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return <Script defer src="https://analytics.orukami.cz/script.js" data-website-id="24bf6e2e-6a4a-46b6-9038-fc88fe2f59f0" data-domains="awaitio.com" />;
};

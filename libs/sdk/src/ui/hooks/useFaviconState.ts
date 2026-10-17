import { useEffect } from 'react';
import { constants } from '../constants';
import type { FaviconState } from '../types/FaviconState';
import { faviconInk } from '../utils/faviconInk';
import { renderFaviconSvg } from '../utils/renderFaviconSvg';
import { setFavicon } from '../utils/setFavicon';

// Shows the state in the tab icon while the calling page is mounted; leaving the page puts the idle icon back.
export const useFaviconState = (state: FaviconState) => {
  useEffect(() => {
    const ink = faviconInk();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const showIdle = () => {
      setFavicon({ svg: renderFaviconSvg({ state: 'idle', ink, progress: constants.FAVICON_STATIC_PROGRESS }) });
    };

    setFavicon({ svg: renderFaviconSvg({ state, ink, progress: constants.FAVICON_STATIC_PROGRESS }) });

    if (state !== 'busy' || reducedMotion) {
      return showIdle;
    }

    // The arc grows from the top all the way round, then starts again.
    const startedAt = performance.now();
    const timer = window.setInterval(() => {
      const progress = ((performance.now() - startedAt) % constants.FAVICON_FILL_PERIOD_MS) / constants.FAVICON_FILL_PERIOD_MS;
      setFavicon({ svg: renderFaviconSvg({ state, ink, progress }) });
    }, 1000 / constants.FAVICON_FRAMES_PER_SECOND);

    return () => {
      window.clearInterval(timer);
      showIdle();
    };
  }, [state]);
};

'use client';

import { useState } from 'react';
import { TrafficLights } from './TrafficLights';
import { constants } from '../constants';
import styles from './HeroAppScreenshot.module.css';
import { PlayIcon } from '../icons/PlayIcon';
import type { FC } from 'react';

export type HeroAppScreenshotProps = {
  src: string;
  alt: string;
  url: string;
  // A YouTube video ID: the screenshot becomes its thumbnail with a play button, and a click plays it in the window.
  videoId?: string;
};

// The demo app in a browser window, as a screenshot or as the thumbnail of a demo video that plays in the same window.
export const HeroAppScreenshot: FC<HeroAppScreenshotProps> = ({ src, alt, url, videoId }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative">
      {/* The Product Hunt badge sticks over the top right corner of the window, slapped on a little crooked. */}
      <a
        href={constants.PRODUCT_HUNT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.popIn} absolute -top-5 right-3 z-10 sm:-top-6 sm:-right-4`}
        style={{ animationDelay: '0.65s' }}
      >
        <span className="block rotate-[4deg] rounded-[10px] shadow-[3px_3px_0_var(--color-gray-900)] transition-transform hover:rotate-0">
          <img
            src={constants.PRODUCT_HUNT_BADGE_URL}
            alt="AwaitIO - Write a TypeScript function, get an admin screen | Product Hunt"
            width={250}
            height={54}
            className="block h-10 w-auto sm:h-[54px]"
          />
        </span>
      </a>
      <div className="offset-card overflow-hidden bg-white">
        <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50 px-4 py-3">
          <TrafficLights />
          <span className="flex-1 truncate rounded-md bg-white px-2 py-0.5 text-left font-mono text-[11px] text-gray-500 ring-1 ring-gray-200">{url}</span>
        </div>
        {videoId && playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title="AwaitIO demo video"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="block aspect-video w-full bg-gray-950"
          />
        ) : videoId ? (
          <button
            type="button"
            onClick={() => {
              setPlaying(true);
            }}
            className="group relative block w-full cursor-pointer"
          >
            <img src={src} alt={alt} className="aspect-[2/1] w-full object-cover object-top" />
            <span className="absolute inset-0 bg-gray-900/0 transition-colors group-hover:bg-gray-900/10" />
            <span className="absolute inset-0 flex items-center justify-center">
              {/* Comes in after the window itself has risen into place. */}
              <span className={styles.popIn} style={{ animationDelay: '0.5s' }}>
                <span className="offset-button inline-flex items-center gap-3 rounded-full bg-gray-900 py-3 pr-6 pl-4 text-base font-medium text-white transition-transform group-hover:scale-105 group-active:scale-95">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500">
                    <PlayIcon className="ml-0.5 h-4 w-4" />
                  </span>
                  Watch demo
                </span>
              </span>
            </span>
          </button>
        ) : (
          <img src={src} alt={alt} className="aspect-[2/1] w-full object-cover object-top" />
        )}
      </div>
    </div>
  );
};

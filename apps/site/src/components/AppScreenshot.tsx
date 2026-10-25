import { TrafficLights } from './TrafficLights';
import type { FC } from 'react';

export type AppScreenshotProps = {
  src: string;
  alt: string;
  url: string;
};

// The demo app in a browser window. Swap the image for a video later, same box.
export const AppScreenshot: FC<AppScreenshotProps> = ({ src, alt, url }) => {
  return (
    <div className="offset-card overflow-hidden bg-white">
      <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50 px-4 py-3">
        <TrafficLights />
        <span className="flex-1 truncate rounded-md bg-white px-2 py-0.5 text-left font-mono text-[11px] text-gray-500 ring-1 ring-gray-200">{url}</span>
      </div>
      <img src={src} alt={alt} className="aspect-[2/1] w-full object-cover object-top" />
    </div>
  );
};

import { CodeBlock } from './CodeBlock';
import { TrafficLights } from './TrafficLights';
import type { Feature } from '../types/Feature';
import type { FC } from 'react';

export type FeatureCardProps = {
  feature: Feature;
};

// The text on top, inset from the card's edge on desktop, and the terminal under it, stretched so two cards side by
// side end at the same height.
export const FeatureCard: FC<FeatureCardProps> = ({ feature }) => {
  const Icon = feature.icon;

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="flex flex-col gap-3 lg:px-2.5 lg:pt-2">
        <Icon />
        <h3 className="text-xl font-semibold tracking-[-0.02em]">{feature.title}</h3>
        <p className="text-base text-gray-600">{feature.body}</p>
      </div>
      <div className="min-w-0 flex-1 overflow-hidden rounded-xl bg-[#17181c] ring-1 ring-black/5">
        <div className="flex items-center gap-4 px-4 py-3">
          <TrafficLights />
          <span className="truncate font-mono text-xs text-gray-400">{feature.code.file}</span>
        </div>
        <CodeBlock lines={feature.code.lines} focusLines={feature.code.focus} wrap className="px-5 pt-1 pb-4 text-[12px] leading-6" />
      </div>
    </div>
  );
};

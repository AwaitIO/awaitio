import type { PricingTierInfo } from '../types/PricingTierInfo';
import type { FC } from 'react';

export type PricingTierProps = {
  tier: PricingTierInfo;
};

export const PricingTier: FC<PricingTierProps> = ({ tier }) => {
  return (
    <div className={['flex flex-col gap-3 rounded-2xl border p-6', tier.highlighted && 'border-gray-900 shadow-lg', !tier.highlighted && 'border-gray-200'].filter(Boolean).join(' ')}>
      <p className="text-sm font-medium text-gray-500">{tier.name}</p>
      <p className="text-4xl font-semibold tracking-[-0.02em]">{tier.price}</p>
      <p className="text-sm text-gray-500">{tier.detail}</p>
      <ul className="mt-2 mb-4 flex flex-col gap-2 text-sm text-gray-600">
        {tier.features.map((feature) => {
          return (
            <li key={feature} className="flex gap-2">
              <svg
                viewBox="0 0 24 24"
                className="mt-0.5 h-4 w-4 shrink-0 text-orange-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12.5 10 17l9-10" />
              </svg>
              {feature}
            </li>
          );
        })}
        {tier.excluded.map((feature) => {
          return (
            <li key={feature} className="flex gap-2 text-gray-400">
              <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 7l10 10M17 7 7 17" />
              </svg>
              {feature}
            </li>
          );
        })}
      </ul>
      <a
        href={tier.cta.href}
        className={[
          'mt-auto self-start rounded-lg px-5 py-3 text-sm font-medium',
          tier.highlighted && 'border border-gray-900 bg-gray-900 text-white hover:bg-gray-700',
          !tier.highlighted && 'border border-gray-300 hover:bg-gray-50',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {tier.cta.label}
      </a>
    </div>
  );
};

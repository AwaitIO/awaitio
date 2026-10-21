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
      <p className="mt-2 text-sm text-gray-600">{tier.note}</p>
      <a
        href={tier.cta.href}
        className={[
          'mt-auto self-start rounded-lg px-5 py-3 text-sm font-medium',
          tier.highlighted && 'bg-gray-900 text-white hover:bg-gray-700',
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

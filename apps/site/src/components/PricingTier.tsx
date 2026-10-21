import { match, P } from 'ts-pattern';
import type { PricingTierInfo } from '../types/PricingTierInfo';
import type { FC } from 'react';

export type PricingTierProps = {
  tier: PricingTierInfo;
};

export const PricingTier: FC<PricingTierProps> = ({ tier }) => {
  return (
    <div className={['flex flex-col gap-3 rounded-2xl border p-6', tier.highlighted && 'border-gray-900 shadow-lg', !tier.highlighted && 'border-gray-200'].filter(Boolean).join(' ')}>
      <p className="text-sm font-medium text-gray-500">{tier.users}</p>
      <p className="text-4xl font-semibold tracking-[-0.02em]">{tier.price}</p>
      {match(tier.yearly)
        .with(P.string, (yearly) => {
          return <p className="text-sm text-gray-500">{yearly}</p>;
        })
        .otherwise(() => {
          return <p className="text-sm text-gray-500">No sign-up, no license key</p>;
        })}
      <p className="mt-2 text-sm text-gray-600">{tier.note}</p>
    </div>
  );
};

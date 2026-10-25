import { CheckIcon } from '../icons/CheckIcon';
import { CrossIcon } from '../icons/CrossIcon';
import type { PricingTierInfo } from '../types/PricingTierInfo';
import type { FC } from 'react';

export type PricingTierProps = {
  tier: PricingTierInfo;
};

export const PricingTier: FC<PricingTierProps> = ({ tier }) => {
  const Icon = tier.icon;

  return (
    <div className={['offset-card flex flex-col gap-3 bg-white p-6', tier.highlighted && 'shadow-[7px_7px_0_var(--color-orange-500)]'].filter(Boolean).join(' ')}>
      <Icon className="mb-2 h-12 w-12 shrink-0 text-gray-900" />
      <p className="text-sm font-medium text-gray-500">{tier.name}</p>
      <p className="text-4xl font-semibold tracking-[-0.02em]">{tier.price}</p>
      <p className="text-sm text-gray-500">{tier.detail}</p>
      <ul className="mt-2 mb-4 flex flex-col gap-2 text-sm text-gray-600">
        {tier.features.map((feature) => {
          return (
            <li key={feature} className="flex gap-2">
              <CheckIcon />
              {feature}
            </li>
          );
        })}
        {tier.excluded.map((feature) => {
          return (
            <li key={feature} className="flex gap-2 text-gray-400">
              <CrossIcon />
              {feature}
            </li>
          );
        })}
      </ul>
      <a
        href={tier.cta.href}
        className={[
          'mt-auto self-start rounded-lg px-5 py-3 text-sm font-medium',
          tier.highlighted && 'offset-button border border-gray-900 bg-gray-900 text-white hover:bg-gray-700',
          !tier.highlighted && 'offset-button-secondary border-[1.5px] border-gray-900 bg-white hover:bg-gray-50',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {tier.cta.label}
      </a>
    </div>
  );
};

import { PricingTier } from '../../components/PricingTier';
import { SupportBanner } from '../../components/SupportBanner';
import { constants } from '../../constants';
import type { PricingTierInfo } from '../../types/PricingTierInfo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing – AwaitIO',
};

const tiers: PricingTierInfo[] = [
  {
    name: '1–3 users',
    price: 'Free',
    detail: 'No sign-up, no license key',
    note: 'Commercial use included. Also free for non-profits, education and evaluation.',
    cta: { label: 'Get started', href: `${constants.DOCS_URL}/quickstart` },
    highlighted: false,
  },
  {
    name: '4–10 users',
    price: '$50/mo',
    detail: 'Company License, per organization',
    note: 'One flat price for all your apps and environments. Invoice on request.',
    cta: { label: 'Sponsor on GitHub', href: constants.SPONSORS_URL },
    highlighted: true,
  },
  {
    name: 'More than 10 users',
    price: '$250/mo',
    detail: 'Company License, no user limit',
    note: 'Flat, however many people, apps and environments. Invoice on request.',
    cta: { label: 'Sponsor on GitHub', href: constants.SPONSORS_URL },
    highlighted: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    detail: 'Contract, SLA, priority support',
    note: 'Need a written contract, a purchase order, an SLA or custom terms? Write to us and we agree on them.',
    cta: { label: 'Contact us', href: `mailto:${constants.CONTACT_EMAIL}?subject=${encodeURIComponent('AwaitIO Enterprise')}` },
    highlighted: false,
  },
];

const PricingPage = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">Pricing</h1>
        <p className="mt-4 text-lg text-gray-600">
          Users are the real people who use your AwaitIO apps, locally or deployed, however many logins they share. The free and the paid version are the same software: no paid features, no license
          keys, no limits and no telemetry. It works on trust.
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {tiers.map((tier) => {
          return <PricingTier key={tier.name} tier={tier} />;
        })}
      </div>
      <SupportBanner />
      <div className="mt-20 max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-[-0.02em]">How to get a Company License</h2>
        <p className="mt-3 text-gray-600">
          Sponsor AwaitIO on{' '}
          <a href={constants.SPONSORS_URL} className="underline hover:text-gray-900">
            GitHub Sponsors
          </a>{' '}
          with the monthly Company License tier for your number of users, from your organization&apos;s GitHub account or on its behalf.
        </p>
        <p className="mt-3 text-gray-600">That is the license: it stays valid while the sponsorship is active.</p>
        <p className="mt-3 text-gray-600">
          Every payment comes with an invoice on request: send your billing details to{' '}
          <a href={`mailto:${constants.CONTACT_EMAIL}`} className="underline hover:text-gray-900">
            {constants.CONTACT_EMAIL}
          </a>
          .
        </p>
        <p className="mt-3 text-sm text-gray-500">
          The full terms are in the{' '}
          <a href={constants.LICENSE_URL} className="underline hover:text-gray-900">
            AwaitIO License
          </a>
          .
        </p>
      </div>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default PricingPage;

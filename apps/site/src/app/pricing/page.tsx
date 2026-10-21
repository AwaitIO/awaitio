import { LicenseRequestForm } from '../../components/LicenseRequestForm';
import { PricingTier } from '../../components/PricingTier';
import { constants } from '../../constants';
import type { PricingTierInfo } from '../../types/PricingTierInfo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing – AwaitIO',
};

const tiers: PricingTierInfo[] = [
  { users: '1–3 users', price: 'Free', yearly: null, note: 'Commercial use included. Also free for non-profits, education and evaluation.', highlighted: false },
  { users: '4–10 users', price: '$49/mo', yearly: 'or $490 per year', note: 'One flat price for your organization, however many apps and environments you run.', highlighted: true },
  {
    users: 'More than 10 users',
    price: '$199/mo',
    yearly: 'or $1,990 per year',
    note: 'Flat, with no limit on users. Need invoicing, custom terms or priority support? Ask in the form.',
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
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => {
          return <PricingTier key={tier.users} tier={tier} />;
        })}
      </div>
      <div id="request" className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.02em]">Request a license</h2>
          <p className="mt-3 text-gray-600">Tell us who the license is for and how many people use AwaitIO. You will get a reply with the license and the invoice.</p>
          <p className="mt-3 text-sm text-gray-500">
            The full terms are in the{' '}
            <a href={constants.LICENSE_URL} className="underline hover:text-gray-900">
              AwaitIO License
            </a>
            .
          </p>
        </div>
        <LicenseRequestForm />
      </div>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default PricingPage;

import { FaqItem } from '../../components/FaqItem';
import { LicenseParagraph } from '../../components/LicenseParagraph';
import { PricingTier } from '../../components/PricingTier';
import { SupportBanner } from '../../components/SupportBanner';
import { constants } from '../../constants';
import type { FaqEntry } from '../../types/FaqEntry';
import type { PricingTierInfo } from '../../types/PricingTierInfo';
import { readLicenseExamples } from '../../utils/readLicenseExamples';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing – AwaitIO',
};

const tiers: PricingTierInfo[] = [
  {
    name: 'Up to 3 users',
    price: 'Free',
    detail: 'No sign-up, no license key',
    features: ['Up to 3 users', 'Commercial use', 'Unlimited apps'],
    excluded: ['Supporting the project', 'Support', 'SLA'],
    cta: { label: 'Get started', href: `${constants.DOCS_URL}/quickstart` },
    highlighted: false,
  },
  {
    name: '4–10 users',
    price: '$50/mo',
    detail: 'Company License',
    features: ['4 to 10 users', 'Commercial use', 'Unlimited apps', 'Invoice on request', 'Standard support'],
    excluded: ['Priority support', 'SLA'],
    cta: { label: 'Sponsor on GitHub', href: constants.SPONSORS_URL },
    highlighted: true,
  },
  {
    name: '11–50 users',
    price: '$250/mo',
    detail: 'Company License',
    features: ['11 to 50 users', 'Commercial use', 'Unlimited apps', 'Invoice on request', 'Standard support'],
    excluded: ['Priority support', 'SLA'],
    cta: { label: 'Sponsor on GitHub', href: constants.SPONSORS_URL },
    highlighted: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    detail: 'Custom agreement',
    features: ['More than 50 users', 'Custom components', 'Onboarding and training', 'Contract and custom terms', 'Priority support', 'SLA'],
    excluded: [],
    cta: { label: 'Contact us', href: `mailto:${constants.LICENSE_EMAIL}?subject=${encodeURIComponent('Custom AwaitIO license request')}` },
    highlighted: false,
  },
];

// The FAQ and the examples are the Examples section of the license, word for word: its first group is the FAQ.
const PricingPage = () => {
  const [generalGroup, ...exampleGroups] = readLicenseExamples().map(({ title, questions }) => {
    const entries: FaqEntry[] = questions.map(({ question, paragraphs }) => {
      return {
        question,
        answer: paragraphs.map((paragraph, index) => {
          return <LicenseParagraph key={paragraph} text={paragraph} className={index > 0 ? 'mt-3' : undefined} />;
        }),
      };
    });

    return { title, entries };
  });
  const faq = generalGroup?.entries ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">Pricing</h1>
        <p className="mt-4 text-lg text-gray-600">
          Users are the real people who have access to your AwaitIO apps at the same time, locally or deployed, however many accounts they have or share. The free and the paid version are the same
          software: no paid features, no license keys, no limits and no telemetry. It works on trust. Try it free for 30 days with any number of users.
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
          <a href={`mailto:${constants.LICENSE_EMAIL}`} className="underline hover:text-gray-900">
            {constants.LICENSE_EMAIL}
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
      <div className="mt-20 max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-[-0.02em]">Frequently asked questions</h2>
        <div className="mt-4">
          {faq.map((entry) => {
            return <FaqItem key={entry.question} entry={entry} />;
          })}
        </div>
      </div>
      <div className="mt-20 max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-[-0.02em]">Examples</h2>
        <p className="mt-3 text-gray-600">
          How the license applies to common cases. These examples are part of the{' '}
          <a href={constants.LICENSE_URL} className="underline hover:text-gray-900">
            AwaitIO License
          </a>
          , word for word.
        </p>
        {exampleGroups.map((group) => {
          return (
            <div key={group.title} className="mt-10">
              <h3 className="text-lg font-semibold">{group.title}</h3>
              <div className="mt-2">
                {group.entries.map((entry) => {
                  return <FaqItem key={entry.question} entry={entry} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default PricingPage;

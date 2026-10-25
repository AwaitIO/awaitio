import Link from 'next/link';
import type { Competitor } from '../../types/Competitor';
import { competitors } from '../../utils/competitors';
import { CodeText } from '../CodeText';
import { ComparisonTable } from '../ComparisonTable';
import type { FC } from 'react';

export type VsDetailsProps = {
  competitor: Competitor;
};

const toId = (heading: string) => {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// The long part of /vs/<slug> under the visual one: the full comparison in prose, the side-by-side table and the FAQ,
// for readers who want every detail and for search engines and AI answers. The FAQ also goes out as FAQPage data.
export const VsDetails: FC<VsDetailsProps> = ({ competitor }) => {
  const details = competitor.details;
  const faq = competitor.faq;
  const others = competitors.filter((other) => other.slug !== competitor.slug);
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((entry) => ({ '@type': 'Question', name: entry.question, acceptedAnswer: { '@type': 'Answer', text: entry.answer.replaceAll('`', '') } })),
  };

  return (
    <section className="border-t border-gray-900/10">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 lg:grid-cols-[14rem_1fr] lg:gap-16">
        <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          <p className="font-mono text-sm font-semibold tracking-widest text-orange-500 uppercase">Detailed comparison</p>
          <nav className="flex flex-col gap-2 text-sm text-gray-600">
            {details.map((section) => {
              return (
                <a key={section.heading} href={`#${toId(section.heading)}`} className="hover:text-gray-900">
                  {section.heading}
                </a>
              );
            })}
            <a href="#side-by-side" className="hover:text-gray-900">
              Side by side
            </a>
            <a href="#faq" className="hover:text-gray-900">
              FAQ
            </a>
          </nav>
        </aside>

        <article className="flex max-w-3xl min-w-0 flex-col gap-12">
          <header className="flex flex-col gap-3">
            <h2 className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">AwaitIO vs {competitor.name}: the full comparison</h2>
            <p className="text-sm text-gray-500">Last updated {new Date(competitor.lastModifiedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</p>
          </header>

          {details.map((section) => {
            return (
              <div key={section.heading} id={toId(section.heading)} className="flex scroll-mt-24 flex-col gap-4">
                <h2 className="text-2xl font-semibold tracking-[-0.01em]">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => {
                  return (
                    <p key={paragraph} className="text-lg leading-relaxed text-gray-700">
                      <CodeText text={paragraph} />
                    </p>
                  );
                })}
                {section.subsections?.map((subsection) => {
                  return (
                    <div key={subsection.heading} className="mt-4 flex flex-col gap-3">
                      <h3 className="text-xl font-semibold">{subsection.heading}</h3>
                      {subsection.paragraphs.map((paragraph) => {
                        return (
                          <p key={paragraph} className="text-lg leading-relaxed text-gray-700">
                            <CodeText text={paragraph} />
                          </p>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}

          <div id="side-by-side" className="flex scroll-mt-24 flex-col gap-6">
            <h2 className="text-2xl font-semibold tracking-[-0.01em]">Side by side</h2>
            <ComparisonTable competitor={competitor} />
          </div>

          {faq.length > 0 && (
            <div id="faq" className="flex scroll-mt-24 flex-col gap-2">
              <h2 className="mb-2 text-2xl font-semibold tracking-[-0.01em]">FAQ</h2>
              {faq.map((entry) => {
                return (
                  <div key={entry.question} className="flex flex-col gap-2 border-b border-gray-200 py-5">
                    <h3 className="text-lg font-semibold">{entry.question}</h3>
                    <p className="leading-relaxed text-gray-700">
                      <CodeText text={entry.answer} />
                    </p>
                  </div>
                );
              })}
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
            </div>
          )}

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold tracking-[-0.01em]">More comparisons</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600">
              {others.map((other) => {
                return (
                  <Link key={other.slug} href={`/vs/${other.slug}`} className="underline decoration-gray-300 underline-offset-4 hover:text-gray-900">
                    AwaitIO vs {other.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

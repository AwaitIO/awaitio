import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CodeText } from '../../../components/CodeText';
import { FadeIn } from '../../../components/motion/FadeIn';
import { Page } from '../../../components/Page';
import { VsChecks } from '../../../components/vs/VsChecks';
import { VsDetails } from '../../../components/vs/VsDetails';
import { VsFitCard } from '../../../components/vs/VsFitCard';
import { VsHeroIllustration } from '../../../components/vs/VsHeroIllustration';
import { VsHeroLogos } from '../../../components/vs/VsHeroLogos';
import { VsHighlights } from '../../../components/vs/VsHighlights';
import { constants } from '../../../constants';
import { competitors } from '../../../utils/competitors';

export type ComparePageProps = {
  params: Promise<{ slug: string }>;
};

// The site is a static export: only the competitors listed in utils/competitors get a page, every other slug is a 404.
export const dynamicParams = false;

export const generateStaticParams = () => {
  return competitors.map((competitor) => ({ slug: competitor.slug }));
};

const ComparePage = async ({ params }: ComparePageProps) => {
  const { slug } = await params;
  const competitor = competitors.find((candidate) => candidate.slug === slug);

  if (!competitor) {
    notFound();
  }

  const actions = (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <a href={`${constants.DOCS_URL}/quickstart`} className="offset-button rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-700">
        Get started
      </a>
      <Link href="/demo" className="offset-button-secondary rounded-lg border-[1.5px] border-gray-900 bg-white px-5 py-3 text-sm font-medium hover:bg-gray-50">
        See the demo
      </Link>
    </div>
  );

  // A short visual part on top, then the long detailed comparison.
  return (
    <Page
      title={`${competitor.name} alternative – AwaitIO`}
      description={`How AwaitIO compares with ${competitor.name}. ${competitor.summary}`}
      ogImage="home"
      canonicalPath={`/vs/${competitor.slug}/`}
      lastModifiedAt={competitor.lastModifiedAt}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-24 px-4 pt-20 pb-24">
        <div className="flex flex-col items-center gap-6 text-center">
          <VsHeroLogos name={competitor.name} logo={competitor.logo} />
          <FadeIn on="load" delay={0.1} className="flex flex-col items-center gap-6">
            <p className="font-mono text-base font-semibold tracking-widest text-orange-500 uppercase">AwaitIO vs {competitor.name}</p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.03em] sm:text-6xl">
              <CodeText text={competitor.headline} />
            </h1>
          </FadeIn>
          <FadeIn on="load" delay={0.2} className="flex flex-col items-center gap-6">
            <p className="max-w-2xl text-lg text-gray-600">
              <CodeText text={competitor.about.join(' ')} />
            </p>
            {actions}
          </FadeIn>
          <FadeIn on="load" delay={0.3} className="mt-10 w-full text-left">
            <VsHeroIllustration name={competitor.name} kind={competitor.kind} />
          </FadeIn>
        </div>

        <FadeIn className="flex w-full flex-col gap-10">
          <h2 className="font-pixel text-xl leading-tight sm:text-2xl">Why developers pick AwaitIO</h2>
          <VsHighlights highlights={competitor.highlights} />
        </FadeIn>

        <FadeIn className="flex w-full flex-col gap-6">
          <h2 className="font-pixel text-xl leading-tight sm:text-2xl">At a glance</h2>
          <VsChecks name={competitor.name} logo={competitor.logo} checks={competitor.checks} />
          <p className="text-sm text-gray-500">A half-filled circle means only on some plans or with extra setup.</p>
        </FadeIn>

        <FadeIn className="flex w-full flex-col gap-6">
          <h2 className="font-pixel text-xl leading-tight sm:text-2xl">Which one fits</h2>
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <VsFitCard name={competitor.name} logo={competitor.logo} points={competitor.whenItFits} isAwaitIO={false} />
            <VsFitCard name={competitor.name} points={competitor.whenAwaitIOFits} isAwaitIO />
          </div>
        </FadeIn>

        <FadeIn className="flex flex-col items-center gap-5 text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">Write your first tool today.</h2>
          <p className="max-w-xl text-gray-600">
            <CodeText text="An async function, a few `await` calls, and the form is in the browser." />
          </p>
          {actions}
        </FadeIn>
      </div>
      <VsDetails competitor={competitor} />
    </Page>
  );
};

// eslint-disable-next-line import/no-default-export
export default ComparePage;

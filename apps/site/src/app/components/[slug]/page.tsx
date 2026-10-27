import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CodeText } from '../../../components/CodeText';
import { ComponentDocsLinks } from '../../../components/componentPages/ComponentDocsLinks';
import { ComponentExample } from '../../../components/componentPages/ComponentExample';
import { ComponentOptionCard } from '../../../components/componentPages/ComponentOptionCard';
import { ComponentTile } from '../../../components/ComponentTile';
import { DotMatrixPicture } from '../../../components/DotMatrixPicture';
import { FadeIn } from '../../../components/motion/FadeIn';
import { Page } from '../../../components/Page';
import { constants } from '../../../constants';
import { ArrowIcon } from '../../../icons/ArrowIcon';
import { componentPages } from '../../../utils/componentPages';
import { componentShowcases } from '../../../utils/componentShowcases';

export type ComponentPageProps = {
  params: Promise<{ slug: string }>;
};

// The site is a static export: only the components listed in utils/componentPages get a page, every other slug is a 404.
export const dynamicParams = false;

export const generateStaticParams = () => {
  return componentPages.map((component) => ({ slug: component.slug }));
};

// A presentation page for one io component, not its documentation: its picture in dots and what it is, the simplest
// code with roughly what it shows, what you can set, where the docs go on and the next three components.
const ComponentPresentationPage = async ({ params }: ComponentPageProps) => {
  const { slug } = await params;
  const component = componentPages.find((candidate) => candidate.slug === slug);

  if (!component) {
    notFound();
  }

  const docsUrl = `${constants.DOCS_URL}/io/${component.slug}`;
  // The three components after this one in the home page's order, starting over from the first after the last.
  const index = componentShowcases.findIndex((showcase) => showcase.slug === component.slug);
  const nextComponents = [1, 2, 3].map((offset) => componentShowcases[(index + offset) % componentShowcases.length]);

  return (
    <Page title={`${component.method} – AwaitIO`} description={component.summary} ogImage="home" canonicalPath={`/components/${component.slug}/`} lastModifiedAt={component.lastModifiedAt}>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-24 px-4 pt-20 pb-24">
        <div className="flex w-full flex-col items-center gap-6 text-center">
          <FadeIn on="load" className="w-full">
            <DotMatrixPicture rows={component.picture.rows} label={component.picture.label} className={['mx-auto', component.picture.className].join(' ')} />
          </FadeIn>
          <FadeIn on="load" delay={0.1} className="mt-6 flex flex-col items-center gap-6">
            <p className="font-mono text-base font-semibold tracking-widest text-orange-500">{component.method}</p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-6xl">{component.headline}</h1>
          </FadeIn>
          <FadeIn on="load" delay={0.2} className="flex flex-col items-center gap-6">
            <p className="max-w-2xl text-lg text-gray-600">
              <CodeText text={component.intro} />
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="offset-button inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-700"
              >
                Read the docs
                <ArrowIcon />
              </a>
              <Link href="/components" className="offset-button-secondary rounded-lg border-[1.5px] border-gray-900 bg-white px-5 py-3 text-sm font-medium hover:bg-gray-50">
                All components
              </Link>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="flex w-full flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="font-pixel text-xl leading-tight sm:text-2xl">The simplest one</h2>
            <p className="max-w-2xl text-gray-600">The whole action file, and roughly what your team sees when it runs.</p>
          </div>
          <ComponentExample page={component} />
        </FadeIn>

        <FadeIn className="flex w-full flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="font-pixel text-xl leading-tight sm:text-2xl">What you can set</h2>
            <p className="max-w-2xl text-gray-600">The settings you will reach for most, each with the line of code that turns it on.</p>
          </div>
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">
            {component.options.map((option, index) => {
              return (
                <FadeIn key={option.title} className="grid" delay={(index % 3) * 0.1}>
                  <ComponentOptionCard option={option} />
                </FadeIn>
              );
            })}
          </div>
        </FadeIn>

        <FadeIn className="flex w-full flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="font-pixel text-xl leading-tight sm:text-2xl">More in the docs</h2>
            <p className="max-w-2xl text-gray-600">This page shows the idea. The docs have every prop, the checks on the server and more examples.</p>
          </div>
          <ComponentDocsLinks links={component.docs} />
        </FadeIn>

        <FadeIn className="flex w-full flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="font-pixel text-xl leading-tight sm:text-2xl">Next components</h2>
            <p className="max-w-2xl text-gray-600">Three more calls on io. Each one shows a control and hands your code a typed value.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {nextComponents.map((showcase) => {
              return <ComponentTile key={showcase.slug} component={showcase} />;
            })}
          </div>
        </FadeIn>

        <FadeIn className="flex flex-col items-center gap-5 text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">Write your first tool today.</h2>
          <p className="max-w-xl text-gray-600">
            <CodeText text="An async function, a few `await` calls, and the form is in the browser." />
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={`${constants.DOCS_URL}/quickstart`} className="offset-button rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-700">
              Get started
            </a>
            <Link href="/demo" className="offset-button-secondary rounded-lg border-[1.5px] border-gray-900 bg-white px-5 py-3 text-sm font-medium hover:bg-gray-50">
              See the demo
            </Link>
          </div>
        </FadeIn>
      </div>
    </Page>
  );
};

// eslint-disable-next-line import/no-default-export
export default ComponentPresentationPage;

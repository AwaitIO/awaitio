import Link from 'next/link';
import { FadeIn } from '../../components/motion/FadeIn';
import { Page } from '../../components/Page';
import { PixelLogo } from '../../components/vs/PixelLogo';
import { competitors } from '../../utils/competitors';

const CompareIndexPage = () => {
  return (
    <Page title="Compare – AwaitIO" description="How AwaitIO compares with Retool, Interval, Airplane, Windmill and other internal tool builders." ogImage="home" canonicalPath="/vs/">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-20">
        <FadeIn on="load" className="flex max-w-2xl flex-col gap-4">
          <p className="font-mono text-base font-semibold tracking-widest text-orange-500 uppercase">Compare</p>
          <h1 className="text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">AwaitIO and the other internal tool builders</h1>
          <p className="text-lg text-gray-600">
            Most internal tool builders are visual editors. AwaitIO is just code. Each page says what the other tool is, where it stands today and when it is the better pick.
          </p>
        </FadeIn>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {competitors.map((competitor, index) => {
            return (
              <FadeIn key={competitor.slug} on="load" className="grid" delay={0.1 + (index % 3) * 0.1}>
                <Link href={`/vs/${competitor.slug}`} className="offset-card flex flex-col gap-2 bg-white p-6 hover:bg-gray-50">
                  <PixelLogo bitmap={competitor.logo} cells={16} label={competitor.name} className="mb-2 h-10 w-10 text-gray-900" />
                  <span className="text-lg font-semibold">AwaitIO vs {competitor.name}</span>
                  <span className="text-sm text-gray-600">{competitor.summary}</span>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </Page>
  );
};

// eslint-disable-next-line import/no-default-export
export default CompareIndexPage;

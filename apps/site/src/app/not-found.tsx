import { DotMatrixText } from '../components/DotMatrixText';
import { FadeIn } from '../components/motion/FadeIn';
import { NotFoundActions } from '../components/NotFoundActions';
import { Page } from '../components/Page';

// The 404 page, written by the static export as out/404.html. It stands alone on the whole screen, without the header
// and footer: big orange dots with a slow dim wave, one line of text and the way out.
const NotFoundPage = () => {
  return (
    <Page title="Page not found – AwaitIO" description="There is nothing at this address." ogImage="home" canonicalPath="/404/">
      <section data-bare-page className="flex min-h-screen items-center bg-paper">
        <div className="mx-auto w-full max-w-4xl px-4 py-24 text-center">
          <FadeIn on="load">
            <h1>
              <DotMatrixText lines={['Page', 'not found']} animation="wave" className="mx-auto w-full max-w-3xl" />
            </h1>
          </FadeIn>
          <FadeIn on="load" delay={0.1}>
            {/* One sentence per line, each balanced when it wraps on a phone. */}
            <p className="mx-auto mt-12 max-w-xl text-lg text-balance text-gray-600">
              <span className="block">There is nothing at this address.</span>
              <span className="block">The link may be old, or the address has a typo.</span>
            </p>
          </FadeIn>
          <FadeIn on="load" delay={0.2}>
            <NotFoundActions className="mt-10 justify-center" />
          </FadeIn>
        </div>
      </section>
    </Page>
  );
};

// Next.js requires page files to default-export their component.
// eslint-disable-next-line import/no-default-export
export default NotFoundPage;

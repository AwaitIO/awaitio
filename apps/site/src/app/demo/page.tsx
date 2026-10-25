import { AppScreenshot } from '../../components/AppScreenshot';
import { FadeIn } from '../../components/motion/FadeIn';
import { Page } from '../../components/Page';
import { constants } from '../../constants';

const DemoPage = () => {
  return (
    <Page title="Demo – AwaitIO" description="Click through a real backoffice and try every component before you write a single line of code." ogImage="demo" canonicalPath="/demo/">
      <div className="pt-20">
        <div className="mx-auto max-w-6xl px-4">
          <FadeIn on="load" className="max-w-2xl">
            <h1 className="text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">Demo</h1>
            <p className="mt-4 text-lg text-gray-600">
              A backoffice of a made-up company, built with AwaitIO the way a real client project is. Click through its pages and run its actions; every form you see is an{' '}
              <code className="rounded bg-gray-200 px-1.5 py-0.5 text-base">await io</code> in the code.
            </p>
          </FadeIn>
        </div>
        {/* A faint line across the whole width above, like the lines of the band under the hero horizon; the sponsor strip under it closes it with its own line. */}
        <div className="mt-12 border-t border-gray-900/10 lg:mt-28">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1fr_2fr] lg:items-start">
            <FadeIn on="load" delay={0.1} className="flex flex-col gap-6 offset-card p-6">
              <div>
                <p className="text-base font-medium text-gray-900">Log in with</p>
                <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                  <dt className="text-gray-500">Email</dt>
                  <dd className="font-mono text-gray-900">{constants.DEMO_EMAIL}</dd>
                  <dt className="text-gray-500">Password</dt>
                  <dd className="font-mono text-gray-900">{constants.DEMO_PASSWORD}</dd>
                </dl>
              </div>
              <div className="flex flex-wrap gap-5">
                <a href={constants.DEMO_URL} className="offset-button rounded-lg border border-gray-900 bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-700">
                  Open the demo
                </a>
                <a href={constants.DEMO_SOURCE_URL} className="offset-button-secondary rounded-lg border-[1.5px] border-gray-900 bg-white px-5 py-3 text-sm font-medium hover:bg-gray-50">
                  View the source
                </a>
              </div>
              <p className="text-sm text-gray-500">Nothing you do is saved. The demo runs on made-up data, not a real database, so try anything.</p>
            </FadeIn>
            {/* On wide screens the window reaches up over the top line, as the hero screenshot reaches over the horizon. */}
            <FadeIn on="load" delay={0.2} className="min-w-0 lg:-mt-28">
              <AppScreenshot
                src="/screenshots/create-account.png"
                alt="The Create account action in the demo, its form filled in for Juniper Tea"
                url="demo.awaitio.com/actions/accounts/create_account"
              />
            </FadeIn>
          </div>
        </div>
      </div>
    </Page>
  );
};

// eslint-disable-next-line import/no-default-export
export default DemoPage;

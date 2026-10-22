import { AppScreenshot } from '../../components/AppScreenshot';
import { Page } from '../../components/Page';
import { constants } from '../../constants';

const DemoPage = () => {
  return (
    <Page
      title="Demo – AwaitIO"
      description={`The backoffice of a made-up store. Log in with ${constants.DEMO_EMAIL} and the password ${constants.DEMO_PASSWORD}.`}
      ogImage="demo"
      canonicalPath="/demo/"
    >
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">Demo</h1>
          <p className="mt-4 text-lg text-gray-600">
            A backoffice of a made-up company, built with AwaitIO the way a real client project is. Click through its pages and run its actions; every form you see is an{' '}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-base">await io</code> in the code.
          </p>
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-start">
          <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 p-6">
            <div>
              <p className="text-base font-medium text-gray-900">Log in with</p>
              <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                <dt className="text-gray-500">Email</dt>
                <dd className="font-mono text-gray-900">{constants.DEMO_EMAIL}</dd>
                <dt className="text-gray-500">Password</dt>
                <dd className="font-mono text-gray-900">{constants.DEMO_PASSWORD}</dd>
              </dl>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={constants.DEMO_URL} className="rounded-lg border border-gray-900 bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-700">
                Open the demo
              </a>
              <a href={constants.DEMO_SOURCE_URL} className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium hover:bg-gray-50">
                View the source
              </a>
            </div>
            <p className="text-sm text-gray-500">Nothing you do is saved. The demo runs on made-up data, not a real database, so try anything.</p>
          </div>
          <AppScreenshot src="/screenshots/create-account.png" alt="The Create account action in the demo, its form filled in for Juniper Tea" url="demo.awaitio.com/actions/accounts/create_account" />
        </div>
      </div>
    </Page>
  );
};

// eslint-disable-next-line import/no-default-export
export default DemoPage;
